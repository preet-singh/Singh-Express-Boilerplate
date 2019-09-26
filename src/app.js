require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';
//NODE_ENV = will be production by default on heroku 
app.use(morgan(morganOption));//want to use a different morgan depending on dev env
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
});

app.use(function errorHandler(error, req, res, next) {
    let response
    if(NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else{
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response);
});

module.exports = app;

