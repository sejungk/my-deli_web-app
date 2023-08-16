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

// Route to get all menu items
app.get("/api/menu-items", async (req, res) => {
  try {
    const query = `
    SELECT menu_items.id AS menu_item_id,
           menu_items.name AS menu_item_name,
           menu_items.description AS menu_item_description,
           menu_items.base_price AS menu_item_base_price,
           menu_items.exclusions AS menu_item_exclusions,
           categories.category_id,
           categories.name AS category_name
    FROM menu_items
    JOIN categories ON menu_items.category_id = categories.category_id
    ORDER BY categories.category_id, menu_items.name;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "An error occurred while fetching menu items." });
  }
});

// Route to get a specific menu item by ID
app.get("/api/menu-items/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id; // Get the menu item ID from the URL parameter

    const query = `
    SELECT menu_items.id AS menu_item_id,
           menu_items.name AS menu_item_name,
           menu_items.description AS menu_item_description,
           menu_items.base_price AS menu_item_base_price,
           menu_items.exclusions AS menu_item_exclusions,
           categories.category_id,
           categories.name AS category_name
    FROM menu_items
    JOIN categories ON menu_items.category_id = categories.category_id
    WHERE menu_items.id = $1;
    `;

    const { rows } = await pool.query(query, [menuItemId]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "An error occurred while fetching the menu item." });
  }
});

// Route to get a options groups for menu item by ID
// app.get("/api/menu-items/:menuItemId/options", async (req, res) => {
//   try {
//     const menuItemId = req.params.menuItemId;

//     // First, fetch the option groups associated with the menu item
//     const optionGroupsQuery = `
//       SELECT option_group_id
//       FROM menuitems_optiongroups
//       WHERE menu_item_id = $1;
//     `;
//     const optionGroupsResult = await pool.query(optionGroupsQuery, [menuItemId]);

//     // Extract the option group IDs from the result
//     const optionGroupIds = optionGroupsResult.rows.map(row => row.option_group_id);

//     // Create a parameterized list of placeholders for the option group IDs
//     const placeholders = optionGroupIds.map((id, index) => `$${index + 1}`).join(", ");

//     // Fetch all options for the extracted option group IDs
//     const optionsQuery = `
//       SELECT options.id,
//              options.name AS option_name,
//              options.additional_price AS option_additional_price,
//              option_groups.id AS option_group_id,
//              option_groups.name AS option_group_name,
//              option_groups.display_text AS option_group_display_text,
//              option_groups.allow_multiple AS option_group_allow_multiple,
//              option_groups.required AS option_group_required,
//              option_groups.free_option_limit AS option_group_free_option_limit
//       FROM options
//       JOIN option_groups ON options.option_group_id = option_groups.id
//       WHERE option_groups.id IN (${placeholders})
//       ORDER BY option_groups.id, options.id;
//     `;

//     const { rows } = await pool.query(optionsQuery, optionGroupIds);
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching options:", error);
//     res.status(500).json({ error: "An error occurred while fetching options." });
//   }
// });

app.get("/api/menu-items/:menuItemId/options", async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;

    // Fetch menu item details along with options and option groups
    const query = `
      SELECT menu_items.id AS menu_item_id,
             menu_items.name AS menu_item_name,
             menu_items.description AS menu_item_description,
             options.id AS option_id,
             options.name AS option_name,
             options.additional_price AS option_additional_price,
             option_groups.id AS option_group_id,
             option_groups.name AS option_group_name,
             option_groups.display_text AS option_group_display_text,
             option_groups.allow_multiple AS option_group_allow_multiple,
             option_groups.required AS option_group_required,
             option_groups.free_option_limit AS option_group_free_option_limit
      FROM menu_items
      LEFT JOIN menuitems_optiongroups ON menu_items.id = menuitems_optiongroups.menu_item_id
      LEFT JOIN options ON menuitems_optiongroups.option_group_id = options.option_group_id
      LEFT JOIN option_groups ON options.option_group_id = option_groups.id
      WHERE menu_items.id = $1
      ORDER BY option_groups.id, options.id;
    `;

    const { rows } = await pool.query(query, [menuItemId]);
    const menu_item = {
      id: rows[0].menu_item_id,
      name: rows[0].menu_item_name,
      description: rows[0].menu_item_description,
      options: rows.map(row => ({
        id: row.option_id,
        name: row.option_name,
        additional_price: row.option_additional_price,
        option_group_id: row.option_group_id,
        option_group_name: row.option_group_name,
        option_group_display_text: row.option_group_display_text,
        option_group_allow_multiple: row.option_group_allow_multiple,
        option_group_required: row.option_group_required,
        option_group_free_option_limit: row.option_group_free_option_limit
      }))
    };

    res.json(menu_item);
  } catch (error) {
    console.error("Error fetching options:", error);
    res.status(500).json({ error: "An error occurred while fetching options." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
