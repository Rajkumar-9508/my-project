import { Router } from "express";
import { submitResult, myResults } from "../controllers/gameController.js";
import { requireAuth } from "../middleware/requireAuth.js";
const router = Router();

router.post("/submit", requireAuth, submitResult);
router.get("/my-results", requireAuth, myResults);

export default router;
