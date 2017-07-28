var express = require('express');
var producto = require('../../model/producto.model');
var services = require('../../services');
var productoRouter = express.Router();

productoRouter.get('/producto', services.verificar, function(req, res){
  producto.selectAll(function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje": "No hay productos"});
    }
  });
});

productoRouter.get('/producto/:idProducto', services.verificar,
 function(req, res){
  var idProducto = req.params.idProducto;
  producto.selectProducto(idProducto, function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje":"No existe el producto"});
    }
  });
})

productoRouter.post('/producto', services.verificar, function(req, res){
  var data = {
    idCategoriaProducto: req.body.idCategoriaProducto,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    idUsuario: req.body.idUsuario
  }
  producto.insert(data, function(resultado) {
    if(typeof resultado !== undefined && resultado.affectedRows > 0) {
      resultado.status = true;
      resultado.mensaje = "Se registro el producto correctamente";
      res.json(resultado);
    } else {
      resultado.status = false;
      resultado.mensaje = "No se registro el producto";
      res.json(resultado);
    }
  });
});

productoRouter.put('/producto/:idProducto', services.verificar,
function(req, res){
  var idProducto = req.params.idProducto;
  var data = {
    idProducto: req.body.idProducto,
    idCategoriaProducto: req.body.idCategoriaProducto,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    idUsuario: req.body.idUsuario
  }
  console.log(data);
  if(idProducto == data.idProducto) {
    producto.update(data, function(resultado){
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

productoRouter.delete('/producto/:idProducto', services.verificar,
 function(req, res){
  var id = req.params.idProducto;
  var data = {
    idProducto: id,
    idUsuario: req.body.idUsuario
  }
  producto.delete(data, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado"){
      res.json({"mensaje":"Se eliminó el producto correctamente"});
    } else {
      res.json({"mensaje":"No se elimino el producto"});
    }
  });
});

module.exports = productoRouter;
