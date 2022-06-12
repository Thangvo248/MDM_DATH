const User = require("../models/mapBroders");
const Joi = require("joi");
const INDEX_XXX = 0;
const INDEX_YYY = 1;
const _ = require("lodash");

const addUserValidate = (data) => {
  const addUserSchema = Joi.object({
    firstname: Joi.string().alphanum().required(),
    lastname: Joi.string().alphanum().required(),
    age: Joi.number().min(1).max(100).required(),
    coordinate: Joi.string().required(),
  });
  return addUserSchema.validate(data);
};
const checkCoordinates = async (req, res, next) => {
  try {
    const coordinate = req.body.coordinate;
    if (!coordinate) {
      return res
        .status(400)
        .json({ success: false, data: null, errors: "coordinate is null" });
    }
    const lenght = await coordinate.length;
    if (lenght != 7) {
      return res
        .status(400)
        .json({ success: false, data: null, error: "coordinate wrong format" });
    }
    const x = _.toNumber(coordinate.split(":")[INDEX_XXX]);
    const y = _.toNumber(coordinate.split(":")[INDEX_YYY]);

    if (!_.isInteger(x) || !_.isInteger(y)) {
      return res.status(400).json({
        success: false,
        data: null,
        errors: "coordinate wrong format",
      });
    }
    next();
  } catch (err) {
    console.log("checkCoordinates ERROR: " + err);
    return res
      .status(400)
      .json({ success: false, data: null, errors: "checkCoordinates fail!" });
  }
};
module.exports = { addUserValidate, checkCoordinates };
