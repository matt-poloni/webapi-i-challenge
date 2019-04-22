// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => res.send("It's working"));

server.post('/api/users', (req, res) => {
  const newUser = req.body;
  !newUser.name || !newUser.bio
    ? res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.'
      })
    : db.insert(newUser)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: 'There was an error while saving the user to the database.' }))
})

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }))
})

server.listen(5000, () => {
  console.log('*** API running on port 5000 ***');
});