var database = require('../config/database.config');
var categoriaProducto = {};

categoriaProducto.selectAll = function(callback){
  if(database) {
    var consulta = 'SELECT * FROM CategoriaProducto;';
    database.query(consulta, function(error, resultado){
      if(error){
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

categoriaProducto.selectCategoriaProducto = function(idCategoria, callback) {
  if(database) {
    var consulta = 'CALL sp_selectCategoriaProducto(?);';
    database.query(consulta, idCategoria, function(error, resultado){
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

categoriaProducto.insert = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_insertCategoriaProducto(?, ?);';
    database.query(consulta, [data.nombre, data.idUsuario], function(error, resultado){
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

categoriaProducto.update = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_updateCategoriaProducto(?, ?, ?);';
    database.query(consulta, [data.idCategoriaProducto, data.nombre, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

categoriaProducto.delete = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_deleteCategoriaProducto(?, ?);';
    database.query(consulta, [data.idCategoriaProducto, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"mensaje":"Eliminado"});
      }
    });
  }
}

module.exports = categoriaProducto;
