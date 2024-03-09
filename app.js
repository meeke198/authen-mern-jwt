const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
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
      password: "password",
    };

    const newUser = await User.create(user);

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // console.log(newUser.password);

        await newUser.save();

        const payload = {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          password: newUser.password,
        };

        const token = jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          
        );
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        };
        console.log("token", token);

        console.log("newUser created successfully", newUser);
        res.send("User created");
      });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});
// Assuming you are making an HTTP request to the server
// axios.post('/login', userData)
//   .then(response => {
//     const token = response.data.token; // Access the token from the response
//     // Save the token in localStorage, sessionStorage, or any other suitable storage mechanism
//     localStorage.setItem('token', token);
//     // Perform other actions with the token as needed
//   })
//   .catch(error => {
//     // Handle error
//   });

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