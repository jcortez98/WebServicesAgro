var express = require('express');
var historial = require('../../model/historial.model.js');
var services = require('../../services');
var historialRouter = express.Router();

historialRouter.get('/historial', services.verificar, function(req, res){
  historial.selectAll(function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje":"No existen elementos en el historial"});
    }
  });
});

module.exports = historialRouter;
