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


import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();
app.use(express.json());

// DB Connect
connectDB();

app.get("/", (req, res) => {
  res.send("API is running & DB connected 🚀");
});

export default app;
