/**
 * Archivo de configuración del servidor Express
 * 
 * Este archivo configura una aplicación Express con middleware y rutas necesarias
 * para el funcionamiento de la API RESTful.
 */

// Importación de dependencias
import routes from "@routes/routes";      // Importa las rutas definidas para la API
import express, { Application } from "express"; // Framework web para Node.js
import morgan from "morgan";           // Middleware de logging HTTP

/**
 * Instancia principal de la aplicación Express
 * Tipo Application asegura tipado correcto según TypeScript
 */
const app: Application = express();

// Configuración de middleware
app.use(express.json())  // Middleware para parsear JSON en el cuerpo de las peticiones
app.use(morgan("dev")); // Middleware de logging en modo desarrollo para depuración

/**
 * Configuración de rutas
 * Todas las rutas de la API estarán bajo el prefijo /api/v1
 * Esto permite versionado de la API y facilita futuras actualizaciones
 */
app.use("/api/v1", routes())

/**
 * Exportación de la aplicación configurada
 * Esta instancia será importada en app.ts para iniciar el servidor
 */
export default app;