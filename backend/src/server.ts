import express from 'express';
import { routes } from './routes';
import './database/connections'
const app = express();

app.use(express.json())
app.use(routes);


// eslint-disable-next-line no-console
app.listen(3003, () => console.log('Runing!'));
