import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/veertri";

// Debug: Check if MONGO_URI is set from environment
console.log("MONGO_URI configured:", MONGO_URI ? "Yes" : "No");
console.log(
  "MONGO_URI starts with mongodb:",
  MONGO_URI?.startsWith("mongodb") ? "Yes" : "No"
);

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    if (mongoose.connection.readyState === 1) {
      return cachedDb;
    }
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false, // Disable buffering
    });

    console.log("✅ MongoDB connected successfully");
    console.log(`📍 Connected to: ${mongoose.connection.host}`);

    cachedDb = db;
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    // Don't exit the process in serverless!
    // process.exit(1);
    throw err;
  }
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  // fast-fail for static assets if any inadvertently pass through
  if (req.path.includes(".")) return next();

  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed for request:", error);
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
      hint: "Check MONGO_URI environment variable",
    });
  }
});

// Health check endpoint to verify deployment
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    mongoURISet: !!process.env.MONGO_URI,
    mongoURIPreview: process.env.MONGO_URI
      ? process.env.MONGO_URI.substring(0, 30) + "..."
      : "NOT SET - using localhost fallback",
    nodeEnv: process.env.NODE_ENV || "not set",
    timestamp: new Date().toISOString(),
  });
});

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
    required: false,
    sparse: true,
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

    if (!firstName || !lastName || !age || !phoneNumber || !gender) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    if (email) {
      const existingUser = await PreLaunchUser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
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

app.get("/api/roi", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const count = await PreLaunchUser.countDocuments();
    const feedbackCount = await PreLaunchUser.countDocuments({
      feedback: { $exists: true, $ne: "" },
    });

    const users = await PreLaunchUser.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const graphData = await PreLaunchUser.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          hasFeedback: {
            $cond: [
              {
                $and: [
                  { $ifNull: ["$feedback", false] },
                  { $ne: ["$feedback", ""] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$date",
          users: { $sum: 1 },
          feedback: { $sum: "$hasFeedback" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedGraphData = graphData.map((item) => ({
      date: item._id,
      users: item.users,
      feedback: item.feedback,
    }));

    res.json({
      count, // Total stats
      feedbackCount, // Total stats
      users, // Paginated list
      graphData: formattedGraphData, // Aggregated daily data
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching ROI data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// CSV Ingestion Route
app.get("/api/ingest-csv", async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const csvPath = path.join(__dirname, "data", "data1_ingest.csv");

  console.log(`Ingesting from: ${csvPath}`);
  if (!fs.existsSync(csvPath)) {
    return res.status(404).json({ message: "CSV file not found" });
  }

  const users = [];

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (row) => {
      const normalizedRow = {};
      Object.keys(row).forEach((key) => {
        normalizedRow[key.toLowerCase().trim()] = row[key];
      });

      const user = {
        firstName: normalizedRow["first name"] || normalizedRow["firstname"],
        lastName: normalizedRow["last name"] || normalizedRow["lastname"],
        email: normalizedRow["email"],
        age: normalizedRow["age"],
        phoneNumber:
          normalizedRow["phone number"] ||
          normalizedRow["phonenumber"] ||
          normalizedRow["phone"],
        gender: (normalizedRow["gender"] || "").toLowerCase(),
        feedback: normalizedRow["feedback"] || "",
        createdAt:
          normalizedRow["date"] ||
          normalizedRow["created"] ||
          normalizedRow["createdat"] ||
          normalizedRow["timestamp"]
            ? new Date(
                normalizedRow["date"] ||
                  normalizedRow["created"] ||
                  normalizedRow["createdat"] ||
                  normalizedRow["timestamp"]
              )
            : new Date(),
      };

      if (user.firstName && user.lastName && user.phoneNumber) {
        users.push(user);
      }
    })
    .on("end", async () => {
      try {
        if (users.length > 0) {
          const result = await PreLaunchUser.insertMany(users, {
            ordered: false,
          });
          res.json({
            message: `Successfully inserted ${result.length} users`,
            totalProcessed: users.length,
          });
        } else {
          res.json({
            message: "No valid users found in CSV",
            totalProcessed: 0,
          });
        }
      } catch (error) {
        // Handle partial insertion (duplicates)
        if (error.writeErrors) {
          // BulkWriteError
          const inserted = error.insertedDocs
            ? error.insertedDocs.length
            : users.length - error.writeErrors.length;
          res.json({
            message: `Partial success: Inserted ${inserted} users. Some duplicates skipped.`,
            error: error.message,
          });
        } else {
          res
            .status(500)
            .json({ message: "Error inserting data", error: error.message });
        }
      }
    })
    .on("error", (err) => {
      res
        .status(500)
        .json({ message: "Error reading CSV", error: err.message });
    });
});

// Cleanup Endpoint
app.get("/api/cleanup-bad-data", async (req, res) => {
  try {
    // Target specifically the problematic time range (2026-01-10 00:43:46)
    // Covering both .634 and .640 milliseconds
    const start = new Date("2026-01-10T00:43:46.000Z");
    const end = new Date("2026-01-10T00:43:47.000Z");

    const count = await PreLaunchUser.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });

    if (count > 0) {
      const result = await PreLaunchUser.deleteMany({
        createdAt: { $gte: start, $lte: end },
      });
      res.json({
        message: "Cleanup successful",
        deletedCount: result.deletedCount,
        rangeStart: start.toISOString(),
        rangeEnd: end.toISOString(),
      });
    } else {
      res.json({
        message: "No matching documents found to delete in this time range.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during cleanup", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Veertri Backend is running");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Global error handler - catches any uncaught errors
app.use((err, req, res, next) => {
  console.error("Global error handler caught:", err);
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });
});

export default app;
