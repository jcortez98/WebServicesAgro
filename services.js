var jwt = require('jsonwebtoken');
var services = {};

services.verificar = function(req, res, next){
  console.log("Funcion: Verificar");
  var token = services.getToken(req, res);
  jwt.verify(token, 'agro', function(err, decoded) {
    if(err) {
      res.json({
        estado: false,
        mensaje: "Error en el token",
        error: err
      });
    } else {
        console.log("Token valido");
        req.token = token;
        next();
    }
  });
}

services.getToken = function(req, res) {
  console.log("Se llamo a la funcion getToken");
  var header = req.headers.authorization;
  if(typeof header != 'undefined') {
    var headerArray = header.split(" ");
    var token = headerArray.pop();
    if(token) {
      return token;
    } else {
      console.log("No existe el token");
      res.json({
        estado: false,
        mensaje: "No existe el token"
      });
    }
  } else {
    console.log("No existe la cabecera Authorization");
    res.json({
      estado: false,
      mensaje: "No existe la cabecera Authorization"
    });
  }
}

module.exports = services;
