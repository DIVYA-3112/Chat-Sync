// installing express
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// dotenv configuration
const dotenv = require('dotenv');
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

// importing dependencies
const authRoutes = require('./routes/authRoutes');
const connect = require('./config/db');

// importing constants
const PORT = process.env.PORT;

// connection with mongoose
connect();

// authRoutes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});