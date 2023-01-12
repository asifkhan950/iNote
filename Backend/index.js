const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors')
require('./db/conn')
const app = express();
const port = 5000;


app.use(cors())

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes', require ('./routes/notes'))

app.listen(port, () => {
  console.log(`My Port of Index MONGO ${port}`);
});
