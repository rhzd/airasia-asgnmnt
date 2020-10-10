const hotelModel = require("../models/hotels");
module.exports = {
  getById: function (req, res, next) {
    hotelModel.findById(req.params.hotelId, function (err, data) {
      if (err) {
        next(err);
      } else {
        res.json({
          message: "Hotel found!",
          data,
        });
      }
    });
  },
  getAll: function (req, res, next) {
    let data = [];
    hotelModel.find({ is_deleted: false }, function (err, hotels) {
      if (err) {
        next(err);
      } else {
        for (let hotel of hotels) {
          data.push({
            id: hotel._id,
            name: hotel.name,
          });
        }
        res.json({
          message: "hotels list found!",
          data,
        });
      }
    });
  },
  updateById: function (req, res, next) {
    hotelModel.findByIdAndUpdate(
      req.params.hotelId,
      { name: req.body.name },
      function (err, hotelInfo) {
        if (err) next(err);
        else {
          res.json({
            message: `Successfully update ${hotelInfo.name} hotel`,
          });
        }
      }
    );
  },
  deleteById: function (req, res, next) {
    hotelModel.findByIdAndUpdate(
      req.params.hotelId,
      { is_deleted: true },
      function (err, hotelInfo) {
        if (err) next(err);
        else {
          res.json({
            message: `Successfully delete ${hotelInfo.name} hotel`,
          });
        }
      }
    );
  },
  create: function (req, res, next) {
    hotelModel.create({ name: req.body.name, is_deleted: false }, function (
      err,
      result
    ) {
      if (err) next(err);
      else
        res.json({
          message: `successfully add ${req.body.name} hotel`,
        });
    });
  },
};
