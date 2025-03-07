const express = require("express");
const router = express.Router();

// importing message routes controllers'

const { getUsersForSidebar, messages, send } = require("../controllers/messageController");
const { protectRoute } = require("../middlewares/protectRoute");

// message routes
router.get("/getUsers", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, messages);
router.post("/send/:id", protectRoute, send);

// exporting message routes
module.exports = router;
