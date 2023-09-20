require('dotenv').config()
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


// Create a pool to manage database connections
const pool = new Pool({
  user: "sejungkim",
  host: "localhost",
  database: "mydeli",
  password: "691220",
  port: 5432, // Default PostgreSQL port
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;
    console.log(items);

    if (!Array.isArray(items.items)) {
      throw new Error('Items should be an array.');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price_data.unit_amount,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.CLIENT_URL}/order-confirmation`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// const storeItems = new Map([
//   [1, { priceInCents: 1000, name: 'Cheeseburger' }],
//   [2, { priceInCents: 2000, name: 'Steak and Cheese' }]
// ])

// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: req.body.items.map(item => {
//         const storeItem = storeItems.get(item.id)
      //   return {
      //     price_data: {
      //       currency: 'usd',
      //       product_data: {
      //         name: storeItem.name
      //       },
      //       unit_amount: storeItem.priceInCents
      //     },
      //     quantity: item.quantity
      //   }
      // }),
//       success_url: `${process.env.CLIENT_URL}/order-confirmation`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel.html`
//     })
//     res.json({ url: session.url })
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

// Endpoint to create an order
app.post('/api/orders', async (req, res) => {
  try {
    const { orderData, cartItems } = req.body;
    // Extract order data from the request body
    const {
      customer_name,
      phone_number,
      payment_method,
      total_amount,
      tip_amount,
      subtotal_amount,
      taxes_amount,
      status_id,
      order_time,
      order_date,
      pickup_time,
      pickup_date
    } = orderData;

    // Insert the order into the 'orders' table and retrieve its ID
    const { rows } = await pool.query(
      'INSERT INTO orders (customer_name, phone_number, payment_method, total_amount, tip_amount, subtotal_amount, taxes_amount, status_id, order_time, order_date, pickup_time, pickup_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
      [customer_name, phone_number, payment_method, total_amount, tip_amount, subtotal_amount, taxes_amount, status_id, order_time, order_date, pickup_time, pickup_date]
    );

    const orderId = rows[0].id;
     // Insert order items into the 'order_items' table
     for (const item of cartItems) {
      await pool.query(
        'INSERT INTO order_items (order_id, item_name, quantity, item_price) VALUES ($1, $2, $3, $4)',
        [orderId, item.item_name, item.quantity, item.item_price]
      );
    }
    res.status(201).json({ message: 'Order created successfully' });
    console.log(`Order id: ${orderId} created successfully`);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});

// Route to get all menu items
app.get("/api/menu-items", async (req, res) => {
  try {
    const query = `
      SELECT
        menu_items.id AS id,
        menu_items.name AS name,
        menu_items.description AS description,
        CAST(menu_items.base_price AS numeric) AS base_price,
        menu_items.exclusions AS exclusions,
        categories.category_id,
        categories.name AS category_name,
        COALESCE(json_agg(
          json_build_object(
            'id', option_groups.id,
            'name', option_groups.name,
            'display_text', option_groups.display_text,
            'allow_multiple', option_groups.allow_multiple,
            'required', option_groups.required,
            'free_option_limit', option_groups.free_option_limit,
            'options', (
              SELECT COALESCE(json_agg(
                json_build_object(
                  'id', options.id,
                  'name', options.name,
                  'additional_price', options.additional_price
                )
              ), '[]'::json)
              FROM options
              WHERE options.option_group_id = option_groups.id
            )
          )
        ), '[]'::json) AS option_groups
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

app.get("/api/menu-items/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;

    const query = `
    SELECT
      menu_items.id AS id,
      menu_items.name AS name,
      menu_items.description AS description,
      menu_items.base_price AS base_price,
      menu_items.exclusions AS exclusions,
      categories.category_id AS category_id,
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
      SELECT
        option_groups.id AS id,
        option_groups.name AS name,
        option_groups.display_text AS display_text,
        option_groups.allow_multiple AS allow_multiple,
        option_groups.required AS required,
        option_groups.free_option_limit AS free_option_limit,
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
        id,
        name,
        display_text,
        allow_multiple,
        required,
        free_option_limit,
      } = row;

      if (!optionGroups[id]) {
        optionGroups[id] = {
          id,
          name,
          display_text,
          allow_multiple,
          required,
          free_option_limit,
          options: [],
        };
      }

      optionGroups[id].options.push({
        id: row.option_id,
        name: row.option_name,
        additional_price: parseFloat(row.option_additional_price)
      });
    });

    // Prepare the menu item object with associated option groups
    const menuItem = {
      id: rows[0].id,
      name: rows[0].name,
      description: rows[0].description,
      base_price: parseFloat(rows[0].base_price),
      exclusions: rows[0].exclusions,
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
