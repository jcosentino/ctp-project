const express = require('express');
const exphbs = require('express-handlebars');
//const pg = require('pg'); Put this in database.js?

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//app.set('views', `${__dirname}/views/`); //?
//app.use(viewHelpers.register()); //?
//app.use(require('./controllers/')); //?

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/login', function (req, res) {
    //res.send('login page?'); //need to redirect to ./views/layouts/login.html
    res.render('login', {layout: false}); //layouts false excludes from global css
});

//const articles = require('./controllers/articles');
//app.use('/articles', articles);

app.listen(3000);