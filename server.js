var PORT = process.env.PORT || 8080
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(__dirname + '/dist/form-app/'));  
app.all('*', (req, res) => {  
  res.status(200).sendFile(__dirname + '/dist/form-app/index.html');  
});  
app.get('/hello', (req, res) => res.send('Hello World!'))

app.post('/api/userCreate', (req, res) => {
	console.log('done')
    res.json({
        data: req.body
    })
	
})


app.listen(PORT)