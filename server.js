var PORT = process.env.PORT || 8080
const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/form-app/'));  
app.get('*', (req, res) => { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); 
  res.status(200).sendFile(__dirname + '/dist/form-app/index.html');  
});  
app.get('/hello', (req, res) => res.send('Hello World!'))

app.post('/api/userCreate', (req, res) => {
	console.log('done')
})


app.listen(PORT)