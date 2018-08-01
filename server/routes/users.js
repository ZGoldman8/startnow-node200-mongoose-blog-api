const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send("ID Not Found");
            }
        })
}); // GET - Get single user

router.post("/", (req, res) => {
    const newUser = new User(req.body);
    newUser.save().then(newUser => {
        res.status(201).json(newUser);
    });
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).then(user => {
        res.status(204).json(user);
    })
        .then(() => console.log('Saved the item'));
}); // PUT - Update a user

router.delete('/:id', (req, res) => {
    if (req.params.id) {
        User.findByIdAndRemove(req.params.id)
            .then(user => {
                res.send(req.params.id);
            })
    } else {
        res.status(400).send("ID Not Found")
    }
}); // DELETE - Delete a user

module.exports = router;