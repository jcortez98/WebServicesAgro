USE AgroNet;

/*-----------------------------------------------------------------------------------*/
						/*Procedimientos almacenados*/

DELIMITER $$
CREATE PROCEDURE sp_insertHistorial(
IN _idUsuario INT,
IN _titulo VARCHAR(150),
IN _descripcion TEXT)
BEGIN
	INSERT INTO Historial(idUsuario, titulo, descripcion, fecha)
    VALUES (_idUsuario, _titulo, _descripcion, NOW());
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_selectHistorial(
IN _idUsuario INT)
BEGIN
	SELECT idHistorial, idUsuario, titulo, descripcion,
		DATE_FORMAT(fecha, '%d-%c-%Y') AS 'Fecha'
		FROM Historial WHERE idUsuario = _idUsuario
        ORDER BY Fecha ASC;
END $$
DELIMITER ;             
				
DELIMITER $$
CREATE PROCEDURE sp_deleteHistorial(
IN _idUsuario INT)
BEGIN
	DELETE FROM Historial WHERE idUsuario = _idUsuario;
END $$
DELIMITER ;

/*-----------------------------------------------------------------------------------*/
DELIMITER $$
CREATE PROCEDURE sp_insertRol(
IN _nombre VARCHAR(50))
BEGIN
	INSERT INTO Rol(nombre)
    VALUES (_nombre);
END $$
DELIMITER ;

/*-----------------------------------------------------------------------------------*/
DELIMITER $$
CREATE PROCEDURE sp_insertUsuario(
IN _idRol INT,
IN _nombre VARCHAR(100),
IN _apellido VARCHAR(100),
IN _nick VARCHAR(50),
IN _contrasena VARCHAR(25))
BEGIN
	INSERT INTO Usuario(idRol, nombre, apellido, nick, contrasena, fechaRegistro, foto)
    VALUES (_idRol, _nombre, _apellido, _nick, _contrasena, NOW(), NULL);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_updateUsuario(
IN _idUsuario INT,
IN _nombre VARCHAR(100),
IN _apellido VARCHAR(100),
IN _nick VARCHAR(50),
IN _contrasena VARCHAR(25))
BEGIN
	UPDATE Usuario SET nombre = _nombre, apellido = _apellido, nick = _nick, contrasena = _contrasena
    WHERE idUsuario = _idUsuario;
    
    CALL sp_insertHistorial(_idUsuario, 'Modificacion de cuenta', 'Se realizaron modificaciones en la cuenta');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_uploadFoto(
IN _idUsuario INT,
IN _foto TEXT)
BEGIN
	UPDATE Usuario SET foto = _foto
    WHERE idUsuario = idUsuario;
    
    CALL sp_insertHistorial(_idUsuario, 'Modificacion de foto', 'Se modificó foto de usuario');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_deleteUsuario(
IN _idUsuario INT)
BEGIN
	CALL sp_deleteHistorial(_idUsuario);
    
	DELETE FROM Usuario WHERE idUsuario = _idUsuario;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_selectUsuario(
IN _idUsuario INT)
BEGIN
	SELECT idRol, nombre, apellido, nick, contrasena,
    DATE_FORMAT(fechaRegistro, '%d-%c-%Y') AS 'FechaRegistro',
    foto
    FROM Usuario WHERE idUsuario = _idUsuario;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_autenticarUsuario(
IN _nick VARCHAR(50),
IN _contrasena VARCHAR(25))
BEGIN
	SELECT * FROM Usuario
    WHERE nick = _nick AND contrasena = _contrasena
    LIMIT 1;
END $$
DELIMITER ;

