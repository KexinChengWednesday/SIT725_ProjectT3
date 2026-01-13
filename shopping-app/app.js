require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
// body parser
app.use(express.urlencoded({ extended: true }));
// Your routes and middlewares here

app.use(express.static(path.join(__dirname, 'public')));


const router = require('./routes/router');
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
