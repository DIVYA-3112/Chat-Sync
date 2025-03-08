// installing express
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// dotenv configuration
const dotenv = require('dotenv');
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
  app.use(cors(corsOptions));

// importing routes
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const connect = require('./config/db');

// importing constants
const PORT = process.env.PORT;

// connection with mongoose
connect();

// authRoutes
app.use('/api/auth', authRoutes);

// messageRoutes
app.use('/api/message', messageRoutes)

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});