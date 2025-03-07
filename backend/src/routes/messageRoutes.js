const express = require("express");
const router = express.Router();

// importing message routes controllers'

const { getUsersForSidebar, messages } = require("../controllers/messageController");
const { protectRoute } = require("../middlewares/protectRoute");

// message routes
router.get("/getUsers", protectRoute, getUsersForSidebar);
router.get("/messages/:id", protectRoute, messages);

// exporting message routes
module.exports = router;
