import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

beforeEach(async (done) => {
  const server = new MongoMemoryServer();
  /*
    Define clearDB function that will loop through all 
    the collections in our mongoose connection and drop them.
  */
  const clearDB = () => {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].drop();
    }
    return done();
  }

  /*
    If the mongoose connection is closed, 
    start it up using the test url and database name
    provided by the node runtime ENV
  */
if (mongoose.connection.readyState === 0) {    
    const url = await server.getConnectionString();
    mongoose.connect(
      url,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          throw err;
        }
        return clearDB();
      }
    );
  } else {
    return clearDB();
  }
});

afterEach((done) => {
  mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});