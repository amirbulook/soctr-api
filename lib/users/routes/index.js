var express = require("express");
var router = express.Router();
var {
  signUp,
  signIn,
  profile,
  signOut,
  postComment,
  index,
  deleteUsere,
  getCommentsByServiceId,
} = require("../../users/controller");
const auth = require("../../auth-services");
const { verifyUser } = require("../../auth-services");

router.get("/", index);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", auth.verifyUser, profile);
router.post("/signout", auth.verifyUser, signOut);
router.post("/postComment/:id", auth.verifyUser, postComment);
router.delete("/:id", auth.verifyUser, deleteUsere);
router.get(
  "/getCommentsByServiceId/:id",
  auth.verifyUser,
  getCommentsByServiceId
);
module.exports = router;
