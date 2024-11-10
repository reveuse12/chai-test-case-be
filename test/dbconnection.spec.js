import { MongoClient } from "mongodb";
import { expect } from "chai";
import { closeConnection, connectToDb } from "../src/dbconnection.js";

describe("MongoDB Connection Tests", function () {
  let db;

  // Increase timeout for database operations
  this.timeout(10000);

  // Helper function to insert documents
  async function insertDocument(collectionName, document) {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    return { insertedCount: result.acknowledged ? 1 : 0 };
  }

  // Before all tests, ensure the database is connected
  before(async function () {
    try {
      db = await connectToDb();
      // Clear the test collection before running tests
      await db.collection("users").deleteMany({});
    } catch (error) {
      console.error("Failed to connect to database:", error);
      throw error;
    }
  });

  // Test for inserting a document into the collection
  it("should insert a document into the collection", async function () {
    try {
      const result = await insertDocument("users", {
        name: "John Doe",
        age: 30,
      });
      expect(result.insertedCount).to.equal(1);
    } catch (error) {
      throw new Error(`Failed to insert document: ${error.message}`);
    }
  });

  // Test to ensure that the document was inserted correctly
  it("should retrieve the inserted document", async function () {
    try {
      const collection = db.collection("users");
      const user = await collection.findOne({ name: "John Doe" });
      expect(user).to.not.be.null;
      expect(user.name).to.equal("John Doe");
      expect(user.age).to.equal(30);
    } catch (error) {
      throw new Error(`Failed to retrieve document: ${error.message}`);
    }
  });

  // Test for closing the connection
  it("should close the connection to the database", async function () {
    await closeConnection();
    let error;
    try {
      // Try to perform a simple query after closing the connection
      await db.collection("users").findOne({});
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
  });

  // After all tests, ensure the connection is closed
  after(async function () {
    try {
      await closeConnection();
    } catch (error) {
      console.error("Failed to close database connection:", error);
      throw error;
    }
  });
});
