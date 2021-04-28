require('dotenv').config();
const mongoose = require('mongoose');

const expressApp = require('./app');
const config = require('./config');

// Mongo Connection
mongoose
    .connect(config.db.uri, config.db.options)
    .then((res) => {
        console.log('Connected to DB');

        expressApp.init();
    })
    .catch((err) => console.error(err));
