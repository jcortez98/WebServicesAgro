var database = require('../config/database.config');
var usuario = {};

usuario.login = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_autenticarUsuario(?, ?);';
    database.query(consulta, [data.nick, data.contrasena],
      function(error, resultado){
        if(error){
          throw error;
        } else {
          callback(resultado[0]);
        }
    });
  }
}

usuario.selectAll = function(callback) {
  if(database) {
    var consulta = 'SELECT * FROM Usuario';
    database.query(consulta, function(error, resultado){
      if(error){
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

usuario.selectUsuario = function(idUsuario, callback) {
  if(database) {
    var consulta = 'CALL sp_selectUsuario(?);';
    database.query(consulta, idUsuario, function(error, resultado){
      if(error){
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

usuario.insert = function(data, callback){
  if(database){
    var consulta = 'CALL sp_insertUsuario(?, ?, ?, ?, ?);';
    database.query(consulta, [data.idRol, data.nombre, data.apellido,
      data.nick, data.contrasena], function(error, resultado){
        if(error) {
          throw error;
        } else {
          callback({"affectedRows": resultado.affectedRows});
        }
    });
  }
}

usuario.update = function(data, callback) {
  console.log(data);
  if(database) {
    var consulta = 'CALL sp_updateUsuario(?, ?, ?, ?, ?);';
    database.query(consulta, [data.idUsuario, data.nombre, data.apellido,
      data.nick, data.contrasena], function(error, resultado){
        if(error){
          throw error;
        } else {
          callback(resultado);
        }
    });
  }
}

usuario.delete = function(idUsuario, callback){
  if(database){
    var consulta = 'CALL sp_deleteUsuario(?);';
    database.query(consulta, idUsuario, function(error, resultado){
      if(error){
        throw error;
      } else {
        callback({"mensaje":"Eliminado"});
      }
    });
  }
}

module.exports = usuario;
