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

export async function getTasks(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const tasks = await Task.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateTask(req: AuthRequest, res: Response) {
  try {
    const { title, description, priority, completed } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        title,
        description,
        priority,
        completed,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
