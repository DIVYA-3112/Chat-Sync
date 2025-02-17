const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data");

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001; 

app.get("/", (req, res) => {
    res.send("Server started !!");
});

app.get("/api/chats" , (req,res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req,res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})

app.listen(PORT, console.log(`Server started on port ${PORT}`));