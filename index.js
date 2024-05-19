const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const connect = require("./config/db");
const cors = require("cors");
const hodRoutes = require("./routes/hod");
const wardenRoutes = require("./routes/warden");
const studentRoutes = require("./routes/student");
const OutpassRoutes = require("./routes/outpass");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/hod", hodRoutes);
app.use("/warden", wardenRoutes);
app.use("/student", studentRoutes);
app.use("/outpass", OutpassRoutes);

const prepareAndStartServer = () => {
  app.listen(PORT, async () => {
    console.log(`Server Started on Port : ${PORT}`);
    await connect();
  });
};

prepareAndStartServer();
