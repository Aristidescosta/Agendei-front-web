const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8081;
const segredo = "segredo";
const dbuser = "rubenAndre";
const dbpass = "l03p5D9gBLR2V4xk";
const Users = require("./models/Users.schema");
const nodemailer = require("./config/Nodemailer");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

app.post("/users/signUp", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await Users.findOne({ email, status: "Pending" });

    if (!username || !password || !email) {
      return res.status(401).send({ message: "expected field" });
    }

    console.log(userExist);
    if (userExist) {
      return res
        .status(422)
        .send({ status: 422, message: "EMAIL JÁ CADASTRADO" });
    } else {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      const characters = "0123456789";
      let confirmationCode = "";
      for (let i = 0; i < 4; i++) {
        confirmationCode +=
          characters[Math.floor(Math.random() * characters.length)];
      }
      const confirmCode = Number(confirmationCode);

      const user = new Users({
        username,
        email,
        password: passwordHash,
        confirmCode,
      });

      user.save((err) => {
        res.status(201).send(true);
        nodemailer.sendConfirmationEmail(
          user.username,
          user.email,
          confirmCode
        );
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Falha na autenticação" });
  }
});

app.post("/users/confirmCode", async (req, res) => {
  try {
    const { email, confirmationCode } = req.body;

    const userExist = await Users.findOneAndUpdate(
      { email, confirmCode: confirmationCode },
      { status: "Active" }
    );
 
    if (userExist) {
      const token = jwt.sign(
        {
          id: userExist._id
        },
        segredo
      )
      const data = {
        token,
        user: userExist
      }
      return res.status(201).send({ data, message: "Conta activada com sucesso" })
    } else {
      res.status(404).send({ message: "Código errado, tente novamente" });
    }
  } catch (error) {
    res.status(500).send({ message: "Falha ao ativar a conta" });
  }
});

app.post("/users/confirmCode/reset", async (req, res) => {
  try {
    const email = req.body.email;
  const characters = "0123456789";
  let confirmationCode = "";
  for (let i = 0; i < 4; i++) {
    confirmationCode +=
      characters[Math.floor(Math.random() * characters.length)];
  }
  const confirmCode = Number(confirmationCode);
  const user = await Users.findOneAndUpdate(
    { email },
    { confirmCode: confirmCode }
  );
  nodemailer.sendConfirmationEmail(
    user.username,
    email,
    confirmCode
  )
  res.status(200).send({ message: "Código reenviado com sucesso" })
  } catch (error) {
    res.status(500).send({ message: "Falha ao reenviar código" })
  }
});

app.post("/users/login", async (req, res) =>{
  try {
    const { email, password } = req.body
    const user = await Users.findOne({ email: email })
    if (!user) {
      return res.status(422).send({ message: 'Usuario não encontrado' })
    }
    if(user.status === "Pending"){
      return res.status(422).send({message:'Falha na autenticação'})
    }
    
    const checkPassword = await bcrypt.compare(password, user.password)
    
    if (!checkPassword) {
      return res.status(401).send({ message: 'Falha na autenticação' })
    }
    
    const token = jwt.sign(
      {
        id: user._id
      },
      segredo
    )
    const data = {
      token,
      data: user
    }
    return res.status(200).send(data)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send({ message: 'Falha na autenticação' })
  }
})

app.post("/validateToken", async (req, res) =>{
  try {
    const token = req.body.token
    let id = ''
    const verify = jwt.verify(token, segredo, (err, user) => {
      if (err) 
        return res.status(403).send({ message: 'token expirado' })
      id = user.id
    })
    // console.log(err)
    const data = await Users.findOne({ _id: id })
    const newToken = jwt.sign(
      {
        id: id
      },
      segredo
    )
    const response = {
      token:newToken,
      user: data
    }
  //  console.log(response)
    return res.status(200).send(response)
  }catch (error) {
    console.log(error.message)
    return res.status(500).send({ error: error })
  }
})

app.use((req, res, next) => {
  const erro = new Error("Pagina não encontrada");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.t5c1s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT);
    console.log("conectou ao banco mongo🔥🔥🔥");
  })
  .catch((err) => console.log(err));
