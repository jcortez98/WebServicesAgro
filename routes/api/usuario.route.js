var express = require('express');
var usuario = require('../../model/usuario.model');
var services = require('../../services');
var usuarioRouter = express.Router();

usuarioRouter.get('/usuario', services.verificar, function(req, res){
  usuario.selectAll(function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje": "No hay usuarios"});
    }
  });
});

usuarioRouter.get('/usuario/:idUsuario', services.verificar, function(req, res){
  var idUsuario = req.params.idUsuario;
  usuario.selectUsuario(idUsuario, function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje":"No existe el usuario"});
    }
  });
})

usuarioRouter.post('/usuario', services.verificar, function(req, res){
  var data = {
    idRol: req.body.idRol,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    nick: req.body.nick,
    contrasena:req.body.contrasena
  }
  usuario.insert(data, function(resultado) {
    if(typeof resultado !== undefined && resultado.affectedRows > 0) {
      resultado.status = true;
      resultado.mensaje = "Se registro el usuario correctamente";
      res.json(resultado);
    } else {
      resultado.status = false;
      resultado.mensaje = "No se registro el usuario";
      res.json(resultado);
    }
  });
});

usuarioRouter.put('/usuario/:idUsuario', services.verificar, function(req, res){
  var idUsuario = req.params.idUsuario;
  var data = {
    idUsuario: req.body.idUsuario,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }
  console.log(data);
  if(idUsuario == data.idUsuario) {
    usuario.update(data, function(resultado){
      if(typeof resultado !== undefined){
        //auth.cerrarSesion(res);
        res.json({"Editado":"true"});
      } else {
        res.json({"mensaje":"No se pudo actualizar"});
      }
    });
  } else {
    res.json({mensaje: "No hay coherencia en los indicadores"});
  }
});

usuarioRouter.delete('/usuario/:idUsuario', services.verificar, function(req, res){
  var idUsuario = req.params.idUsuario;
  console.log(idUsuario);
  usuario.delete(idUsuario, function(resultado){
    console.log(resultado);
    if(resultado && resultado.mensaje === "Eliminado"){
      res.json({"mensaje":"Se elimino el usuario correctamente"});
    } else {
      res.json({"mensaje":"Se elimino el usuario"});
    }
  });
});

module.exports = usuarioRouter;
