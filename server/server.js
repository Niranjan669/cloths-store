import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Helper functions
const readData = (file) => JSON.parse(fs.readFileSync(`./db.json`, "utf-8"))[file];
const writeData = (file, data) => {
  const db = JSON.parse(fs.readFileSync(`./db.json`, "utf-8"));
  db[file] = data;
  fs.writeFileSync(`./db.json`, JSON.stringify(db, null, 2));
};

// --- Products ---
app.get("/products", (req, res) => {
  const products = readData("products");
  res.json(products);
});

// --- Cart ---
app.get("/carts", (req, res) => {
  const { userId } = req.query;
  const carts = readData("carts").filter(c => c.userId == userId);
  res.json(carts);
});

app.post("/carts", (req, res) => {
  const carts = readData("carts");
  const newCart = { id: Date.now(), ...req.body };
  carts.push(newCart);
  writeData("carts", carts);
  res.json(newCart);
});

app.delete("/carts/:id", (req, res) => {
  let carts = readData("carts");
  carts = carts.filter(c => c.id != req.params.id);
  writeData("carts", carts);
  res.json({ message: "Removed from cart" });
});

// --- Addresses ---
app.get("/addresses", (req, res) => {
  const { userId } = req.query;
  const addresses = readData("addresses").filter(a => a.userId == userId);
  res.json(addresses);
});

app.post("/addresses", (req, res) => {
  const addresses = readData("addresses");
  const newAddr = { id: Date.now(), ...req.body };
  addresses.push(newAddr);
  writeData("addresses", addresses);
  res.json(newAddr);
});

app.put("/addresses/:id", (req, res) => {
  let addresses = readData("addresses");
  addresses = addresses.map(a => a.id == req.params.id ? { ...a, ...req.body } : a);
  writeData("addresses", addresses);
  res.json({ message: "Address updated" });
});

app.delete("/addresses/:id", (req, res) => {
  let addresses = readData("addresses");
  addresses = addresses.filter(a => a.id != req.params.id);
  writeData("addresses", addresses);
  res.json({ message: "Address deleted" });
});

// --- Orders ---
app.get("/orders", (req, res) => {
  const { userId } = req.query;
  const orders = readData("orders").filter(o => o.userId == userId);
  res.json(orders);
});

app.post("/orders", (req, res) => {
  const orders = readData("orders");
  const newOrder = { id: Date.now(), ...req.body };
  orders.push(newOrder);
  writeData("orders", orders);
  res.json(newOrder);
});

// --- Users ---
app.get("/users", (req, res) => {
  const users = readData("users");
  res.json(users);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
