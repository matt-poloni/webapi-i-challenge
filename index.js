// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => res.send("It's working"));

server.listen(5000, () => {
  console.log('*** API running on port 5000 ***');
});