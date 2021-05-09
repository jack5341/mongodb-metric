const express = require("express");
const app = express();

// You should GET with http://localhost:3000/?string=mongodb+srv://admin:admin@your-db.dbdbdb.mongodb.net/DB-NAME?retryWrites=true&w=majority&db=DB_NAME

app.get("/", (req, res) => {
  const MongoClient = require("mongodb").MongoClient;
  const queryDBString = req.query.string;
  const dbName = req.query.db;

  if (queryDBString && dbName) {
    const client = new MongoClient(queryDBString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect(async () => {
      const collection = await client.db(dbName).stats();
      res.json({
        status: "succes",
        data: collection,
      });
      client.close();
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