/*-----------------------------------------------------------------------------------*/
DELIMITER $$
CREATE PROCEDURE sp_insertCategoriaProducto(
IN _nombre VARCHAR(150),
IN _idUsuario INT)
BEGIN
	INSERT INTO CategoriaProducto(nombre) VALUES(_nombre);
    
    CALL sp_insertHistorial(_idUsuario, 'Creacion de categoría', 'Se creó una nueva cateogoría de producto');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_updateCategoriaProducto(
IN _idCategoriaProducto INT,
IN _nombre VARCHAR(150),
IN _idUsuario INT)
BEGIN
	UPDATE CategoriaProducto SET nombre = _nombre
    WHERE idCategoriaProducto = _idCategoriaProducto;
    
    CALL sp_insertHistorial(_idUsuario, 'Modificacion de categoría', 'Se modificó una categoria de producto');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_deleteCategoriaProducto(
IN _idCategoriaProducto INT,
IN _idUsuario INT)
BEGIN
	DELETE FROM CategoriaProducto WHERE idCategoriaProducto = _idCategoriaProducto;
    
    CALL sp_insertHistorial(_idUsuario, 'Eliminación de categoría', 'Se eliminó una categoría de producto');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_selectCategoriaProducto(
IN _idCategoriaProducto INT)
BEGIN
	SELECT nombre FROM CategoriaProducto WHERE idCategoriaProducto = _idCategoriaProducto;
END $$
DELIMITER ;

/*-----------------------------------------------------------------------------------*/
DELIMITER $$
CREATE PROCEDURE sp_insertProducto(
IN _idCategoriaProducto INT,
IN _nombre VARCHAR(100),
IN _descripcion TEXT,
IN _precio INT,
IN _idUsuario INT)
BEGIN
	INSERT INTO Producto(idCategoriaProducto, nombre, descripcion, precio)
    VALUES(_idCategoriaProducto, _nombre, _descripcion, _precio);
    
    CALL sp_insertHistorial(_idUsuario, 'Creacion de producto', 'Se creó un nuevo producto');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_insertImagen(
IN _idProducto INT,
IN _imagen TEXT,
IN _idUsuario INT)
BEGIN
	UPDATE Producto SET imagen = _imagen
    WHERE idProducto = idProducto;
    
    CALL sp_insertHistorial(_idUsuario, 'Modificación de imagen', 'Se modificó la imagen de un producto');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_updateProducto(
IN _idProducto INT,
IN _idCategoriaProducto INT,
IN _nombre VARCHAR(100),
IN _descripcion TEXT,
IN _precio INT,
IN _idUsuario INT)
BEGIN
	UPDATE Producto SET idCategoriaProducto = _idCategoriaProducto, nombre = _nombre, descripcion = _descripcion,
    precio = _precio
    WHERE idProducto = _idProducto;
    
    CALL sp_insertHistorial(_idUsuario, 'Modificación de producto', 'Se modificó un producto');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_deleteProducto(
IN _idProducto INT,
IN _idUsuario INT)
BEGIN
	DELETE FROM Producto WHERE idProducto = _idProducto;
    
    CALL sp_insertHistorial(_idUsuario, 'Eliminación de producto', 'Se eliminó un producto');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_selectProducto(
IN _idProducto INT)
BEGIN
	SELECT idCategoriaProducto, nombre, descripcion, precio, imagen
    FROM Producto WHERE idProducto = _idProducto;
END $$
DELIMITER ;

/*-----------------------------------------------------------------------------------*/
DELIMITER $$
CREATE PROCEDURE sp_insertPregunta(
IN _nombre VARCHAR(150),
IN _telefono VARCHAR(12),
IN _correo VARCHAR(50),
IN _descripcion TEXT,
IN _idUsuario INT)
BEGIN
	INSERT INTO Pregunta(nombre, telefono, correo, descripcion)
    VALUES(_nombre, _telefono, _correo, _descripcion);
    
    CALL sp_insertHistorial(_idUsuario, 'Nueva pregunta', 'Se envió una nueva pregunta');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_deletePregunta(
IN _idPregunta INT,
IN _idUsuario INT)
BEGIN
	DELETE FROM Pregunta WHERE idPregunta = _idPregunta;
    
    CALL sp_insertHistorial(_idUsuario, 'Eliminación de pregunta', 'Se eliminó una pregunta');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_selectPregunta(
IN _idPregunta INT)
BEGIN
	SELECT nombre, telefono, correo, descripcion FROM Pregunta
    WHERE idPregunta = _idPregunta;
END $$
DELIMITER ;