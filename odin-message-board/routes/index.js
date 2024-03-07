const express = require('express');
const router = express.Router();

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
 ];

router.get('/', (req,res) => {
    console.log("Test");
    res.render('index', {title: 'Mini Message Board', messages: messages})
});

router.get('/new', (req,res) => {
    res.render('form', {user:"", text:""})
});

router.post('/new', (req,res) => {
    const newMessage = {
        text: req.body.message,
        user: req.body.user,
        added: new Date()
    }
    messages.push(newMessage);

    res.redirect('/');
});

module.exports = router