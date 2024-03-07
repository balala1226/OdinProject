const express = require('express')
const port = process.env.PORT || 8080;

const app = express()

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dev_db_url =
  "mongodb+srv://balalala1226:pO9MwGF86UZCYV4C@cluster0.agsgxoy.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.set('view engine', 'pug');
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

app.use((req, res, next) => {
    res.status(404).send("Page not found")
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});