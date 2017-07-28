USE AgroNet;

/*-----------------------------------------------------------------------------------*/
									/*Inserts*/
                                    
CALL sp_insertRol('Administrador');
CALL sp_insertRol('Cliente');

SELECT * FROM Rol;
SELECT * FROM Usuario;
SELECT * FROM Historial;
SELECT * FROM CategoriaProducto;
SELECT * FROM Producto;
SELECT * FROM Pregunta;