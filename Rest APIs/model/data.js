import mongoose from "mongoose";
import { dbConnectionURL } from "./dbConnectionURL.js";

// Connect to MongoDB using the connection URL
mongoose.connect(dbConnectionURL).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.log("Error connecting with MongoDB:", error);
});

// Define the item schema
const itemSchema = new mongoose.Schema({
    name: String,
    make: String,
    model: String,
    year: Number,
});

// Create the Item model using the item schema
const Item = mongoose.model("Item", itemSchema);

export default Item;