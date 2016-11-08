const express = require('express');
const exphbs = require('express-handlebars');
const Sequelize = require('sequelize');
//const pg = require('pg'); Put this in database.js?

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/login', function (req, res) {
    res.render('login', {layout: false}); //layouts false excludes from global css
});

var connection = new Sequelize('ctp-project-db', 'postgres', 'ctp2016', {
	host: '127.0.0.1',
	dialect: 'postgres'

});
var Article = connection.define('article', {
	title: Sequelize.STRING,
	body: Sequelize.TEXT
});

connection.sync({ //This is how we are going to add things
	force: true
}).then(function(){
	Article.create({
		title: 'Some title',
		body: 'Some body'
	}).then(function(insertedArticle){
		console.log(insertedArticle.dataValues);
	})
})

app.listen(3000);