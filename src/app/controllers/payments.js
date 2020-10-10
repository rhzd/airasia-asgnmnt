const paymentModel = require("../models/payments");
const orderModel = require("../models/orders");

module.exports = {
  getById: function (req, res, next) {
    paymentModel.findById(req.params.paymentId, function (err, paymentInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: paymentInfo.status,
        });
      }
    });
  },
  updateById: async function (req, res, next) {
    let orderCurrent = await orderModel
      .findOne({ payment: req.params.paymentId })
      .exec();
    let paymentCurrent = await paymentModel
      .findById(req.params.paymentId, "status")
      .exec();
    if (paymentCurrent.status !== "Paid") {
      paymentModel.findByIdAndUpdate(
        req.params.paymentId,
        {
          status: "Paid",
          name_on_card: req.body.name_on_card,
          credit_card_no: req.body.credit_card_no,
          expire_date: req.body.expire_date,
          cvv_no: req.body.cvv_no,
          date_payment: Date.now(),
        },
        function (err, paymentInfo) {
          if (err) next(err);
          else {
            res.json({
              message: `Successfully paid RM${orderCurrent.total_amount}. Enjoy your stay.`,
            });
          }
        }
      );
    } else {
      res
        .status(409)
        .send({ message: `This order has already been paid.` });
    }
  },
};
