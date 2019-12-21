var PORT = process.env.PORT || 8080
const express = require('express')
const app = express()


app.get('/hello', (req, res) => res.send('Hello World!'))

app.post('/api/userCreate', (req, res) => {
	console.log('done')
    res.json({
        data: req.body
    })
	
})


app.listen(PORT)