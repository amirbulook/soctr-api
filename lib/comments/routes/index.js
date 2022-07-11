var express = require("express");
var router = express.Router();
var { allComments, deleteComments } = require("../../comments/controller");

const { verifyUser } = require("../../auth-services");
const { isAdmin } = require("../../auth-services");

router.get("/allComments", verifyUser, allComments);
router.delete("/deleteComments/:id", verifyUser, deleteComments);

module.exports = router;
