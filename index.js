const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", async (req, res) => {
  const queryDBString = req.query.string;
  const MongoClient = require("mongodb").MongoClient;
  const client = new MongoClient(queryDBString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect(async () => {
    const collection = await client.db("sample_airbnb").stats();
    client.close();
  });
  res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);