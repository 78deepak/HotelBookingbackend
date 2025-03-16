const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
const express = require('express')


// const mongo_local = "mongodb://127.0.0.1:27017/auth";

mongoose.connect( process.env.MONGO_DB_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
})
    .then(() => {
        console.log('connected successfully');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });
