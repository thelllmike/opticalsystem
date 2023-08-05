// Assuming you are using CommonJS modules
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

class Frame {
  dbName;
  client;

  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }


  

  #getCollection = async () => {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const frames = db.collection("frames");
    return frames;
  };

  getFrames = async () => {
    console.log(`Frame.js > getFrames`);

    const frames = await this.#getCollection();
    let res = await frames.find({}).toArray();

    res = res.map((frame) => {
      return {
        id: frame._id.toHexString(),
        frame: frame.frame,
        brand: frame.brand,
        model: frame.model,
        size: frame.size,
      };
    });
    console.log(res);
    return res;
  };




  addFrame = async (frame) => {
    console.log(`Frame.js > addFrame: ${frame}`);

    const frames = await this.#getCollection();
    return await frames.insertOne(frame);
  };


  updateFrame = async (id, frame) => {
    console.log(`Frame.js > updateFrame: ${frame}`);
 
    const frames = await this.#getCollection();
    return await frames.updateOne({ _id: new ObjectId(id) }, { $set: frame });
  };

  deleteFrame = async (id) => {
    console.log(`Frame.js > deleteFrame: ${id}`);

    const frames = await this.#getCollection();
    const res = await frames.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount > 0;
  };


 
}

module.exports = Frame;
