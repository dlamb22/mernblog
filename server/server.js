const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');

const articles = require('./routes/articles');

// Server Setup
dotenv.config({ path: './config/.env' });

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Routes
// access to express-fileupload
app.use(fileUpload());
// access parameters inside of the article form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// access to body parser
app.use('/', articles);
