var five = require("johnny-five");
var board = new five.Board();

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require("path");

/* Board Settings
- White - Left - 6
- Green - Forwards - 7
- Yellow - Backwards - 8
- Blue - Right - 9
*/

var ON = parseInt(0);
var OFF = parseInt(1);

var leftPin = 6,
    rightPin = 9,
    backwardsPin = 8,
    forwardsPin = 7;

board.on('ready', function() {
  this.pinMode(leftPin, five.Pin.OUTPUT);
  this.pinMode(rightPin, five.Pin.OUTPUT);
  this.pinMode(forwardsPin, five.Pin.OUTPUT);
  this.pinMode(backwardsPin, five.Pin.OUTPUT);
  stopAll();
});

function stopAll() {
  board.digitalWrite(leftPin, OFF);
  board.digitalWrite(rightPin, OFF);
  board.digitalWrite(forwardsPin, OFF);
  board.digitalWrite(backwardsPin, OFF);
}

// Moving In directions
function goForwards() {
  board.digitalWrite(backwardsPin, OFF);
  board.digitalWrite(forwardsPin, ON);
}

// Stuff to start the server!
app.use('/client', express.static('client'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

io.on('connection', function (socket) {
  console.log('A user has connected. Welcome!')
})
