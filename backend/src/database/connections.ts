import { createConnection } from 'typeorm';

createConnection().then(() => console.log('conectado ao banco de dados'));