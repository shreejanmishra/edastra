// Debug endpoint to test individual imports
export default async function handler(req, res) {
  const results = {
    timestamp: new Date().toISOString(),
    imports: {},
  };

  // Test 1: dotenv
  try {
    const dotenv = await import("dotenv");
    results.imports.dotenv = "OK";
  } catch (e) {
    results.imports.dotenv = `FAILED: ${e.message}`;
  }

  // Test 2: express
  try {
    const express = await import("express");
    results.imports.express = "OK";
  } catch (e) {
    results.imports.express = `FAILED: ${e.message}`;
  }

  // Test 3: mongoose
  try {
    const mongoose = await import("mongoose");
    results.imports.mongoose = "OK";
  } catch (e) {
    results.imports.mongoose = `FAILED: ${e.message}`;
  }

  // Test 4: cors
  try {
    const cors = await import("cors");
    results.imports.cors = "OK";
  } catch (e) {
    results.imports.cors = `FAILED: ${e.message}`;
  }

  // Test 5: csv-parser
  try {
    const csvParser = await import("csv-parser");
    results.imports.csvParser = "OK";
  } catch (e) {
    results.imports.csvParser = `FAILED: ${e.message}`;
  }

  // Test 6: fs (built-in)
  try {
    const fs = await import("fs");
    results.imports.fs = "OK";
  } catch (e) {
    results.imports.fs = `FAILED: ${e.message}`;
  }

  // Test 7: Try importing the actual server
  try {
    const server = await import("../server/server.js");
    results.imports.server = "OK";
  } catch (e) {
    results.imports.server = `FAILED: ${e.message}`;
    results.serverError = {
      name: e.name,
      message: e.message,
      stack: e.stack?.split("\n").slice(0, 5),
    };
  }

  res.status(200).json(results);
}
