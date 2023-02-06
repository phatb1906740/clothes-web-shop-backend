const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
const port = 8080;

server.use('/static', express.static('./src/public'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})