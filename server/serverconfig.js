import express from "express";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

const addresses = Object.values(os.networkInterfaces())
  .flatMap(interfaceInfo =>
    interfaceInfo.filter(info => info.family === 'IPv4' && !info.internal)
  )
  .map(info => info.address);

const startServer = () => {
  const app = express();
  const port = process.env.PORT

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://${addresses}:${port}/`);
  });

  return app; 
};

export default startServer;
