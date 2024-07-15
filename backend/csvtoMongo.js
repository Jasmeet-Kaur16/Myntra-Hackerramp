const fs = require("fs");
const csv = require("csvtojson");
const { MongoClient } = require("mongodb");

// Define the path to your CSV file
const csvFile = "./Fashion Dataset.csv";

// Define your MongoDB URL and the collection name
const dbURL = "mongodb://127.0.0.1:27017";
const dbName = "Myntra";
const collectionName = "products";

// Function to insert data into MongoDB
const insertDataToMongoDB = async (data) => {
  const client = new MongoClient(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    console.error(
      "An error occurred while inserting data into MongoDB:",
      error.message
    );
  } finally {
    await client.close();
  }
};

// Read the CSV file and convert to JSON
const processCSVFile = async () => {
  try {
    const jsonArray = await csv().fromFile(csvFile);
    console.log(`Read ${jsonArray.length} records from the CSV file`);

    // Insert the JSON data into MongoDB
    await insertDataToMongoDB(jsonArray);
  } catch (error) {
    console.error(
      "An error occurred while processing the CSV file:",
      error.message
    );
  }
};

processCSVFile();
