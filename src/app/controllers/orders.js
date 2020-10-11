const orderModel = require("../models/orders");
const paymentModel = require("../models/payments");
const roomModel = require("../models/rooms");
const validation = require("../validations/orders");

module.exports = {
  getById: function (req, res, next) {
    orderModel.findById(req.params.orderId, function (err, data) {
      if (err) {
        next(err);
      } else {
        res.json({
          message: "Order found!",
          data,
        });
      }
    });
  },
  getAll: function (req, res, next) {
    let ordersList = [];

    orderModel
      .find({ is_canceled: false })
      .populate({
        path: "customer",
        select: "name email phone_no",
      })
      .populate({
        path: "room",
        populate: { path: "hotel" },
      })
      .populate("payment")
      .exec(function (err, orderList) {
        if (err) return handleError(err);
        const data = orderList.filter(
          (el) =>
            (req.query.hotelName
              ? el.room.hotel.name === req.query.hotelName
              : true) &&
            (req.query.customer
              ? el.customer.name === req.query.customer ||
                el.customer.email === req.query.customer ||
                el.customer.phone_no === req.query.customer
              : true)
        );
        res.json({
          message: "orders list found!",
          data,
        });
      });
  },
  deleteById: function (req, res, next) {
    orderModel.findByIdAndUpdate(
      req.params.orderId,
      { is_canceled: true },
      function (err, orderInfo) {
        if (err) next(err);
        else {
          res.json({
            message: `Successfully cancel ${orderInfo.name} order`,
            data: null,
          });
        }
      }
    );
  },
  create: async function (req, res, next) {
    let errorMsg = await validation.validOrder(
      req.params.roomId,
      req.body.checkin_date,
      req.body.checkout_date
    );
    if (errorMsg) {
      res.status(400).send(errorMsg);
    } else {
      paymentModel.create({ status: "Open" }, async function (
        err,
        resultPayment
      ) {
        if (err) {
          next(err);
        } else {
          let roomCurrent = await roomModel
            .findById(req.params.roomId, "price")
            .exec();
          orderModel.create(
            {
              checkin_date: req.body.checkin_date,
              checkout_date: req.body.checkout_date,
              customer: req.body.userId,
              room: req.params.roomId,
              total_amount: roomCurrent.price,
              payment: resultPayment.id,
              is_canceled: false,
            },
            function (err, resultOrder) {
              if (err) {
                paymentModel.findByIdAndDelete(
                  resultPayment.id,
                  function () {}
                );
                next(err);
              } else {
                res.json({
                  message: `Successfully book. Please make a payment to confirm`,
                });
              }
            }
          );
        }
      });
    }
  },
};
