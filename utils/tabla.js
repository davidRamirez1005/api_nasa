export const tablaHTML = (asteroidList) => {
 return `
   <html>
     <head>
       <style>
         table {
           border-collapse: collapse;
           width: 100%;
         }
         th, td {
           border: 1px solid black;
           padding: 8px;
           text-align: left;
         }
       </style>
     </head>
     <body>
       <h1>Asteroides cercanos a la Tierra</h1>
       <table>
         <thead>
           <tr>
             <th>Nombre</th>
             <th>Tamaño (km)</th>
             <th>Velocidad (km/h)</th>
             <th>Fecha de Aproximación</th>
             <th>Órbita</th>
           </tr>
         </thead>
         <tbody>
           ${asteroidList.map(asteroid => `
             <tr>
               <td>${asteroid.nombre}</td>
               <td>${asteroid.tamano}</td>
               <td>${asteroid.velocidad}</td>
               <td>${asteroid.fechaAproximacion}</td>
               <td>${asteroid.orbita}</td>
             </tr>
           `).join('')}
         </tbody>
       </table>
     </body>
   </html>
 `;
};
