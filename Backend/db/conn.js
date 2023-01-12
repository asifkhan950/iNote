const mongoose = require("mongoose");

const db =
  "mongodb+srv://asifkhan:411825500@cluster0.x5f2mae.mongodb.net/mern?retryWrites=true&w=majority";
mongoose
  .connect(db, () => {
    UseCreateIndex: true;
    useFindAndModify: false;
    useNewUrlParser: true;
    useUnifiedTopology: true;
  })
  .then(() => console.log("connection started"))
  .catch((error) => console.log(error.message));
