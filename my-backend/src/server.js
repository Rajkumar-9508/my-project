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



import app from "./app.js";
// import cors from "cors";

const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: "http://localhost:3000", // replace with your frontend URL
//   credentials: true,
// }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
