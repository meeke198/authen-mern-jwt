const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const keys = require("./config/keys")
const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
// Make sure the database is connected before starting the server
const User = require ('./model/User')

console.log({keys});
app.get('/', (req, res) => {
    res.send("This is a blank home page")
})
app.get("/users", async (req, res) => {
    try{
    const users = await User.find();
    res.send(users)
    }catch(e){
        console.error(e)
    }
//   res.send("This is a blank home page");
});
app.get("/createUser", async (req, res) => {
  try {
    const user = {
      id: "123",
      userName: "admin",
      email: "admin@gamil.com",
    };
    const newUser = await User.create(user);
    newUser.save();
    console.log("User created successfully:", newUser);
    res.status(200).send("newUser created");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.get('/createToken', async (req,res) => {
     try {
         let user = {
           id: "123",
           userName: "admin",
           email: "admin@gamil.com",
         };
      // do some data validation
      const newUser = new User(user);
      newUser.save();
      console.log("User create successfully", newUser);
      const payload = {
                id: user._id,
                name: user.userName,
                email: user.email,
            }
      const token = await jwt.sign(
        payload,
        keys.secretOrKey
      );
       console.log({token});
      res.status(201).json({ message: "User was successfully registered." });
    } catch (e) {
      console.log(e);
    }
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

  app.listen(3000, () => {
    console.log("App listen on localhost 3000");
  })

// Bản chất của authentication là xác định tính hợp lệ của 1 yêu cầu gửi tới gồm: 
// - tính chính danh của người gửi
// - tính toàn vẹn của dữ liệu trên đường truyền dẫn yêu cầu tới đích.
//nguoi dung login => request => server => authen => gui lai 1 token luu o client => client gui kem token o moi request de server co the xac thuc+tra lai data