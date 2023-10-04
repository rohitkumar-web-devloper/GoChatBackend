const { app } = require('./app')
const { connection } = require('./config/dbConnection')
const requireDir = require('require-dir')
const http = require('http')
const socketIO = require('socket.io')
const { PORT } = process.env
require('dotenv').config();
requireDir('./Controller', { recurse: true });
requireDir('./Routes');
let server = http.createServer(app)
app.get('/', (req, res) => {
  res.send("hello world")
})
const io = socketIO(server, {
  origin: [
    "http://localhost:3000",
    "http://192.168.1.47:3000",
  ]
})

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
server.listen(PORT , (err) => {
  console.log(`Server run on port no. ${PORT || 9090}`)
}) 