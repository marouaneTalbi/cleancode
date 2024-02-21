const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const cardRoute = require('./src/interfaces/routes/cardRoute');
// const learningRoute = require('./router/learningRoute')
app.use(cors({ 
  origin: '*',
  methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

app.use(express.json());

//app.use(bodyParser.json());

app.use('/', cardRoute);
// app.use('/', learningRoute);


app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
