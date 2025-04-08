const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL setup
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT)
});

// Ensure database connection before creating table
(async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Database connected successfully!");

        await client.query(`
            CREATE TABLE IF NOT EXISTS groceries (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                price NUMERIC(10,2) NOT NULL,
                quantity INT NOT NULL
            );
        `);
        console.log("✅ Table 'groceries' is ready.");
        client.release(); // Release the connection

    } catch (err) {
        console.error("❌ Error setting up database:", err);
    }
})();

// Routes
app.get("/groceries", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM groceries");
        res.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a specific grocery item by ID
app.get("/groceries/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM groceries WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add new grocery item
app.post("/groceries", async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        await pool.query("INSERT INTO groceries (name, price, quantity) VALUES ($1, $2, $3)", [name, price, quantity]);
        res.json({ message: "Item added" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a grocery item
app.delete("/groceries/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM groceries WHERE id = $1", [id]);
        res.json({ message: "Item deleted" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
  
