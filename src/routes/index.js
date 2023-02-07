const express = require('express');

const adminRouter = require('./admin');

function setRoute (server) {

    server.use('/api/admin', adminRouter);

}

module.exports = setRoute;
