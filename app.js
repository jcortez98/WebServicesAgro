var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Routes
var authRoute = require('./routes/auth.route');
var usuarioRoute = require('./routes/api/usuario.route');
var rolRoute = require('./routes/api/rol.route');
var historialRoute = require('./routes/api/historial.route');
var categoriaProductoRoute = require('./routes/api/categoriaProducto.route');
var productoRoute = require('./routes/api/producto.route');
var preguntaRoute = require('./routes/api/pregunta.route');

var app =  express();
var port = 3000;
var uri = '/api/v1/';

//Configuracion del Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});

app.use('/', authRoute);
app.use(uri, usuarioRoute);
app.use(uri, rolRoute);
app.use(uri, historialRoute);
app.use(uri, categoriaProductoRoute);
app.use(uri, productoRoute);
app.use(uri, preguntaRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  next();
});

app.listen(port, function() {
  console.log("Se inicio el servidor en el puerto: " + port);
});
