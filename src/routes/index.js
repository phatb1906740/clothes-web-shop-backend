const express = require('express');

const adminRouter = require('./admin');
const colourRouter = require('./colour');
const sizeRouter = require('./size');

function setRoute (server) {

    server.use('/api/admin', adminRouter);

    server.use('/api/colour', colourRouter);

    server.use('/api/size', sizeRouter);

}

module.exports = setRoute;
