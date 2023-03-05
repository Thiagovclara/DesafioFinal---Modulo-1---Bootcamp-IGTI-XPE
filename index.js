import express from "express";
import pedidosRouter from "./routes/pedidos.js";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use("/pedido", pedidosRouter);

app.listen(3000, async () => {
  try {
    await readFile("pedidos.json");
    console.log("API Started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      pedidos: [],
    };
    writeFile("pedidos.json", JSON.stringify(initialJson))
      .then(() => {
        console.log("API Started and File Created!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
