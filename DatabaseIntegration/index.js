import express from "express";
import Item from "./model/data.js";

const app = express();
const PORT = 8080;

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});