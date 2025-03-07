const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const cloudinary = require("../config/cloudinary");

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
    const receiverId = req.params.id;
    // console.log(receiverId);
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

const send = async (req, res) => {
    const senderId = req.user._id; 
    const receiverId = req.params.id; // Corrected to extract receiverId directly from req.params
    const { text, image } = req.body;
    try {
        let imageUrl;

        if (image) {
            // upload image to cloudinary
            const response = await cloudinary.uploader.upload(image, {
                upload_preset: 'chat-app',
            });
            imageUrl = response.secure_url;
        }

        const message = new Message({
            senderId: senderId,
            receiverId: receiverId,
            text,
            image: imageUrl,
        });
        await message.save();

        // later part - real time chat - socket.io

        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error in send controller' });
    }
};

module.exports = { getUsersForSidebar, messages, send };