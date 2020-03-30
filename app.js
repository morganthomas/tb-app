const express = require('express');
const mongoose = require('mongoose');
const indexController = require('./controllers/index');
const apiController = require('./controllers/api');

const port = 3000;

mongoose.connect('mongodb://localhost/tb-app');

const app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/blog/:blog', apiController.blog);
app.get('/templates/:template', indexController.template);
app.get('/', indexController.index);

const server = app.listen(port, function () {
    console.log('Express server listening on ' + port);
});
