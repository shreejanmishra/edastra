require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/veertri";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB connected successfully");
    console.log(`📍 Connected to: ${mongoose.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("💡 Please check:");
    console.error("   1. MongoDB is running (if using local)");
    console.error("   2. IP is whitelisted in MongoDB Atlas (if using cloud)");
    console.error("   3. Connection string is correct in .env file");
    // Exit process with failure
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err);
});

connectDB();

// Schema
const preLaunchSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[a-zA-Z\s]+$/, "First name should only contain letters"],
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[a-zA-Z\s]+$/, "Last name should only contain letters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  age: {
    type: Number,
    required: true,
    min: [3, "Age must be at least 3"],
    max: [100, "Age must be less than 120"],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{10}$/, "Please provide a valid phone number"],
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ["male", "female", "other", "prefer-not-to-say"],
      message: "{VALUE} is not supported",
    },
  },
  feedback: {
    type: String,
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const PreLaunchUser = mongoose.model("PreLaunchUser", preLaunchSchema);

// Routes
app.post("/api/pre-launch", async (req, res) => {
  try {
    const { firstName, lastName, email, age, phoneNumber, gender, feedback } =
      req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !age || !phoneNumber || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await PreLaunchUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new PreLaunchUser({
      firstName,
      lastName,
      email,
      age,
      phoneNumber,
      gender,
      feedback,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Veertri Backend is running");
});

// Start Server (only for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
