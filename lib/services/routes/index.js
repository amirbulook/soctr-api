var express = require("express");
var router = express.Router();
var {
  getHotels,
  getAgencies,
  getResturants,
  getTourismPlaces,
  deleteServices,
  getService,
  // EditHotel,
  // getHotelsById,
} = require("../../services/controller");
const auth = require("../../auth-services");
const { verifyUser } = require("../../auth-services");
const multer = require("multer");
var path = require("path");

router.get("/getHotels", verifyUser, getHotels);
// router.get("/ServiceById/:id", getServiceById);
router.get("/getAgencies", verifyUser, getAgencies);
router.get("/getResturants", verifyUser, getResturants);
router.get("/getTourismPlaces", verifyUser, getTourismPlaces);
router.delete("/:id", verifyUser, deleteServices);
router.get("/getServiceById/:id", verifyUser, getService);
// router.put("/:id", EditHotel);

module.exports = router;
