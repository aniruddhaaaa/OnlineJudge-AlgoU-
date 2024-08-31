require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const problemController = require('./controller/problemController')

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', require('./controller/authController'));
app.use('/problems', problemController);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on port ' + port));