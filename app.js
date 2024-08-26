// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const surveyRoutes = require('./routes/survey');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', surveyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));

module.exports = app;
