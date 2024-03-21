const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const keys = require("./config/keys");
const mongoose = require("mongoose");
// const { MONGO_URL } = process.env;
const pool = require("./config/db")
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// Make sure the database is connected before starting the server
const {User, validateRegistration,
  validateLogin} = require("./model/User");
app.use(cors());
console.log({ keys });
// Parse JSON bodies
app.use(bodyParser.json());
// Middleware to initialize Passport
app.use(passport.initialize());
app.get("/test", async (req, res) => {
  try {
    const client = await pool.connect();
    res.send("Connection successful!");
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.SECRET_OR_KEY, // Replace with your own secret key
//     },
//     (jwtPayload, done) => {
//       // Find the user based on the JWT payload
//       // Validate the user or perform additional checks if needed
//       // Call the done function with the user object or false if not found
//       console.log({ jwtPayload });
//       User.findById(jwtPayload.id)
//         .then((user) => {
//           if (user) {
//             // return the user to the frontend
//             return done(null, user);
//           }
//           // return false since there is no user
//           return done(null, false);
//         })
//         .catch((err) => console.log(err));
//     }
//   )
// );
// app.get("/", (req, res) => {
//   res.send("This is a blank home page");
// });
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (e) {
//     console.error(e);
//   }
//   //   res.send("This is a blank home page");
// });

// //NOT USING PASSPORT
// app.post("/signup", async (req, res) => {
//   const user = {
//     userName: req.body.userName,
//     email: req.body.email,
//     password: req.body.password,
//   };

//   const { error } = validateRegistration(user);
//   if (error) {
//     console.log({ error });
//     // return res.status(400).json({ message: error.message });
//   }

//   User.findOne({ email: req.body.email }).then(async (isEmail) => {
//     if (isEmail) {
//       return res.status(400).json({
//         message:
//           "Email is already associated with an account. Please try to log in.",
//       });
//     }

//     const newUser = await User.create(user);

//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, async (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;

//         await newUser.save();
//         console.log("newUser created successfully", newUser);
//         // res.send("User created");
//       });
//     });
//   });
// });
// app.post("/login", (req, res) => {
//   const { error } = validateLogin(req.body);
//   if (error) {
//     // return res.status(400).json({
//     //     message: ""
//     // })
//     console.log({ error });
//   }
//   User.findOne({ email: req.body.email }).then((user) => {
//     if (!user) {
//       console.log({ error });
//       return res.status(400).json({
//         message: "Account doesn't exist, plz register",
//       });
//     }
//     bcrypt.compare(req.body.password, user.password).then((isMatch) => {
//       //create token
//       if (isMatch) {
//         const payload = {
//           id: user._id,
//           userName: user.userName,
//           email: user.email,
//           password: user.password,
//         };

//         const token = jwt.sign(payload, keys.secretOrKey, {
//           expiresIn: 3600,
//         });
//         res.json({
//           success: true,
//           token: "Bearer " + token,
//         });

//         console.log({ token });
//       } else {
//         return res.status(400).json({
//           message: "Fail to login user, plz check your emai/password",
//         });
//       }
//     });
//   });
// });
// app.get("/profile", async (req, res) => {
//   const result = await jwt.verify();
//   res.send("This is profile page");
// });

// app.get("/wrongToken", (req, res) => {
//   res.send("Wrong token");
// });
// const port = process.env.PORT || 5000;

// mongoose
//   .connect(MONGO_URL)
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//     // Start your Express server or perform other operations
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

app.listen(3000, () => {
  console.log("App listen on localhost 3000");
});

// Bản chất của authentication là xác định tính hợp lệ của 1 yêu cầu gửi tới gồm:
// - tính chính danh của người gửi
// - tính toàn vẹn của dữ liệu trên đường truyền dẫn yêu cầu tới đích.
//nguoi dung login => request => server => authen => gui lai 1 token luu o client => client gui kem token o moi request de server co the xac thuc+tra lai data
