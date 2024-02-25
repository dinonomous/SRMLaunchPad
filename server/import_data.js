const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const url = "mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'SRMLaunchpad2';
const collectionName = 'EEEdata';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const loadData = async () => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = JSON.parse(fs.readFileSync('units.json', 'utf8'));

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted.`);
  } finally {
    await client.close();
  }
};

loadData();
