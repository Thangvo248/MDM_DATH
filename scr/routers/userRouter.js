var express = require("express");
var router = express.Router();

const MapBroderController = require("../controllers/userController");

router.get("/", MapBroderController.getAll);

router.get("/province", MapBroderController.getProvince);

router.get("/district", MapBroderController.getDistrict);

router.get("/ward", MapBroderController.getWard);
module.exports = router;
