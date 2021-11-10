const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const httpStatus = require("http-status");
const config = require("./config/config");
const router = require("./routes");

var app = express();
const AccountModel = require("./models/user");
const { func } = require("joi");

// https://git.heroku.com/gearzone.git

app.listen(config.port, function () {
  console.log("Server is listening on port " + config.port);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//     next(new Exception(httpStatus.NOT_FOUND, 'API Not Found'));
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));

// enable cors
app.use(cors());
app.options("*", cors());

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.log("Connection failed with err" + err);
  });
app.use("/", router);
// Close server and log
// const exitHandler = () => {
//     if (server) {
//       server.close(() => {
//         logger.info('Server is closed');
//         process.exit(1);
//       });
//     } else {
//       process.exit(1);
//     }
// }

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "GearZone Library API",
    },
    servers: [
      {
        url: "https://gearzone.herokuapp.com/",
      },
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["src/docs/swagger.docs.yml"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/", function (res, res) {
  res.json("Home");
});
