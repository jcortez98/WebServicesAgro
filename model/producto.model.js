var database = require('../config/database.config');
var producto = {};

producto.selectAll = function(callback){
  if(database) {
    var consulta = 'SELECT * FROM Producto;';
    database.query(consulta, function(error, resultado){
      if(error){
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

producto.selectProducto = function(idProducto, callback) {
  if(database) {
    var consulta = 'CALL sp_selectProducto(?);';
    database.query(consulta, idProducto, function(error, resultado){
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

producto.insert = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_insertProducto(?, ?, ?, ?, ?);';
    database.query(consulta,
      [data.idCategoriaProducto, data.nombre, data.descripcion, data.precio, data.idUsuario],
      function(error, resultado){
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

producto.update = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_updateProducto(?, ?, ?, ?, ?, ?);';
    database.query(consulta,
      [data.idProducto, data.idCategoriaProducto, data.nombre,
        data.descripcion, data.precio, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

producto.delete = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_deleteProducto(?, ?);';
    database.query(consulta, [data.idProducto, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"mensaje":"Eliminado"});
      }
    });
  }
}

module.exports = producto;
