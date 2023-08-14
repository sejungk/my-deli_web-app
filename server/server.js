const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

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

// app.get("/api/menu-items", async (req, res) => {
//   try {
//     // const query = `
//     // SELECT c.name AS category_name, m.name AS menu_item_name, m.*
//     // FROM menu_items m
//     // INNER JOIN categories c ON m.category_id = c.id
//     // ORDER BY c.name, m.menu_item_name;
//     // `;

//     const query = `
//     SELECT menu_items.id, categories.id
//     FROM menu_items
//     INNER JOIN categories ON menu_items.parent_category_id =  menu_items.category_id
//     `;
//     console.log("SQL Query:", query);

//     const { rows } = await pool.query(query);
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     res.status(500).json({ error: "An error occurred while fetching menu items." });
//   }
// });
app.get("/api/menu-items", async (req, res) => {
  try {
    const query = `
    SELECT menu_items.id AS menu_item_id,
           menu_items.name AS menu_item_name,
           menu_items.description AS menu_item_description,
           menu_items.base_price AS menu_item_base_price,
           categories.category_id,
           categories.name AS category_name
    FROM menu_items
    JOIN categories ON menu_items.category_id = categories.category_id
    ORDER BY categories.name, menu_items.name;
    `;

    // console.log("Query:", query); // Log the query

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
