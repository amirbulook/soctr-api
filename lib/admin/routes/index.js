var express = require("express");
var router = express.Router();
var {
  admninSignIn,
  signOut,
  createHotel,
  createAgencie,
  createResturant,
  createTourismPlace,
  editHotel,
  update,
} = require("../../admin/controller");
// var { getUsers } = require("../../admin/controller");

const { verifyUser } = require("../../auth-services");
const { isAdmin } = require("../../auth-services");
const multer = require("multer");
const upload = multer();
var path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const acceptFile = function (req, file, cb) {
  const acceptedMimType = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if (acceptedMimType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// router.get('/profile', auth.verifyUser, profile);
// router.post("/signup", signUp);
router.post("/signin", admninSignIn);
router.post("/signout", verifyUser, signOut);
router.post(
  "/createHotel",
  verifyUser,
  isAdmin,
  upload.single("file"),
  createHotel
);
router.post(
  "/createAgencie",
  verifyUser,
  isAdmin,
  upload.single("file"),
  createAgencie
);
router.post(
  "/createResturant",
  verifyUser,
  isAdmin,
  upload.single("file"),
  createResturant
);
router.post(
  "/createTourismPlace",
  verifyUser,
  isAdmin,
  upload.single("file"),
  createTourismPlace
);
router.post(
  "/editHotel/:id",
  verifyUser,
  isAdmin,
  upload.single("file"),
  editHotel
);

module.exports = router;
