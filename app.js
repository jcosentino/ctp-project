const express = require('express');
const exphbs = require('express-handlebars');

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
    res.send('login page?'); //testing fuctionality
});

app.listen(3000);