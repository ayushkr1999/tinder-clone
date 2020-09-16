const express = require('express');
const mongoose = require('mongoose');
const Cards = require('./dbCards.js');
const cors = require('cors');
// App config
const app = express();
const PORT = process.env.PORT || 8001;
const conn_url =
  'mongodb+srv://ayush:ayush@123@cluster0.8qvqi.mongodb.net/tinderdb?retryWrites=true&w=majority';

//middlewares
app.use(express.json());
app.use(cors());
//Db cofig
mongoose.connect(conn_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Api Endpoints
app.get('/', (req, res) => {
  res.status(200).send('hello');
});

app.post('/tinder/cards', async (req, res) => {
  const dbCard = req.body;
  try {
    await Cards.create(dbCard);
    res.status(200).send(dbCard);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/tinder/cards', async (req, res) => {
  try {
    const result = await Cards.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Listener

app.listen(PORT, () => console.log(`listtini on post ${PORT}`));
