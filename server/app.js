const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user');
const recRoutes = require('./routes/reclamation');
const app = express();


// mongoose.connect(
//     'mongodb+srv://'+ process.env.MONGO_ATLAS_USER ||""+':' + process.env.MONGO_ATLAS_PW + '@projet-web.16rfjod.mongodb.net/?retryWrites=true&w=majority',
// );
mongoose.connect(
'mongodb://localhost:27017');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   // Now it's safe to do any operations with your models
// });

/******************** Config **********************/

app.use(morgan('dev'));
app.use(cors(
    {
        origin: [process.env.CLIENT_URL],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        credentials: true
    }
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/******************** Routes **********************/

app.use('/user', userRoutes);
app.use('/reclamation', recRoutes);


/******************** Errors **********************/

app.use((req, res, next) => {
    const error = new Error("NOT FOUND");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
    });
});

module.exports = app;