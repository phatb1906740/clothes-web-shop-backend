const express = require('express');

const adminRouter = require('./admin');
const colourRouter = require('./colour');

function setRoute (server) {

    server.use('/api/admin', adminRouter);

    server.use('/api/colour', colourRouter);

}

module.exports = setRoute;
