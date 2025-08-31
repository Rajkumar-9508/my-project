// import express from "express";
// import cors from "cors";
// const app = express();
// app.use(
//     cors({
//         origin: process.env.CORS_ORIGIN,
//         credentials:true
//     })
// )
// //common middleware
// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended:true, limit:"16kb"}))
// app.use(express.static("public"))

// export default app;


require("dotenv").config();
const express = require("express");
const connectDB = require("./db/index");

const app = express();

// Middleware
app.use(express.json());

// DB Connect
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running & DB connected 🚀");
});

module.exports = app;
