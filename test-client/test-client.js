let io = require('socket.io-client')

let socket = io.connect('http://localhost:3000')

let dt = 0.05;
let period = 5.0;
let numCycle = 5;
let amplitude = 1.5;
let offset = 0.0;

socket.on('connect', () => {

  let ylimDelta = 0.025*amplitude;
  let resetMsg = { 
    xlim: [0,period*numCycle],
    ylim: [-amplitude + offset - ylimDelta, amplitude + offset + ylimDelta],
  };

  socket.emit('reset',resetMsg);

  let cnt = 0;

  setInterval(()=> {
    t = dt*cnt;
    x = amplitude*Math.sin(2.0*Math.PI*t/period) + offset;
    socket.emit('data', {cnt: cnt, t: t, x: x});
    cnt += 1;
    console.log('t: ' + t.toPrecision(4) + ', x: ' + x.toPrecision(4));
    if (t >= period*numCycle) {
      cnt = 0;
      socket.emit('reset',resetMsg);
    }
  }, dt*1000);

});



