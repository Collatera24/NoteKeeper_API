const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', noteRoutes);

module.exports = app;
