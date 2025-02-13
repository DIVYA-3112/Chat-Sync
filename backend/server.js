const express = require("express");
const dotenv = require("dotenv");

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5001; 

app.get("/", (req, res) => {
    res.end("Server started !!");
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));