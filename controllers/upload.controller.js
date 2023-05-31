const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);
const { Readable } = require('stream');



module.exports.uploadProfil = async (req, res, next) => {

  try {
    if (!/\.(jpg|jpeg|png)$/i.test(req.file.originalname)) {
      throw Error("invalid file");
    }

    if(req.file.size >500000) throw Error("max size")
    } catch (err) {
    const errors = uploadErrors(err);
    return res.status(500).send({errors});
} 
 
  console.log('req.file', req.file);
  // Get the file object from the request
  const file = req.file;
 const fileName= req.body.name + ".jpg";
  // Create a write stream to save the file to the file system
  const stream = fs.createWriteStream(`${__dirname}/../client/public/uploads/profil/${fileName}`);
  const imageData = req.file.buffer;
  
  stream.write(imageData);
/*
  stream.on('open', () => {
    const readStream = new Readable();
    readStream.push(imageData);
    readStream.push(null);
    readStream.on('data', chunk => {
    stream.write(chunk);
    });
    readStream.on('end', () => {
    stream.end();
    });
  });
*/

try {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.body.userId,
    { $set : {picture: "./uploads/profil/"+fileName}},
    {new: true, upsert: true, setDefaultsOnInsert: true}
  ).exec();

  return res.send(updatedUser);
} catch (err) {
  return res.status(500).send({ message: err.message });
}
};