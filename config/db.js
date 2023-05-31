const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS + "@clustersocialmedia.iw1qlya.mongodb.net/socialMedia",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(()=> console.log("Connected to MongodB"))
    .catch((err)=> console.log("Failed to connect to MongodB", err));

