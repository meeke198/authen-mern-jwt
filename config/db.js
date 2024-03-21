// const mongoose = require("mongoose");
// const { MONGO_URL } = process.env;

// mongoose
//   .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//     // Start your Express server or perform other operations
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });
// module.exports = mongoose.connection;
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "superuser_name",
  password: "superuser_password",
  host: "localhost",
  port: 5432,
  database: "tododb",
});

module.exports = pool;