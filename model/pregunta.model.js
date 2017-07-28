var database = require('../config/database.config');
var pregunta = {};

pregunta.selectAll = function(callback){
  if(database) {
    var consulta = 'SELECT * FROM Pregunta;';
    database.query(consulta, function(error, resultado){
      if(error){
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

pregunta.selectPregunta = function(idPregunta, callback) {
  if(database) {
    var consulta = 'CALL sp_selectPregunta(?);';
    database.query(consulta, idPregunta, function(error, resultado){
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

pregunta.insert = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_insertPregunta(?, ?, ?, ?, ?);';
    database.query(consulta,
      [data.nombre, data.telefono, data.correo, data.descripcion, data.idUsuario],
      function(error, resultado){
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

pregunta.delete = function(data, callback) {
  if(database) {
    var consulta = 'CALL sp_deletePregunta(?, ?);';
    database.query(consulta, [data.idPregunta, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"mensaje":"Eliminado"});
      }
    });
  }
}

module.exports = pregunta;
