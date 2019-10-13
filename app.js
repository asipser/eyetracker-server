const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongo = require("./db");
var cors = require("cors");
app.use(cors());

mongo.init();

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/data", async (req, res) => {
  const data = mongo
    .getDb()
    .collection(`experiment-${req.query.experiment_name}`);
  res.send(await data.find({}).toArray());
});

app.post("/", async (req, res) => {
  const data = mongo
    .getDb()
    .collection(`experiment-${req.body.experiment_name}`);
  data.insertOne(req.body.data);
  res.send(204);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
