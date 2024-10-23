const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
const port = 8080;