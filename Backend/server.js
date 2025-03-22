const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/payment");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Replace with your CloudFront URL or frontend URL
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(bodyParser.json());
app.use("/api/payment", paymentRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Mock Payment Gateway API is running!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
