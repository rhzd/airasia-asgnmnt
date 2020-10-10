const express = require("express");
const router = express.Router();
const roomsController = require("../app/controllers/rooms");

router.get("/hotels/:hotelId/rooms", roomsController.getAll);
router.post("/hotels/:hotelId/rooms", roomsController.create);
router.get("/rooms/:roomId", roomsController.getById);
router.put("/rooms/:roomId", roomsController.updateById);
router.delete("/rooms/:roomId", roomsController.deleteById);

module.exports = router;
