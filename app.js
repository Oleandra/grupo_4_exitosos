const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/login.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/register.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/productCart.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/productDetail.html"));
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});