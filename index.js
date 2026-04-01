
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://parveenrajput7988:Tamannaparveen7988@cluster0.4nwgqth.mongodb.net/user?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
// MongoDB connect
// mongoose.connect("mongodb+srv://parveenrajput7988:Tamannaparveen7988@cluster0.4nwgqth.mongodb.net/?appName=Cluster0/user")
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log( password ==user.password)
    // console.log(user)

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // ✅ LOGIN ROUTE
// app.post("/logins", async (req, res) => {
// const {email, password} = req.body
// User.findOne({email:email})
// .then(user => {
//     if(user){
//         if(user.password === password){
//             res.json("success")

//         }
//         else{
//             res.json("password is incorrect")
//         }

//     }
//     else {
//         res.json("no record existed")
//     }
// })


// })


// ✅ REGISTER ROUTE
app.post("/register", async (req, res) => {
  try {
    console.log(req.body); // DEBUG

    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.log("BACKEND ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ error: err.message });
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require("cors")
// const userModel = require('./models/user')


// const app = express()

// app.use(express.json())
// app.use(cors())

// mongoose.connect("mongodb+srv://parveenrajput7988:Tamannaparveen7988@cluster0.4nwgqth.mongodb.net/?appName=Cluster0/user")
// .then(() => console.log(" MongoDB connected"))
// .catch(err => console.log(" DB error:", err));


// app.listen(3000,()=>{
//     console.log("serever is running ...")    
// })
// app.post('/register',async  (req, res) => {
//   try {
//     const user = await userModel.create(req.body);    
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });    
//   }
// console.log(req.body)
// });


// const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://parveenrajput7988:Tamannaparveen7988@cluster0.4nwgqth.mongodb.net/user?retryWrites=true&w=majority')
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log("Connection Error:", err));

// // Define schema
// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
// });

// // Create model
// const User = mongoose.model('User', userSchema);

// // Insert data
// const user = new User({
//     name: 'Mohit Kumar',
//     age: 25,
//     email: 'mohit@example.com',
// });

// user.save()
//     .then(() => console.log('User saved'))
//     .catch((err) => console.error('Error:', err));
// const user2 = new User({
//     name: 'Mohit Kumar',
//     age: 25,
//     email: 'mohit@example.com',
// });

// user2.save()
//     .then(() => console.log('User saved'))
//     .catch((err) => console.error('Error:', err));