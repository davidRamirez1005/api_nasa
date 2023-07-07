import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {tablaHTML} from "../utils/tabla.js"
import {fechas} from "../utils/fechas.js"
import fetch from "node-fetch";


export const asteroides = async (req, res) => {
 try {
   const { today, endDateFormatted } = fechas();

   const apiKey = "gcefKlPdz1WJAqCzKeAQnNY0u6IoD1wt0m3g8hbr";
   const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${endDateFormatted}&api_key=${apiKey}`;

   const response = await fetch(url);
   const data = await response.json();

   // Obtenemos los asteroides más cercanos a la Tierra
   const asteroids = data.near_earth_objects[today];

   // Creamos una lista con la información relevante de cada asteroide
   const asteroidList = asteroids.map(asteroid => ({
     nombre: asteroid.name,
     tamano: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
     velocidad: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
     fechaAproximacion: asteroid.close_approach_data[0].close_approach_date,
     peligro: asteroid.is_potentially_hazardous_asteroid,
     orbita: asteroid.close_approach_data[0].orbiting_body
   }));

   // Generar el contenido HTML de la tabla
   const htmlContent = tablaHTML(asteroidList);;

   // Obtener el directorio actual del módulo
   // const __filename = fileURLToPath(import.meta.url);
   // const __dirname = dirname(__filename);

    // Obtener la ruta de la carpeta "src"
    const srcDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

   // Escribir el contenido HTML en un archivo
   const html = join(srcDir, 'index.html');
   fs.writeFile(html, htmlContent, err => {
     if (err) {
       console.error(err);
       res.status(500).json({ error: 'Error al generar el archivo HTML' });
     }
     else {
       console.log('Archivo HTML');
       res.sendFile(html);
     }
   });
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Error al obtener los datos de la API' });
 }
}