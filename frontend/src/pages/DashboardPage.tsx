import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: string;
};

const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.tasks);
      } catch (error) {
        setError("Failed to fetch tasks");
      }
    }

    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {error && <p>{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> - {task.priority} -{" "}
              {task.completed ? "Done" : "Pending"}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
