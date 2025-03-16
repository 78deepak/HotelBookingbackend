const express = require("express");
const Booking = require("../models/booking");
const AvailableRooms = require("../models/availableRooms");
const router = express.Router();

// Fetch Available Rooms
router.get("/availableRooms", async (req, res) => {
  try {
    const rooms = await AvailableRooms.findOne();
    if (!rooms) {
      await AvailableRooms.create({ ac: 5, nonAc: 5 }); // Initialize if not found
      return res.json({ ac: 5, nonAc: 5 });
    }
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available rooms" });
  }
});

// Book a Room
router.post("/", async (req, res) => {
  try {
    const { roomType, fromDate, toDate } = req.body;
    const roomKey = roomType === "AC" ? "ac" : "nonAc";

    const rooms = await AvailableRooms.findOne();
    if (!rooms || rooms[roomKey] <= 0) {
      return res.status(400).json({ error: "No rooms available!" });
    }

    // Decrease room count
    rooms[roomKey] -= 1;
    await rooms.save();

    // Save booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.status(201).json({ message: "Room booked successfully!" });

    // Release the room after the `toDate`
    setTimeout(async () => {
      rooms[roomKey] += 1;
      await rooms.save();
    }, new Date(toDate) - new Date()); // Release when the booking period ends
  } catch (error) {
    res.status(500).json({ error: "Failed to book room" });
  }
});



// router.post("/", async (req, res) => {
//     try {
//       const { name, phone, idProof, roomType, fromDate, toDate } = req.body;
  
//       // Save booking to database (Assume booking gets saved here)
//       const booking = {
//         id: new Date().getTime(), // Unique ID (use DB ID in real cases)
//         name,
//         phone,
//         idProof,
//         roomType,
//         fromDate,
//         toDate,
//         bookedAt: new Date().toISOString(),
//       };
  
//       res.json({ success: true, message: "Room booked successfully!", booking });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Booking failed!" });
//     }
//   });
  
module.exports = router;
