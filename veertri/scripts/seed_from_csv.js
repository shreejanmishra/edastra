import dotenv from "dotenv";
import mongoose from "mongoose";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configure dotenv
dotenv.config({ path: path.join(process.cwd(), ".env") });

const logFile = path.join(process.cwd(), "seed_log.txt");
const log = (msg) => {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${msg}\n`;
  console.log(msg); // Keep console just in case
  fs.appendFileSync(logFile, line);
};

// Clear log file on start
fs.writeFileSync(logFile, "Starting seed script...\n");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the schema/model
const preLaunchSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false, sparse: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  feedback: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const PreLaunchUser =
  mongoose.models.PreLaunchUser ||
  mongoose.model("PreLaunchUser", preLaunchSchema);

const seedData = async () => {
  try {
    // 1. Connect to MongoDB
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }
    await mongoose.connect(MONGO_URI);
    log("✅ MongoDB connected");

    // 2. Read CSV File
    const csvPath = path.join(
      process.cwd(),
      "server",
      "data",
      "data1_ingest.csv"
    );
    log(`Reading file from: ${csvPath}`);

    if (!fs.existsSync(csvPath)) {
      throw new Error(`File not found at ${csvPath}`);
    }

    const users = [];

    const stream = fs
      .createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        // console.log("Processing row:", row); // Uncomment if needed, usually too noisy
        // Map headers dynamically - normalize keys to lowercase to be safe
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
          createdAt: normalizedRow["date"]
            ? new Date(normalizedRow["date"])
            : new Date(),
        };

        if (user.firstName && user.lastName && user.phoneNumber) {
          users.push(user);
        } else {
          // log("Skipping invalid row"); // noisy
        }
      })
      .on("end", async () => {
        log(`Found ${users.length} valid records in CSV`);

        if (users.length > 0) {
          try {
            log("Attempting to insert records...");
            const result = await PreLaunchUser.insertMany(users, {
              ordered: false,
            });
            log(`✅ Successfully inserted ${result.length} users`);
          } catch (insertError) {
            if (insertError.code === 11000 || insertError.writeErrors) {
              const insertedCount = insertError.insertedDocs
                ? insertError.insertedDocs.length
                : users.length - insertError.writeErrors.length;
              log(
                `⚠️ Partial success: Inserted ${insertedCount} users. Duplicate emails were skipped.`
              );
            } else {
              log(`Insert error: ${insertError.message}`);
            }
          }
        } else {
          log("No data to insert.");
        }

        log("Disconnecting...");
        await mongoose.disconnect();
        log("Disconnected from MongoDB");
        process.exit(0); // Force exit
      })
      .on("error", (err) => {
        log(`CSV Stream Error: ${err.message}`);
        mongoose.disconnect();
        process.exit(1);
      });
  } catch (err) {
    log(`❌ Seeding error: ${err.message}`);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};

log("Script initialized.");
seedData();
