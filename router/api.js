import startServer from "../server/serverconfig.js";
import {asteroides} from "../controllers/asteroide.js"

const app = startServer();

app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next()
 });
 
app.get('/', (req, res) => {
  res.send('Hola, bienvenido al consumo de la API de la NASA :)');
});

app.get('/nasa', asteroides);

export default app;
