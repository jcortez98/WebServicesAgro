var database = require('../config/database.config');
var historial = {};

historial.selectAll = function(callback){
  if(database){
    var consulta = 'SELECT * FROM Historial';
    database.query(consulta, function(error, resultado){
      if(error){
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

module.exports = historial;
