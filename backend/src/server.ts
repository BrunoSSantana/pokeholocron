import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: "Let's catch!" }));

// eslint-disable-next-line no-console
app.listen(3003, () => console.log('Runing!'));
