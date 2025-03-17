// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require('./models/db');
// const booking = require('./models/booking')

// // Initialize Express app
// const app = express();
// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON

// // API Route to store booking data
// app.post("/api/bookings", async (req, res) => {
//   try {
//     const newBooking = new booking(req.body);
//     await newBooking.save();
//     res.status(201).json({ message: "Booking saved successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save booking" });
//   }
// });

// app.get('/', function (req, res) {
//     res.send('Hello World my name is deepak')
//     console.log("server started at port number  3000");
//   });

// // Start server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./models/db");
const bookingRoutes = require("./routes/bookingRoutes");
const otpRoutes = require("./routes/otpRoutes");

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Use Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/availableRooms", bookingRoutes);
// app.use("/api", otpRoutes);     

app.get("/", function (req, res) {
  res.send("Hello World, my name is Deepak");
  console.log("Server started at port number 8080");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
