const express = require('express');
const app = express();
const port = 4000;
const cardRoute = require('./router/cardRoute')
const learningRoute = require('./router/learningRoute')
app.use(express.json());


app.use('/', cardRoute);
app.use('/', learningRoute);


app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
