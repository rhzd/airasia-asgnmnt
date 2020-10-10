const express = require("express");
const router = express.Router();
const paymentsController = require("../app/controllers/payments");

router.get("/payment/:paymentId/status", paymentsController.getById);
router.put("/payment/:paymentId/pay", paymentsController.updateById);

module.exports = router;
