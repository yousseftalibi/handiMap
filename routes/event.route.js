const express = require("express");
const router = express.Router();

const controller = require("../controllers/event.controller");

router.post("/", controller.insertEvent);
router.get("/", controller.getEvents);

module.exports = router;
