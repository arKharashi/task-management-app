import express from "express";
import { createTask, getTasks } from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);

export default router;
