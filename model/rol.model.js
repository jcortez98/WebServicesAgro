var database = require('../config/database.config');
var rol = {};

rol.selectAll = function(callback){
  if(database){
    var consulta = 'SELECT * FROM Rol';
    database.query(consulta, function(error, resultado){
      if(error){
        throw error;
      } else {
        callback(resultado);
      }
    })
  }
}

module.exports = rol;
