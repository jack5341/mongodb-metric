import { MongoClient } from "mongodb";

export default (req, res) => {
  if (req.method === "POST") {
    const client = new MongoClient(req.body.c_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect(async () => {
      res.send(await client.db(req.body.db_name).stats());
    });
  }
};
