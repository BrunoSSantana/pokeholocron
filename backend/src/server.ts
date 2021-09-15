/* eslint-disable no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import './database/connections';

const app = express();

<<<<<<< HEAD
app.use(express.json())
=======
app.use(express.json());

>>>>>>> cbd9c59d3dfc4dca88d799612fca5c1c29814487
app.use(routes);


// eslint-disable-next-line no-console
app.listen(3003, () => console.log('Runing!'));
