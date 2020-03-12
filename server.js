const express = require("express");
const exphbs = require("express-handlebars");
const orm = require("./config/orm.js");

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 9000;

app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/search', (req, res) => {
  res.render('search'); 
});

app.get('/insert', (req, res) => {
  res.render('insert');
});

app.get('/update', (req, res) => {
  res.render('update');
});

app.get('/delete', (req, res) => {
  res.render('delete');
});

app.post('/search', (req, res) => {
  orm.search(req.body.type, req.body.value, function(data) {
    res.json(data);
  });
});

app.post('/api/insert', (req, res) => {
  orm.insert(req.body.title, req.body.artist, req.body.genre, function(result) {
    res.json(result.affectedRows);
  });
});

app.post('/api/update', (req, res) => {
  orm.update(req.body.type, req.body.set, req.body.type, req.body.where, function(result) {
    res.json(result.changedRows);
  });
});

app.delete('/delete/:title', (req, res) => {
  orm.delete(req.params.title, function(result) {
    res.json(result.affectedRows);
  });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});