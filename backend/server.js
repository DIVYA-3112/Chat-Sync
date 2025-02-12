const express = require("express");

const app = express();
const PORT = 5000; 

app.get("/", (req, res) => {
    res.end("Server started !!");
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));