// const express = require("express");
// const axios = require("axios");
// // const fast2sms = require("fast-two-sms");
// const otpGenerator = require("otp-generator");

// const router = express.Router();
// const otpStore = {}; // Temporary storage (use Redis or DB in production)

// const FAST2SMS_API_KEY = "cvtVTHa0pYWzZKkuMGlCfFAL8wxBjIiqo1Pn5NSJ6QXs9ROh3E0W2a4uDSoqUghKCi9HTRLrAQ1dwJxE"; // Replace with your API Key

// router.post("/send-otp", async (req, res) => {
//   const { phone } = req.body;

//   // Validate phone number (must be 10 digits)
//   if (!/^\d{10}$/.test(phone)) {
//     return res.status(400).json({ success: false, message: "Invalid phone number" });
//   }

//   // Generate OTP (6-digit numeric)
//   const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

//   // Store OTP temporarily
//   otpStore[phone] = otp;

//   try {
//     // Send OTP via Fast2SMS API
//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "otp",
//         variables_values: otp,
//         numbers: phone,
//       },
//       {
//         headers: {
//           Authorization: "cvtVTHa0pYWzZKkuMGlCfFAL8wxBjIiqo1Pn5NSJ6QXs9ROh3E0W2a4uDSoqUghKCi9HTRLrAQ1dwJxE",
//         },
//       }
//     );

//     if (response.data.return) {
//       res.json({ success: true, message: "OTP sent successfully!" });
//     } else {
//       res.status(500).json({ success: false, message: "Failed to send OTP" });
//     }
//   } catch (error) {
//     console.error("SMS Error:", error);
//     res.status(500).json({ success: false, message: "Error sending OTP" });
//   }
// });

// router.post("/verify-otp", (req, res) => {
//   const { phone, otp } = req.body;

//   if (otpStore[phone] === otp) {
//     delete otpStore[phone]; // Remove OTP after verification
//     res.json({ success: true, message: "OTP verified successfully" });
//   } else {
//     res.status(400).json({ success: false, message: "Invalid OTP" });
//   }
// });

// module.exports = router;



const express = require("express");
const axios = require("axios");
const otpGenerator = require("otp-generator");

const router = express.Router();
const otpStore = {}; // Temporary storage (use Redis or DB in production)

const FAST2SMS_API_KEY = "cvtVTHa0pYWzZKkuMGlCfFAL8wxBjIiqo1Pn5NSJ6QXs9ROh3E0W2a4uDSoqUghKCi9HTRLrAQ1dwJxE"; // Replace with your API Key

/**
 * Send OTP to user's phone number
 * @route POST /send-otp
 * @param {string} phone - User's phone number
 * @returns {object} Success message or error
 */
router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  // Validate phone number (must be 10 digits)
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ success: false, message: "Invalid phone number" });
  }

  // Generate OTP (6-digit numeric)
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

  // Store OTP temporarily
  otpStore[phone] = otp;

  try {
    // Send OTP via Fast2SMS API
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "otp",
        variables_values: otp,
        numbers: phone,
      },
      {
        headers: {
          Authorization: FAST2SMS_API_KEY,
        },
      }
    );

    if (response.data.return) {
      res.json({ success: true, message: "OTP sent successfully!" });
    } else {
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
  } catch (error) {
    console.error("SMS Error:", error);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});

/**
 * Verify OTP sent to user's phone number
 * @route POST /verify-otp
 * @param {string} phone - User's phone number
 * @param {string} otp - OTP sent to user's phone number
 * @returns {object} Success message or error
 */
router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] === otp) {
    delete otpStore[phone]; // Remove OTP after verification
    res.json({ success: true, message: "OTP verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

module.exports = router;