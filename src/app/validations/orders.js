const orderModel = require("../models/orders");
const { dateToNumber } = require("../utils");

async function validOrder(room, checkinDate, checkoutDate) {
  if (new Date(checkinDate) > new Date(checkoutDate)) {
    return { error: `Check-out date should be higher than check-in date` };
  }
  const rooms = await orderModel
    .findOne({
      room: room,
      $or: [
        {
          $and: [
            { checkin_date: { $lte: checkinDate } },
            { checkout_date: { $gte: checkinDate } },
          ],
        },
        {
          $and: [
            { checkin_date: { $lte: checkoutDate } },
            { checkout_date: { $gte: checkoutDate } },
          ],
        },
        {
          $and: [
            { checkin_date: { $gte: checkinDate } },
            { checkout_date: { $lte: checkoutDate } },
          ],
        },
      ],
    })
    .exec();
  if (rooms) {
    // if check-in on same day as booked check-out and otherwise (afternoon check-out and check-in)
    if (
      !(
        dateToNumber(rooms.checkin_date) == dateToNumber(checkoutDate) ||
        dateToNumber(rooms.checkout_date) == dateToNumber(checkinDate)
      )
    ) {
      return { error: `Room not available on selected date` };
    }
  }
}

module.exports = { validOrder };
