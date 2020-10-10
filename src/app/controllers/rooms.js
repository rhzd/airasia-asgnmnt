const roomModel = require("../models/rooms");
const hotelModel = require("../models/hotels");

module.exports = {
  getById: function (req, res, next) {
    roomModel.findById(req.params.roomId, function (err, roomInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          message: "Room found",
          data: { rooms: roomInfo },
        });
      }
    });
  },
  getAll: function (req, res, next) {
    roomModel.find(
      { hotel: req.params.hotelId, is_deleted: false },
      async function (err, data) {
        if (err) {
          next(err);
        } else {
          let hotelCurrent = await hotelModel.findById(req.params.hotelId, 'name').exec();
          res.json({
            message: `Room list for ${hotelCurrent.name} hotel`,
            data,
          });
        }
      }
    );
  },
  updateById: function (req, res, next) {
    roomModel.findByIdAndUpdate(
      req.params.roomId,
      {
        no_of_guest: req.body.no_of_guest,
        price: req.body.price,
      },
      function (err, roomInfo) {
        if (err) next(err);
        else {
          res.json({
            message: `Successfully update ${roomInfo.unit} room`,
          });
        }
      }
    );
  },
  deleteById: function (req, res, next) {
    roomModel.findByIdAndUpdate(
      req.params.roomId,
      { is_deleted: true },
      function (err, roomInfo) {
        if (err) next(err);
        else {
          res.json({
            message: `Successfully delete ${roomInfo.unit} room`,
          });
        }
      }
    );
  },
  create: function (req, res, next) {
    hotelModel.exists({ _id: req.params.hotelId }, (error, result) => {
      if (error) {
        res.status(400).send({ error: `Hotel not found` });
      } else {
        roomModel.create(
          {
            unit: req.body.unit,
            hotel: req.params.hotelId,
            no_of_guest: req.body.no_of_guest,
            price: req.body.price,
            is_deleted: false,
          },
          function (err, result) {
            if (err) next(err);
            else
              res.json({
                message: `successfully add ${req.body.unit} room`,
              });
          }
        );
      }
    });
  },
};
