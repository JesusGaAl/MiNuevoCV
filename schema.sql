-- Esquema de la base de datos D1 para el formulario de contacto del CV.
-- Ejecuta este SQL una vez en la consola de D1 (dashboard de Cloudflare).

CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Para leer los mensajes recibidos (ejecútalo cuando quieras revisarlos):
-- SELECT * FROM messages ORDER BY created_at DESC;
