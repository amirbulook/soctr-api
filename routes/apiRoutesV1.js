var express = require("express");

const router = express.Router();

router.use("/admin", require("../lib/admin/routes"));

router.use("/users", require("../lib/users/routes"));

router.use("/services", require("../lib/services/routes"));

router.use("/commnets", require("../lib/comments/routes"));

module.exports = router;
