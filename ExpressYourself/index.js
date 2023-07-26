import express from "express"; // Importing express module
import { getAll, getItem } from "./data.js"; // Importing getAll and getItem functions

const app = express();
const PORT = 3000; // Server port number

// Set up the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Home page route
app.get("/", (req, res) => {
    const items = getAll();
    res.render("home", { items });
});

// Detail page route
app.get("/detail", (req, res) => {
    const itemId = parseInt(req.query.id);
    const item = getItem(itemId);
    res.render("detail", { item });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});