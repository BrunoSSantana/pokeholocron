/* eslint-disable no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import './database/connections';
var cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

app.use(routes);


// eslint-disable-next-line no-console
app.listen(3003, () => console.log('Runing!'));
