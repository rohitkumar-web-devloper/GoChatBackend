/* eslint-disable no-undef */
const socketIO = require('socket.io')
const { app } = require('./app')
const http = require('http')
let server = http.createServer(app)
const fs = require("fs")
app.get('/', (req, res) => {
    res.send("hello world")
})
const io = socketIO(server, {
    cors:{
        origins: [
            // "http://localhost:3000/",
            "http://192.168.1.47:3000",
        ]
    }
})
io.on('connection', async (socket) => {
    const socketId = socket.id
    const userId = socket.handshake.auth.userId
    const filePath = `${__dirname}/SocketSession/SocketAuth.js`;
    const dataToAppend = { socketId: socketId, userId: userId };
    fs.readFile(filePath, 'utf8', (err, res) => {
        if (err) {
            console.log(err)
        } else {
            if (res.length == 0) {
                fs.appendFile(filePath, `[${JSON.stringify(dataToAppend)}]`, (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                    } else {
                        console.log('File overwritten successfully!');
                    }
                });
            } else {
                const valid = JSON.parse(res)
                const exist = valid.findIndex(pq => pq.userId == userId)
                if (exist !== -1) {
                    valid.splice(exist, 1)
                }
                const newData = [...valid, dataToAppend]
                fs.writeFile(filePath, `${JSON.stringify(newData)}`, (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                    } else {
                        console.log('File overwritten successfully! Again');
                    }
                });
            }
        }
    })
    socket.on('sendMessage', ({ message, sender, reciver, time }) => {
        console.log(message, reciver)
        fs.readFile(filePath, "utf8", (err, res) => {
            if (err) {
                console.log(err)
            } else {
                const filter = JSON.parse(res)
                const exist = filter.find(pq => pq.userId == reciver)
                socket.to(exist.socketId).emit("recieveMessage", { sender, message, time, reciver })
            }
        })
    })
    console.log('user connected' , userId);
    socket.on('disconnect', () => {
        console.log('A user disconnected', userId);
    });
});
module.exports = {
    server,
    io
} 