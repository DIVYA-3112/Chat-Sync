const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Message = require('../models/messageModel');

const getUsersForSidebar = async (req, res) => {
    const user = req.user;
    const userId = user._id;
    try {
        // all users expect current users and send everyrhing except password.
        const users = await User.find({ _id: { $ne: userId } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error in getUsersForSidebar controller' });
    }
};

const messages = async (req, res) => {
    const userId = req.user._id;
    const { receiverId } = req.params.id;
    try {
        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: receiverId },
                { senderId: receiverId, receiverId: userId },
            ],
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error in messages controller' });
    }
};

module.exports = { getUsersForSidebar, messages };