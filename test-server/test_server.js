let express = require('express')
let http = require('http')
let socketio = require('socket.io')

let app = express()
let server = http.Server(app)
let io = socketio(server)

app.use(express.static('public'))

let port = 3000
server.listen(port)
console.log('listening on port = ' + port)

io.on('connection', (socket) => {

  console.log('client connected: ' + socket.handshake.address)

  socket.on('reset', (msg) => {
    console.log('reset: ' + JSON.stringify(msg,precisionReplacer));
    io.emit('reset', msg);
    haveLimits = true;
    limitsMsg = msg;
  });

  socket.on('data', (msg) => {
    console.log('msg: ' + JSON.stringify(msg, precisionReplacer));
    io.emit('data', msg); 
  });

});

app.get('/', (req, res) => {
  res.sendfile('index.html')
})

let precisionReplacer = (key,val) => { 
  return val.toPrecision ? Number(val.toPrecision(4)) : val;
};
