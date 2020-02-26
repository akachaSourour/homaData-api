const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const houseController = require('./controllers/houseController');

/* ===========middlewares =====================*/
app.use(bodyParser.json());
app.use(cors());

// se connecter à la base de données à travers mongoose

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// les routes crées pour gérer les maisons et leurs prix
app.post('/api/house/estimate', houseController.estimate);


app.listen(3000, function () {
  console.log('l\'api de l\'estimateur immobilier est en ecoute sur le port 3000!')
})