const express = require('express');
const logger = require('morgan')
// const bodyParser = require('body-parser');
const http = require('http');
const port = parseInt(process.env.PORT, 10) || 8000;

// Set up the express app
const app = express();

const Inventory = require('./models/inventory')

app.use(express.static('public'));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// for simplicity purposes, not defining separate controllers/route files
app.get('/daily.json', (req, res) => {
  Inventory.group_by(req.query.type)
    .then((inventories) => {
      res.status(200).send(inventories)
    })
    .catch(error => res.status(400).send(error));
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'If you are simply testing the app, it seems to be running. :D',
}));

app.set('port', port);

const server = http.createServer(app);

server.listen(port);