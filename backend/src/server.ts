import express from "express";

const app = express();

app.get('/', (request, response) => {
  return response.json({message: "Let's catch!"})
})

app.listen(3003, () => console.log('Runing!'))