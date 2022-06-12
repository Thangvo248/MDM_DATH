const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const nanoid = require("nanoid");

const mapBroder = new Schema({
  level1_id: { type: String },
  name: { type: String },
  type: { type: String },
  id: { type: String, default: () => nanoid.nanoid() },
  level2s: [
    {
      level2s_id: { type: String },
      name: { type: String },
      type: { type: String },
      level3s: [
        {
          level3s: { type: String },
          name: { type: String },
          type: { type: String },
        },
      ],
    },
  ],
});

//middleware

module.exports = mongoose.model("mapBroder", mapBroder);
