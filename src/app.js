
// app.js starting
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/food")
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });
// Your server code here (assuming it's running on port 3000)
const express = require("express");
const path =require("path");
const app = express();
const port = 3000;
// require("./db/conn.js");


const static_path =path.join(__dirname, "../");
app.use(express.static(static_path));

// Define the schema
const gmSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  message: String
});

// Create a model
const food = mongoose.model("food", gmSchema);

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
// Handle form submissions
app.post("/", async (req, res) => {
  try {
    // Create a new GM instance
    const gmMember = new food({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    });

    // Save the data to the database
    await gmMember.save();
    res.send("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data to the database:", error.message);
    res.status(500).send("Error saving data to the database");
  }
});


app.get("/", (req, res) => {
  res.send("Hello from the chegg");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});



// test> use newfolder
// switched to db newfolder
// newfolder> show collections
// gms
// users
// newfolder> db.gms.find()
// [
//   {
//     _id: ObjectId("654f5c10905a9f70b2fb7bc7"),
//     name: 'Vishal Kumar',
//     age: 33,
//     gender: 'male',
//     locality: 'indian',
//     __v: 0
//   }
// ]