//import Sequelize from 'sequelize';
//const pg = require('pg');
var http = require('http');
var Pool = require('pg').Pool;
//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ctp-project-db';
//var db = pgp("postgres://postgres:ctp2016@localhost:5432/ctp-project-db"); //username, password, localhost, db name

var config = {
  host: '127.0.0.1',
  user: 'postgres',
  password: 'ctp2016',
  database: 'ctp-project-db',
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack)
})

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config)

var server = http.createServer(function(req, res) {

  var onError = function(err) {
    console.log(err.message, err.stack)
    res.writeHead(500, {'content-type': 'text/plain'});
    res.end('An error occurred');
  };

  pool.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function(err) {
    if (err) return onError(err);

    // get the total number of visits today (including the current visit)
    pool.query('SELECT COUNT(date) AS count FROM visit', function(err, result) {
      // handle an error from the query
      if(err) return onError(err);
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('You are visitor number ' + result.rows[0].count);
    });
  });
});

pool.query('SELECT * FROM username'{
	if(err) return onError(err);
	res.writeHead(200, {'content-type': 'text/plain'});
    res.end('Here are the users: ' + result.rows[0].count);
});

pool
  .query('CREATE TABLE IF NOT EXISTS visit (date timestamptz)')
  .then(function() {
    server.listen(3001, function() {
      console.log('server is listening on 3001')
    })
  })

/*const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });*/