// implement your API here
const express = require('express');
const cors = require('cors');

const db = require('./data/db');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => res.send("It's working"));

// POST new user
server.post('/api/users', (req, res) => {
  const newUser = req.body;
  !newUser.name || !newUser.bio
    ? res.status(400).json({ error: 'Please provide name and bio for the user.' })
    : db.insert(newUser)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: 'There was an error while saving the user to the database.' }))
})

// GET all users
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }))
})

// GET specific user
server.get('/api/users/:id', (req, res) => {
  const userID = req.params.id;
  db.findById(userID)
    .then(user => {
      !user
        ? res.status(404).json({ error: 'The user with the specified ID does not exist.' })
        : res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ error: 'The user information could not be retrieved.' }))
})

// DELETE specific user
server.delete('/api/users/:id', (req, res) => {
  const userID = req.params.id;
  const deleted = db.findById(userID);
  db.remove(userID)
  .then(user => {
    !user
      ? res.status(404).json({ error: 'The user with the specified ID does not exist.' })
      : res.status(200).json(deleted);
  })
  .catch(err => res.status(500).json({ error: 'The user could not be removed.' }))
})

// PUT (update) specific user
server.put('/api/users/:id', (req, res) => {
  const newUser = req.body;
  const userID = req.params.id;
  !newUser.name || !newUser.bio
    ? res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    : db.update(userID, newUser)
        .then(user => {
          !user
            ? res.status(404).json({ error: 'The user with the specified ID does not exist.' })
            : res.status(200).json(newUser);
        })
        .catch(err => res.status(500).json({ error: 'The user information could not be modified.' }))
})

server.listen(5000, () => {
  console.log('*** API running on port 5000 ***');
});