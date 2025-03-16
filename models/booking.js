const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    idProof: String,
    roomType: String,
    fromDate: String,
    toDate: String
  });
  

  
const  BookingModel = mongoose.model('booking', bookingSchema);
module.exports = BookingModel;