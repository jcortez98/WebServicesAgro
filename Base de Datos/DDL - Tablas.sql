CREATE DATABASE AgroNet;

USE AgroNet;

/*-----------------------------------------------------------------------------------*/
									/*Tablas*/
                                    
CREATE TABLE Rol(
	idRol INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY(idRol)
);

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
    idRol INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nick VARCHAR(50) NOT NULL,
    contrasena VARCHAR(25) NOT NULL,
    fechaRegistro DATETIME NOT NULL,
    foto TEXT NULL,
    PRIMARY KEY(idUsuario),
    FOREIGN KEY(idRol) REFERENCES Rol(idRol)
);

CREATE TABLE Pregunta(
	idPregunta INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(12) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY(idPregunta)
);

CREATE TABLE CategoriaProducto(
	idCategoriaProducto INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    PRIMARY KEY(idCategoriaProducto)
);

CREATE TABLE Producto(
	idProducto INT NOT NULL AUTO_INCREMENT,
    idCategoriaProducto INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio INT NOT NULL,
    imagen TEXT NULL,
    PRIMARY KEY(idProducto),
    FOREIGN KEY(idCategoriaProducto) REFERENCES CategoriaProducto(idCategoriaProducto)
);

CREATE TABLE Historial(
	idHistorial INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    PRIMARY KEY(idHistorial),
    FOREIGN KEY(idUsuario) REFERENCES Usuario(idUsuario)
);

