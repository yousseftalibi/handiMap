const EventModel = require("../models/event.model");

exports.insertEvent = async (req, res) => {
  try {
    const { title, description, date, location, user } = req.body;
    const event = new EventModel({ title, description, date, location, user });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.log(err); 
    res.status(500).json({ message: err.message });
  }
};


exports.getEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
