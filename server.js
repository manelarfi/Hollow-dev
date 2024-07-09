const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./config/dbConnect');
const errorHandler = require('./middlewares/errorHandler');

connectDB();

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/votes', require('./routes/voteRouter'))
app.use('/api/candidates', require('./routes/adminRoute'))
app.use(errorHandler)

const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log("im in port", port);
});