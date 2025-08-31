// import dotenv from "dotenv";
// import app from "./app.js";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Hello Backend is running 🚀");
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port http://localhost:${PORT}`);
// });



const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
