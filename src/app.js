const express = require("express");
const path = require("path");
const morgan = require("morgan");
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");

const app = express();

//conexion BBDD


/*
const uri = "mongodb+srv://cvasquem:21octubre@cluster0.egsok.mongodb.net/walmart?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("walmart").collection("products");
  // perform actions on the collection object
  console.log('esta es la base:')
  console.log(collection.find());
  client.close();
});
*/


try{
  mongoose.connect(
      "mongodb+srv://cvasquem:21octubre@cluster0.egsok.mongodb.net/walmart?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then((db) => console.log("db connected "))
    .catch((err) => console.log(err));
}
catch(e){
  console.error(e);
}



// importando rutas
const indexRoutes = require("./routes/index");

// configuraciones
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//rutas
app.use("/", indexRoutes);

//starting server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
