import express, { urlencoded, json } from "express";
const app = express();
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { promises } from "fs";
const { readFile, writeFile } = promises;

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

let items = [];

app.get("/", (req, res) => {
  res.send("Servidor de prueba");
});
app.get("/items", async (req, res) => {
  await open();
  res.json(items);
});
app.get("/items/:id", (req, res) => {
  res.send(`${req.params.id}`);
});
app.put("/items/:id", async (req, res) => {
  const id = req.params.id;
  await open();
  const index = items.findIndex((item) => item.id === id);
  items[index].completed = !items[index].completed;
  await save();
  res.json(items[index]);
});

app.delete("/items/:id", async (req, res) => {
  const id = req.params.id;
  await open();
  items = items.filter((item) => item.id !== id);
  await save();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const id = uuidv4();
  req.body["id"] = id;
  await open();
  items.unshift(req.body);

  await save();
  res.json(req.body);
});

async function save() {
  const res = await writeFile("data.json", JSON.stringify(items), "utf-8");
}

async function open() {
  const res = await readFile("data.json", "utf-8");
  items = JSON.parse(res);
  console.log("open", items);
}

app.listen(3001, () => {
  console.log("servidor iniciado...");
});
