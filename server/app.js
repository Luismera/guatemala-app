'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var event_routes = require('./routes/event');
var promotion_routes = require('./routes/promotion');

// Data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

// Routes
app.use('/api', user_routes);
app.use('/api', event_routes);
app.use('/api', promotion_routes);
app.use('/', (req, res) => {
	res.send("Welcome to API REST")
});

module.exports = app;
