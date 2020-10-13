//require express, path, favicon, logger
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('./config/database');

//create express app
const app = express();

//mount morgan middleware and express.json()
app.use(logger('dev'));
app.use(express.json());

//Mount and configure both serve-favicon & static middleware 
//so that they serve from the build(production-ready) folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
})