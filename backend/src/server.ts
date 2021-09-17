/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import './database/connections';

const app = express();
app.use(cors());

app.use(express.json());

app.use(routes);

// eslint-disable-next-line no-console
app.listen(3003, () => console.log('Runing!'));
