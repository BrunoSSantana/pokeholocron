import express from 'express';
import { routes } from './routes';

const app = express();

app.use(routes);

// eslint-disable-next-line no-console
app.listen(3003, () => console.log('Runing!'));
