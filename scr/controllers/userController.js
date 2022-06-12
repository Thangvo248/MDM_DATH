const MapBroder = require("../models/mapBroders");
//const { addUserValidate } = require("../middlewares/validateJoi");

class MapBroderController {
  /*  async addUser(req, res) {
    try {
      const { error } = addUserValidate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, data: null, error: error });
      }
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        coordinate: req.body.coordinate,
      });
      await newUser.save();
      return res.status(201).json({
        success: true,
        messages: "add user successfully",
        error: null,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(503)
        .json({ success: false, data: null, error: "addUser failed" });
    }
  }
  async getUser(req, res) {
    try {
      const userId = req.query.id;
      const user = await User.findOne({
        id: userId,
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, errors: "User not found" });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      return res.status(503).json({ success: false, errors: "getUser failed" });
    }
  }
  async searchUser(req, res) {
    try {
      const name = req.query.name;
      console.log(name);
      let user = await User.find({
        $or: [
          {
            firstname: name,
          },
          { lastname: name },
        ],
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, data: null, errors: "User not found" });
      }
      await user.sort((a, b) => {
        let fa = a.firstname.toLowerCase();
        let fb = b.firstname.toLowerCase();
        if (fa > fb) return 1;
        if (fa < fb) return -1;
        return 0;
      });
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res
        .status(503)
        .json({ success: false, data: null, errors: "searchUser failed" });
    }
  }
  async editUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findOne({
        id: userId,
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, data: null, errors: "User not found" });
      }
      await User.updateOne({ id: userId }, { $set: req.body });
      return res.status(200).json({
        success: true,
        messages: "edit User successfully",
        error: null,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(503)
        .json({ success: false, errors: "editUser failed" });
    }
  }
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      await User.deleteOne({ id: userId });
      return res.status(200).json({
        success: true,
        messages: "edit User successfully",
        error: null,
      });
    } catch (err) {
      console.log(error);
      return res
        .status(503)
        .json({ success: false, data: null, errors: "editUser failed" });
    }
  }
  async locateUser(req, res) {
    try {
      const userId = req.query.userId;
      const n = req.query.n;
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, data: null, errors: "User not found" });
      }
      let users = await User.find({ id: { $ne: userId } });
      await users.sort((a, b) => {
        const fa = calDistance(a.coordinate, user.coordinate);
        const fb = calDistance(b.coordinate, user.coordinate);
        if (fa > fb) return 1;
        if (fa < fb) return -1;
        return 0;
      });
      let result = [];
      for (let i = 0; i < n; i++) {
        result.push(users[i]);
      }

      return res.status(200).json({ success: true, data: result, error: null });
    } catch (error) {
      console.log(error);
      return res
        .status(503)
        .json({ success: false, data: null, errors: "editUser failed" });
    }
  }*/
  async getAll(req, res) {
    const mapBroder = await MapBroder.find();
    return res.json({ data: mapBroder });
  }
  async getProvince(req, res) {
    const mapBroder = await MapBroder.find({}, { _id: 0, name: 1 });
    return res.json({ data: mapBroder });
  }
  async getDistrict(req, res) {
    const province = req.query.province;
    const mapBroder = await MapBroder.aggregate([
      { $match: { name: province } },
      { $unwind: "$level2s" },
      { $project: { name: "$level2s.name", _id: 0 } },
    ]);
    return res.json({ data: mapBroder });
  }
  async getWard(req, res) {
    const { province, district } = req.query;
    const mapBroder = await MapBroder.aggregate([
      { $match: { name: province } },
      { $unwind: "$level2s" },
      { $match: { "level2s.name": district } },
      { $project: { name: "$level2s.level3s.name", _id: 0 } },
      { $unwind: "$name" },
    ]);
    return res.json({ data: mapBroder });
  }
}
module.exports = new MapBroderController();
