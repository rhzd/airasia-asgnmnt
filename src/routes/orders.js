const express = require("express");
const router = express.Router();
const ordersController = require("../app/controllers/orders");

router.get("/orders", ordersController.getAll);
router.get("/orders/:orderId", ordersController.getById);
router.post("/hotels/:hotelId/rooms/:roomId/orders", ordersController.create);
router.delete("/orders/:orderId", ordersController.deleteById);

module.exports = router;
