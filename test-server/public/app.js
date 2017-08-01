"use strict";

Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'deep-purple',
  accent: 'pink',
  warn: 'orange',
  background: 'grey'
})

var app = new Vue({
  el: '#app',
  data: {
    socket: null,
    graph: null,
    options: {
      xlim: [0,10],
      ylim: [-1,1],
    },
    sioMsg: {},
    showSioMsgTable: false,
    pts: [],
  },
  methods: {
    setupSockets: function() {
      this.socket = io.connect('http://' + document.domain + ':' + location.port)
      this.socket.on('reset', (msg) => {
        this.options.xlim = msg.xlim;
        this.options.ylim = msg.ylim;
        this.resetGraph();
      });
      this.socket.on('data', (msg) => {
        this.sioMsg = msg;
        this.pts.push([msg.t, msg.x]);
        app.graph.updateOptions({file: app.pts});
      });
    },
    onClearPlotButton: function() {
      console.log('onClearPlotButton');
      this.resetGraph();
    },
    resetGraph: function() {
      let dummyPts = [[-1.0, 0.0]];  // dummy pts
      this.graph = new Dygraph( this.$refs.liveplot, dummyPts, {
        dateWindow: this.options.xlim,
        valueRange: this.options.ylim,
        strokeWidth: 1.75,
        labels: ['time', 'volt'],
        xlabel: "time (s)",
        ylabel: "position (m)",
        height: 400,
        showLabelsOnHighlight: false,
        interactionModel: {},
        drawXGrid: true,
        colors: ["rgb(255,0,0)"],
      });
      this.pts = [];
    },
  },
  mounted: function() { 
    this.setupSockets();
    this.resetGraph();
  }
});


