const express = require('express')
var bodyParser = require('body-parser')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
const socketio = require('socket.io')
//const { Socket } = require('dgram')
var mongoose = require('mongoose')

const port = process.env.PORT || 3010

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//mongodb+srv://Admin:<password>@chatappdb.m0dcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
var dbUrl ='mongodb+srv://Admin:AdminBoiDinhTRAN@chatappdb.m0dcl.mongodb.net/chatappdb?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name : String, message: String
})
// var messages = [
    // {name: "James", message: "Hello from Sydney send by hard code"}, 
    // {name: "Ritta", message: "Nice to see you send by hard code"}
// ]
app.get('/messages', (req, res) => {
    //res.send("Hello World from server by Boi Dinh")
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
    
})
app.post('/messages', (req, res) => {
    var message = new Message(req.body)
    message.save((err) => {
        if(err)
        res.sendStatus(500);

        console.log(req.body)
        //messages.push(req.body);
        io.emit('message', req.body);
        res.sendStatus(200);
    })   
})

mongoose.connect(dbUrl, (err) => {
    //if (err) return console.log(err);
    console.log('MongoDB connection successfully by Boi Dinh TRAN')
})

io.on("connection", (socket) => {
  console.log('user connected'); // true
});

var server = app.listen(port, () => {
    console.log('Server is listening on port', port)
})