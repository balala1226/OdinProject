const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs');

const appRouter  = require('./routes/index');

app.use('',appRouter);

app.use((req, res, next) => {
    res.status(404).send("Page not found")
})

app.listen(8080) 