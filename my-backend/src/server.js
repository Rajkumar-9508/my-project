// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/index.js";

// dotenv.config();

// const app = express();
// app.use(express.json());


// // DB Connect
// connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running & DB connected 🚀");
// });

// export default app;



import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();
await connectDB();

const app = express();

// app.use(cors());
app.use(express.json());

// CORS (important: credentials enable)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url, "Origin:", req.headers.origin);
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// Sessions (JWT ke bina)
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "skillSync",
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // prod me true + HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.get("/", (req, res) => res.send("API running"));
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);

export default app;
