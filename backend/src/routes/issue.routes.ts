import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  updateStatus,
  stats,
} from "../controllers/issue.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

// Create issue
router.post("/", create);

// Get all issues
router.get("/", getAll);

// Get stats
router.get("/stats", stats);

// Get single issue
router.get("/:id", getOne);

// Update issue
router.put("/:id", update);

// Update status
router.patch("/:id/status", updateStatus);

export default router;