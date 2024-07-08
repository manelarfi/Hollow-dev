const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./config/dbConnect')

connectDB();

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'))

const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log("im in port", port);
});