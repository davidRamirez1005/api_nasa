import express from "express";
import app from "../router/api.js";

const appExpress = express();


// appExpress.use(express.json());

appExpress.use('/nasa', app);


