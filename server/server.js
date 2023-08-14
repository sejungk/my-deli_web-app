const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// Set up custom type parser for numeric columns
const types = require('pg').types
// types.setTypeParser(1700, parseFloat); // 1700 is the OID for numeric data type

app.use(cors());
app.use(express.json());

// Create a pool to manage database connections
const pool = new Pool({
  user: "sejungkim",
  host: "localhost",
  database: "mydeli",
  password: "691220",
  port: 5432, // Default PostgreSQL port
});

app.get("/api/menu-items", async (req, res) => {
  try {
    const query = "SELECT id, name, description, base_price::numeric, category_id FROM menu_items";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "An error occurred while fetching menu items." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
