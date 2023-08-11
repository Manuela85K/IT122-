import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import Item from "./model/data.js";

const app = express();
const PORT = 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Set up middlewares
app.use(express.json());
app.use("/api", cors());
app.use(express.static(path.join(__dirname, "public")));

// Route to render home page
app.get("/", (req, res) => {
    Item.find().lean()
    .then(() => {
        res.sendFile("index");
    })
    .catch(error => {
        res.status(500).json({ error: "An error occurred while fetching items" });
    });
});

// API to get all items as JSON data
app.get("/api/items", (req, res) => {
    Item.find().lean()
    .then(items => {
        res.json(items);
    })
    .catch(error => {
        res.status(500).json({ error: "An error occurred while fetching items" });
    });
});

// API to get a single item as JSON data
app.get("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    Item.findById(itemId)
    .then(item => {
        if(!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    })
    .catch(error => {
        res.status(500).json({ error: "An error occurred while fetching the item" });
    });
});

// API to add an item
app.post("/api/items", (req, res) => {
    const item = req.body;
    if(!item) return res.status(422).json({ error: "You need to provide items to add" });
    const newItem = new Item(item);
    newItem.save()
    .then((savedItem) => {
        res.json(savedItem);
    })
    .catch(error => {
        res.status(500).json({ error: "An error occurred while adding the item" });
    });
});

// API to update an item
app.put("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
    if(!item || !itemId) return res.status(422).json({ error: "You need to provide item details to update" });
    Item.findByIdAndUpdate(itemId, item)
    .then(() => {
        res.json({ success: true, message: "Your item has been updated" });
    })
    .catch(error => {
        res.status(500).json({ error: "An error occurred while updating the item" });
    });
});

// API to delete an item
app.delete("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    Item.findByIdAndRemove(itemId)
    .then(() => {
        res.json({ success: true, message: "Your item has been deleted" });
    })
    .catch(error => {
        res.status(500).json({ error: 'An error occurred while deleting the item' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});