const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", async (req, res) => {
  res.render("index")
})

app.post("/", (req,res) => {
  const MongoClient = require("mongodb").MongoClient;
  const queryDBString = req.body.db_string;
  const dbName = req.body.db_name;
  
  if (queryDBString && dbName) {
    const client = new MongoClient(
      queryDBString,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    client.connect(async () => {
      const collection = await client.db(dbName).stats();
      res.json({
        status: "succes",
        data: collection,
      });
      client.close();
    });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
