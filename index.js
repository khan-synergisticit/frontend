const express = require('express');
const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile('index.html');
});
const port = 8080;