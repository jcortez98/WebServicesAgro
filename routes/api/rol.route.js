var express = require('express');
var rol = require('../../model/rol.model');
var services = require('../../services');
var rolRouter = express.Router();

rolRouter.get('/rol', services.verificar, function(req, res){
  rol.selectAll(function(resultado){
    if(typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"mensaje": "No hay roles"});
    }
  });
});

module.exports = rolRouter;
