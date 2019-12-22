var PORT = process.env.PORT || 8080
const express = require('express')
const app = express()
const path = require('path')
var cors = require('cors')
var bodyParser = require('body-parser');
const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true
});
var session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/form-app/'));  
app.get('/', (req, res) => { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); 
  res.setHeader( 'Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
  res.status(200).sendFile(__dirname + '/dist/form-app/index.html');  
  
});  



app.get('/db', async(req,res)=>{
	try{
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM test_table');
		const results = {'results':(result)? result.rows:null};
		res.send(JSON.stringify(results));
		client.release();
	} catch(err){
	res.send('Error ' + err);}
});

app.get('/hello', (req, res) => res.send('Hello World!'))

app.post('/api/userCreate', (req, res) => {
	console.log('done')
	pool.query(
  "INSERT INTO test_table VALUES(3,'mine')",
  (err, res) => {
    console.log(err, res);
    pool.end();
  }
);
})


app.listen(PORT)