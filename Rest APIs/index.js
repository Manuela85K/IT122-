import express from "express";
import cors from "cors";
import Item from "./model/data.js";

const app = express();
const PORT = 8080;

// Set up middlewares
app.use(express.json());
app.use("/api", cors());

// Set up the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Route to render home page
app.get("/", (req, res) => {
  Item.find().lean()
    .then(items => {
      res.render("home", { items });
    })
    .catch(error => {
      res.status(500).json({ error: "An error occurred while fetching items" });
    });
});

// Route to render detail page
app.get("/detail", (req, res) => {
  const itemId = req.query.id;
  Item.findById(itemId)
    .then(item => {
      res.render("detail", { item });
    })
    .catch(error => {
      res.status(500).json({ error: "An error occurred while fetching the item" });
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
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.json(item);
    })
    .catch(error => {
      res.status(500).json({ error: "An error occurred while fetching the item" });
    });
});

// API to add an item
app.post("/api/items", (req, res) => {
  const item = req.body;
  if (!item) return res.status(422).json({ error: "You need to provide items to add" });
  const newItem = new Item(item);
  newItem.save()
    .then(() => {
      res.json({ success: true, message: "Your items have been added" });
    })
    .catch(error => {
      res.status(500).json({ error: "An error occurred while adding the item" });
    });
});

// API to update an item
app.put("/api/items/:id", (req, res) => {
  const itemId = req.params.id;
  const item = req.body;
  if (!item || !itemId) return res.status(422).json({ error: "You need to provide item details to update" });
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