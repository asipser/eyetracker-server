const MongoClient = require("mongodb").MongoClient;

const mongoURL =
  "mongodb+srv://eyetracker:mit_ucsd_cpl@cluster0-zihpa.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(mongoURL, { useNewUrlParser: true });

let _db;
module.exports = {
  init: () => {
    return client
      .connect()
      .then(() => {
        // connect to the db with this name
        _db = client.db("eyetracker");
        console.log("Connected to eyetracker mongodb!");
        return _db;
      })
      .catch(err => {
        console.log("Failed to connect to mongodb");
        console.log(err);
      });
  },

  // Return a reference to the database
  getDb: () => _db
};
