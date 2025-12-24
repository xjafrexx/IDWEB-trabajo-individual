CREATE DATABASE IF NOT EXISTS valorant_db;

-- 2. Entrar a la caja
USE valorant_db;

-- 3. Crear la hoja para guardar mensajes (Tabla)
CREATE TABLE IF NOT EXISTS mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único (1, 2, 3...)
    nombre VARCHAR(100) NOT NULL,      -- Texto corto para nombre
    email VARCHAR(100) NOT NULL,       -- Texto corto para email
    mensaje TEXT NOT NULL,             -- Texto largo para el mensaje
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha automática
);

-- 4. Meter un dato de prueba para ver si funciona
INSERT INTO mensajes (nombre, email, mensaje) VALUES 
('Jett', 'jett@valorant.com', '¡Hola! Probando si esto funciona.');