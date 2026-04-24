import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
} from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);

export default router;
