const express = require("express");
const { getAllBlog } = require("../controller/BlogController");
const { userRegistration, getAdmin } = require("../controller/userController");
const { apiMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// check admin routes.
router.route("/admin/:email").get(apiMiddleware, getAdmin);
// user routes
router.put("/user/", userRegistration);

// blog routes
router.get("/blog/", getAllBlog);

module.exports = router;
