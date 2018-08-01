const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog.find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
}); // Get all Blogs

router.get('/featured', (req, res) => {
    Blog.find({ featured: true })
        .then(blogs => {
            res.status(200).json(blogs);
        });
}); // Get all featured Blogs

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blogs => {
            if (blogs) {
                res.status(200).json(blogs)
            } else {
                res.status(404).send("ID Not Found")
            }
        })
}); // Get blog when a valid ID is presented

router.post('/', (req, res) => {
    let dbUser = null;
    console.log('from blogs.js', req)
    User
        .findById(req.body.authorId)
        .then(user => {
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog));
        })
}); // Create a Blog + associate with userId

router.put('/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body).then(blog => {
        res.status(204).json(blog)
    })
        .then(() => console.log("Saved the item"))
}); // Update a Blog

router.delete('/:id', (req, res) => {
    if (req.params.id) {
        Blog.findByIdAndRemove(req.params.id)
            .then(blog => {
                res.send(req.params.id)
            })
    }
    else {
        res.status(404).send("ID Not Found");
    }
}); // Delete a Blog

module.exports = router;