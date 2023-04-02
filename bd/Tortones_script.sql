-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tortones` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `tortones` ;

-- -----------------------------------------------------
-- Table `tortones`.`ingredientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tortones`.`ingredientes` (
  `id_ingrediente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `categoria` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `color` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_ingrediente`))


-- -----------------------------------------------------
-- Table `tortones`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tortones`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(100) NULL DEFAULT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `clave` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`))


-- -----------------------------------------------------
-- Table `tortones`.`orden_compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tortones`.`orden_compra` (
  `id_orden` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`id_orden`),
  INDEX `id_usuarios_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `tortones`.`usuarios` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)


-- -----------------------------------------------------
-- Table `tortones`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tortones`.`productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `url_img` VARCHAR(150) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `precio_lb` FLOAT NOT NULL,
  PRIMARY KEY (`id_producto`))


-- -----------------------------------------------------
-- Table `tortones`.`producto_compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tortones`.`producto_compra` (
  `id_pdcto_compra` INT NOT NULL AUTO_INCREMENT,
  `id_orden` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`id_pdcto_compra`),
  INDEX `id_orden_idx` (`id_orden` ASC) VISIBLE,
  INDEX `id_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `id_orden`
    FOREIGN KEY (`id_orden`)
    REFERENCES `tortones`.`orden_compra` (`id_orden`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `tortones`.`productos` (`id_producto`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)

