var express = require('express');
var pregunta = require('../../model/pregunta.model');
var services = require('../../services');
var preguntaRouter = express.Router();

preguntaRouter.get('/pregunta', services.verificar, function(req, res){
  pregunta.selectAll(function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje": "No hay preguntas"});
    }
  });
});

preguntaRouter.get('/pregunta/:idPregunta', services.verificar,
 function(req, res){
  var idPregunta = req.params.idPregunta;
  pregunta.selectPregunta(idPregunta, function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje":"No existe la pregunta"});
    }
  });
})

preguntaRouter.post('/pregunta', services.verificar, function(req, res){
  var data = {
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    correo: req.body.correo,
    descripcion: req.body.descripcion,
    idUsuario: req.body.idUsuario
  }
  console.log(data);
  pregunta.insert(data, function(resultado) {
    if(typeof resultado !== undefined && resultado.affectedRows > 0) {
      resultado.status = true;
      resultado.mensaje = "Se registro la pregunta correctamente";
      res.json(resultado);
    } else {
      resultado.status = false;
      resultado.mensaje = "No se registro la pregunta";
      res.json(resultado);
    }
  });
});

preguntaRouter.delete('/pregunta/:idPregunta', services.verificar,
 function(req, res){
  var id = req.params.idPregunta;
  var data = {
    idPregunta: id,
    idUsuario: req.body.idUsuario
  }
  pregunta.delete(data, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado"){
      res.json({"mensaje":"Se eliminó la pregunta correctamente"});
    } else {
      res.json({"mensaje":"No se elimino la pregunta"});
    }
  });
});

module.exports = preguntaRouter;
