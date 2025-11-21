import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));


// -------------------------
// User Schema + Model
// -------------------------
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);


// -------------------------
// SIGNUP API
// -------------------------
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({ message: "User already exists" });
  }

  // Hash password
  const hashedPass = await bcrypt.hash(password, 10);

  // Save new user
  const newUser = new User({
    username,
    email,
    password: hashedhedPass,
  });

  await newUser.save();

  res.json({ message: "Signup successful" });
});


// -------------------------
// LOGIN API
// -------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User does not exist" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ message: "Invalid credentials" });
  }

  // Create JWT token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      role: "customer",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token: token,
  });
});


// -------------------------
// TOKEN VERIFY MIDDLEWARE
// -------------------------
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ message: "Invalid token" });
    }

    req.user = decoded;   // store user details from token
    next();
  });
};


// -------------------------
// DASHBOARD API (PROTECTED)
// -------------------------
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Dashboard access granted",
    user: req.user,
  });
});


// -------------------------
// TEST ROUTE
// -------------------------
app.get("/", (req, res) => {
  res.send("API running...");
});


// -------------------------
// START SERVER
// -------------------------
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

