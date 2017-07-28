var express = require('express');
var categoriaProducto = require('../../model/categoriaProducto.model');
var services = require('../../services');
var categoriaProductoRouter = express.Router();

categoriaProductoRouter.get('/categoriaProducto', services.verificar, function(req, res){
  categoriaProducto.selectAll(function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje": "No hay categorias de producto"});
    }
  });
});

categoriaProductoRouter.get('/categoriaProducto/:idCategoriaProducto', services.verificar,
 function(req, res){
  var idCategoriaProducto = req.params.idCategoriaProducto;
  categoriaProducto.selectCategoriaProducto(idCategoriaProducto, function(resultado){
    if(typeof resultado !== undefined){
      res.json(resultado);
    } else {
      res.json({"mensaje":"No existe la categoria de producto"});
    }
  });
})

categoriaProductoRouter.post('/categoriaProducto', services.verificar, function(req, res){
  var data = {
    nombre: req.body.nombre,
    idUsuario: req.body.idUsuario
  }
  categoriaProducto.insert(data, function(resultado) {
    if(typeof resultado !== undefined && resultado.affectedRows > 0) {
      resultado.status = true;
      resultado.mensaje = "Se registro la categoria correctamente";
      res.json(resultado);
    } else {
      resultado.status = false;
      resultado.mensaje = "No se registro la categoria";
      res.json(resultado);
    }
  });
});

categoriaProductoRouter.put('/categoriaProducto/:idCategoriaProducto', services.verificar,
function(req, res){
  var idCategoriaProducto = req.params.idCategoriaProducto;
  var data = {
    idCategoriaProducto: req.body.idCategoriaProducto,
    nombre: req.body.nombre,
    idUsuario: req.body.idUsuario
  }
  console.log(data);
  if(idCategoriaProducto == data.idCategoriaProducto) {
    categoriaProducto.update(data, function(resultado){
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

categoriaProductoRouter.delete('/categoriaProducto/:idCategoriaProducto', services.verificar,
 function(req, res){
  var idCategoria = req.params.idCategoriaProducto;
  var data = {
    idCategoriaProducto: idCategoria,
    idUsuario: req.body.idUsuario
  }
  categoriaProducto.delete(data, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado"){
      res.json({"mensaje":"Se eliminó la categoría correctamente"});
    } else {
      res.json({"mensaje":"Se eliminó el categoría"});
    }
  });
});

module.exports = categoriaProductoRouter;
