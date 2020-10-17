//require express, path, favicon, logger
const cors = require('cors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const productsRouter = require('./routes/api/products');
const usersRouter = require('./routes/api/users');

//create express app
const app = express();

//mount morgan middleware and express.json()
app.use(cors());
//Mount and configure both serve-favicon & static middleware 
//so that they serve from the build(production-ready) folder
app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

//api routes before "catch all" route
app.use('/api/users', usersRouter);
//Mount the auth middleware that processes JWTs
app.use(require('./config/auth'));
app.use('/api/products', productsRouter);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
})