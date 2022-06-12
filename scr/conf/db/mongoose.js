const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://vothang:231236@vnvc.i3fhjxi.mongodb.net/vnvc",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DB CONNECTION SUCCESSFUL");
  } catch (error) {
    console.log("DB CONNECTION FAIL: " + error);
    return res
      .status(400)
      .json({ success: false, data: null, errors: "DB CONNECTION FAIL" });
  }
}

module.exports = { connect };
