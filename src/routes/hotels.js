const express = require("express");
const router = express.Router();
const hotelsController = require("../app/controllers/hotels");

router.get("/hotels", hotelsController.getAll);
router.post("/hotels", hotelsController.create);
router.get("/hotels/:hotelId", hotelsController.getById);
router.put("/hotels/:hotelId", hotelsController.updateById);
router.delete("/hotels/:hotelId", hotelsController.deleteById);

module.exports = router;
