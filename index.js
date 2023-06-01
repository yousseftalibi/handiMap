const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const eventRoutes = require("./routes/event.route");
const directionsRoutes = require('./routes/directions.routes');
const parkingLotsRoutes = require('./routes/parkingLots.routes');

require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const corsOptions = {
  origin: true,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/directions', directionsRoutes); 
app.use('/api/parkingLots', parkingLotsRoutes); 
app.use("/api/events", eventRoutes);

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=> {
    res.status(200).send(res.locals.user._id)
});

// server
app.listen(5000, () => {
    console.log(`Listening on port 5000`)
});

const connected_clients = new Set();
io.on('connect', (socket) => {
    connected_clients.add(socket.id);
    socket.on('disconnect', () => {
      connected_clients.delete(socket.id);
    });
    socket.on('message', (message) => {
        for (let client of connected_clients) {
        if (client !== socket.id) {
            message.from = 'other';
            io.to(client).emit('message', message);
        }
    }
  });
});

http.listen(5001, () => {
    console.log('websocket listening on port 5001');
});
