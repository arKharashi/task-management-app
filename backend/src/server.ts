import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Backend is running" });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
  });
};

startServer();
