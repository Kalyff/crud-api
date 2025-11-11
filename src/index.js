const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Model
const Servico = mongoose.model("Servico", {
  name: String,
  description: String,
  image_url: String,
});

app.get("/servico", async (req, res) => {
  const servicos = await Servico.find();
  return res.send(servicos);
});

app.post("/servico", async (req, res) => {
  const novoServico = new Servico(req.body);
  await novoServico.save();
  res.send(novoServico);
});

app.put("/servico/:id", async (req, res) => {
  const servico = await Servico.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.send(servico);
});

app.delete("/servico/:id", async (req, res) => {
  const servico = await Servico.findByIdAndDelete(req.params.id);
  return res.send(servico);
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://kalyffsouza_db_user:oyspqeMucfPMNMbF@api.q9qsjth.mongodb.net/?appName=API"
  );
  console.log("app.running");
});
