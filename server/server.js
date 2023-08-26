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
    SELECT
        menu_items.id AS id,
        menu_items.name AS name,
        menu_items.description AS description,
        menu_items.base_price AS base_price,
        menu_items.exclusions AS exclusions,
        categories.category_id,
        categories.name AS category_name,
        COALESCE(json_agg(option_groups.*), '[]'::json) AS option_groups
    FROM menu_items
    JOIN categories ON menu_items.category_id = categories.category_id
    LEFT JOIN menuitems_optiongroups ON menu_items.id = menuitems_optiongroups.menu_item_id
    LEFT JOIN option_groups ON menuitems_optiongroups.option_group_id = option_groups.id
    GROUP BY menu_items.id, categories.category_id
    ORDER BY categories.category_id, menu_items.name;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "An error occurred while fetching menu items." });
  }
});
// app.get("/api/menu-items", async (req, res) => {
//   try {
//     const query = `
//     SELECT menu_items.id AS menu_item_id,
//            menu_items.name AS menu_item_name,
//            menu_items.description AS menu_item_description,
//            menu_items.base_price AS menu_item_base_price,
//            menu_items.exclusions AS menu_item_exclusions,
//            categories.category_id,
//            categories.name AS category_name
//     FROM menu_items
//     JOIN categories ON menu_items.category_id = categories.category_id
//     ORDER BY categories.category_id, menu_items.name;
//     `;
//     const { rows } = await pool.query(query);
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     res.status(500).json({ error: "An error occurred while fetching menu items." });
//   }
// });

// Route to get a specific menu item by ID
// app.get("/api/menu-items/:id", async (req, res) => {
//   try {
//     const menuItemId = req.params.id; // Get the menu item ID from the URL parameter

//     const query = `
//     SELECT menu_items.id AS menu_item_id,
//            menu_items.name AS menu_item_name,
//            menu_items.description AS menu_item_description,
//            menu_items.base_price AS menu_item_base_price,
//            menu_items.exclusions AS menu_item_exclusions,
//            categories.category_id,
//            categories.name AS category_name
//     FROM menu_items
//     JOIN categories ON menu_items.category_id = categories.category_id
//     WHERE menu_items.id = $1;
//     `;

//     const { rows } = await pool.query(query, [menuItemId]);
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching menu item:", error);
//     res.status(500).json({ error: "An error occurred while fetching the menu item." });
//   }
// });

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
    if (rows.length === 0) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    // Fetch associated option groups for the menu item
    const optionsQuery = `
      SELECT option_groups.id AS option_group_id,
             option_groups.name AS option_group_name,
             option_groups.display_text AS option_group_display_text,
             option_groups.allow_multiple AS option_group_allow_multiple,
             option_groups.required AS option_group_required,
             option_groups.free_option_limit AS option_group_free_option_limit,
             options.id AS option_id,
             options.name AS option_name,
             options.additional_price AS option_additional_price
      FROM menu_items
      LEFT JOIN menuitems_optiongroups ON menu_items.id = menuitems_optiongroups.menu_item_id
      LEFT JOIN option_groups ON menuitems_optiongroups.option_group_id = option_groups.id
      LEFT JOIN options ON option_groups.id = options.option_group_id
      WHERE menu_items.id = $1
      ORDER BY option_groups.id, options.id;
    `;

    const optionsResult = await pool.query(optionsQuery, [menuItemId]);

    // Group options by option group
    const optionGroups = {};
    optionsResult.rows.forEach((row) => {
      const {
        option_group_id,
        option_group_name,
        option_group_display_text,
        option_group_allow_multiple,
        option_group_required,
        option_group_free_option_limit,
      } = row;

      if (!optionGroups[option_group_id]) {
        optionGroups[option_group_id] = {
          option_group_id,
          option_group_name,
          option_group_display_text,
          option_group_allow_multiple,
          option_group_required,
          option_group_free_option_limit,
          options: [],
        };
      }

      optionGroups[option_group_id].options.push({
        id: row.option_id,
        name: row.option_name,
        additional_price: row.option_additional_price,
      });
    });

    // Prepare the menu item object with associated option groups
    const menuItem = {
      id: rows[0].menu_item_id,
      name: rows[0].menu_item_name,
      description: rows[0].menu_item_description,
      base_price: rows[0].menu_item_base_price,
      exclusions: rows[0].menu_item_exclusions,
      category_id: rows[0].category_id,
      category_name: rows[0].category_name,
      option_groups: Object.values(optionGroups),
    };

    res.json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "An error occurred while fetching the menu item." });
  }
});


// app.get("/api/menu-items/:menuItemId/options", async (req, res) => {
//   try {
//     const menuItemId = req.params.menuItemId;

//     const query = `
//       SELECT menu_items.id AS menu_item_id,
//              menu_items.name AS menu_item_name,
//              menu_items.description AS menu_item_description,
//              menu_items.base_price AS menu_item_base_price,
//              options.id AS option_id,
//              options.name AS option_name,
//              options.additional_price AS option_additional_price,
//              option_groups.id AS option_group_id,
//              option_groups.name AS option_group_name,
//              option_groups.display_text AS option_group_display_text,
//              option_groups.allow_multiple AS option_group_allow_multiple,
//              option_groups.required AS option_group_required,
//              option_groups.free_option_limit AS option_group_free_option_limit
//       FROM menu_items
//       LEFT JOIN menuitems_optiongroups ON menu_items.id = menuitems_optiongroups.menu_item_id
//       LEFT JOIN options ON menuitems_optiongroups.option_group_id = options.option_group_id
//       LEFT JOIN option_groups ON options.option_group_id = option_groups.id
//       WHERE menu_items.id = $1
//       ORDER BY option_groups.id, options.id;
//     `;

//     const { rows } = await pool.query(query, [menuItemId]);

//     const optionsByGroup = {};
//     rows.forEach(row => {
//       const { option_group_id, option_group_name, option_group_display_text } = row;
//       if (!optionsByGroup[option_group_id]) {
//         optionsByGroup[option_group_id] = {
//           option_group_id,
//           option_group_name,
//           option_group_display_text,
//           options: []
//         };
//       }
//       optionsByGroup[option_group_id].options.push({
//         id: row.option_id,
//         name: row.option_name,
//         additional_price: row.option_additional_price
//         // Add other option properties here
//       });
//     });

//     const menu_item = {
//       id: rows[0].menu_item_id,
//       name: rows[0].menu_item_name,
//       description: rows[0].menu_item_description,
//       option_groups: Object.values(optionsByGroup)
//     };

//     res.json(menu_item);
//   } catch (error) {
//     console.error("Error fetching options:", error);
//     res.status(500).json({ error: "An error occurred while fetching options." });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
