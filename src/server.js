const express = require('express');
const cors = require('cors');

const db = require('./configs/database');
const setRouter = require('./routes/index');

const server = express();
const port = 8080;
global.__basedir = __dirname;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use('/static', express.static('./src/public'));

setRouter(server);

db.connect();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})