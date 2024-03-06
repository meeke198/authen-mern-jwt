const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.get('/', (req, res) => {
    res.send("This is a blank home page")
})

app.get('/createToken', (req,res) => {
    let user = {
        id: "123",
        userName: "admin",
        email: "admin@gamil.com",
    }
    const token = jwt.sign({ user: user }, process.env.SECRET_KEY);
    console.log({token});
    res.send("Token was created successfully")
})

app.get('/profile', (req,res) => {
    res.send("This is profile page")
})

app.get("/wrongToken", (req, res) => {
  res.send("Wrong token");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})