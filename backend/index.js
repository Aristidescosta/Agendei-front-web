const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8081;
const dbuser = "rubenAndre";
const dbpass = "l03p5D9gBLR2V4xk";



app.use(cors());

app.get("/", (req, res) => {
  res.send("Olá mundo!")
}) 
 
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);  
    return email
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Falha na autenticação" });
  }
})


app.use((req, res, next) => {
  const erro = new Error('Pagina não encontrada')
  erro.status = 404
  next(erro)
})


app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.send({
    erro: {
      mensagem: error.message
    }
  })
})


mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.t5c1s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT);
    console.log("conectou ao banco🔥🔥🔥");
  })
  .catch((err) => console.log(err));
