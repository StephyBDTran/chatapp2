const express = require('express')

const app = express()
app.use(express.static(__dirname))

const port = process.env.PORT || 3010

var messages = [
    {name: "Phuong", message: "Hello from Sydney!"},
    {name: "Ngoc", message: "How are you?"},
    {name: "Kevin", message: "Nice to meet you!"}
]

app.get('/messages', (req,res) => {
    //res.send("Hello World from server by Boi Dinh")
    res.send(messages)
})

var server = app.listen(port, () => {
console.log('Server is listening on port', port)
})
