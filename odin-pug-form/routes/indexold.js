const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index')
});

router.get('/books', (req,res) => {
    res.render('books')
});

router.get('/authors', (req,res) => {
    res.render('authors')
});

router.get('/genres', (req,res) => {
    res.render('genres')
});

router.get('/allBookCopies', (req,res) => {
    res.render('allBookCopies')
});

router.get('/createAuthor', (req,res) => {
    res.render('createAuthor')
});

router.get('/createGenre', (req,res) => {
    res.render('createGenre')
});

router.get('/createBook', (req,res) => {
    res.render('createBook')
});

router.get('/createCopy', (req,res) => {
    res.render('createCopy')
});

module.exports = router