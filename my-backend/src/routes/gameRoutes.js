// import { Router } from "express";
// import { submitResult, myResults } from "../controllers/gameController.js";
// import { requireAuth } from "../middleware/requireAuth.js";
// const router = Router();

// router.post("/submit", requireAuth, submitResult);
// router.get("/my-results", requireAuth, myResults);

// export default router;



import { Router } from "express";
import Player from "../models/User.js";
// import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/start", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const player = await Player.create({ name, userId: req.session.userId });
    res.status(201).json({ player });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
