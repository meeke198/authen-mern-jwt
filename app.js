const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const keys = require("./config/keys")
const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
// Make sure the database is connected before starting the server


console.log({keys});
app.get('/', (req, res) => {
    res.send("This is a blank home page")
})

app.get('/createToken', (req,res) => {
    let user = {
        id: "123",
        userName: "admin",
        email: "admin@gamil.com",
    }
    const token = jwt.sign({ user: user }, keys.secretOrKey);
    console.log({token});
    //tao duoc token roi thi gui ve luu o client
    res.send("Token was created successfully")
})

app.get('/profile', async (req,res) => {
    const result = await jwt.verify(

    )
    res.send("This is profile page")
})

app.get("/wrongToken", (req, res) => {
  res.send("Wrong token");
});
const port = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    // Start your Express server or perform other operations
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// app.listen(3000, () => {
//     console.log("Listening on port 3000");
// })

// Bản chất của authentication là xác định tính hợp lệ của 1 yêu cầu gửi tới gồm: 
// - tính chính danh của người gửi
// - tính toàn vẹn của dữ liệu trên đường truyền dẫn yêu cầu tới đích.
//nguoi dung login => request => server => authen => gui lai 1 token luu o client => client gui kem token o moi request de server co the xac thuc+tra lai data