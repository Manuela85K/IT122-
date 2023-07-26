// Array of objects representing different items
const items = [
  {
    id: 1,
    name: "Laptop",
    make: "Dell",
    model: "Inspiron 15",
    year: 2022
  },
  {
    id: 2,
    name: "Smartphone",
    make: "Apple",
    model: "iPhone 13",
    year: 2021
  },
  {
    id: 3,
    name: "Television",
    make: "Samsung",
    model: "QLED Q80A",
    year: 2023
  },
  {
    id: 4,
    name: "Headphones",
    make: "Sony",
    model: "WH-1000XM4",
    year: 2022
  },
  {
    id: 5,
    name: "Gaming Console",
    make: "Microsoft",
    model: "Xbox Series X",
    year: 2021
  }
];

const getAll = () => items; // Function to get all items
const getItem = (id) => items.find((item) => item.id === id); // Function to get an item by ID

export { getAll, getItem }; // Exporting the getAll and getItem functions
