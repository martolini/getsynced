import path from 'path';
import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import Parse from 'parse';
import request from 'superagent';

let app = express();

app.set('port', (process.env.PORT || 5000));

let server = app.listen(app.get('port'), () => {
  console.log('Listening on port: ' + app.get('port'));
});

let io = socketio(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


function sendSlackMessage(url, message, channel) {
  let payload = {
    text: message,
    username: 'getsynced'
  };
  if (!!channel) {
    payload.channel = channel;
  }
  return request
          .post(url)
          .send(payload)
}

app.post('/webhooks/slack/', async (req, res) => {
  let data = req.body;
  io.emit(data.team_id, data);
  res.send("Your syncmessage has been saved!");
});

app.post('/webhooks/slack/test/', async (req, res) => {;
  sendSlackMessage(req.body.url, "This is a test")
    .end((err, response) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send("OK");
      }
    });
});

app.get('*', async (req, res, next) => {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});
