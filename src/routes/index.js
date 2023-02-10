const express = require('express');

const adminRouter = require('./admin');
const colourRouter = require('./colour');
const sizeRouter = require('./size');
const categoryRouter = require('./category');

function setRoute (server) {

    server.use('/api/admin', adminRouter);

    server.use('/api/colour', colourRouter);

    server.use('/api/size', sizeRouter);

    server.use('/api/category', categoryRouter);

}

module.exports = setRoute;
