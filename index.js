// this is needed for importing expressjs into our application
const express = require("express");
const appConfig = require("./config/appConfig");
const fs = require("fs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//declaring an instance or creating an application instance
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Bootstrap models
let modelsPath = "./models";
fs.readdirSync(modelsPath).forEach(function(file) {
  if (~file.indexOf(".js")) {
    console.log(file);
    require(modelsPath + "/" + file);
  }
});
// end Bootstrap models

// Bootstrap route
let routesPath = "./routes";
fs.readdirSync(routesPath).forEach(function(file) {
  if (~file.indexOf(".js")) {
    console.log("including the following file");
    console.log(routesPath + "/" + file);
    let route = require(routesPath + "/" + file);
    route.setRouter(app);
  }
});
// end bootstrap route

//listening the server - creating a local server
app.listen(appConfig.port, () => {
  console.log("CRUD API listening on port 3000!");
  //creating the mongo db connection here
  let db = mongoose.connect(
    appConfig.db.uri,
    { useNewUrlParser: true }
  );
});

// handling mongoose connection error
mongoose.connection.on("error", function(err) {
  console.log("database connection error");
  console.log(err);
}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on("open", function(err) {
  if (err) {
    console.log("database error");
    console.log(err);
  } else {
    console.log("database connection open success");
  }
}); // end mongoose connection open handler
