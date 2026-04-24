import { Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middlewares/authMiddleware";

export async function createTask(req: AuthRequest, res: Response) {
  try {
    const { title, description, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      user: req.user.userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
