import { useEffect, useState } from "react";
import api from "../services/api";
import { getErrorMessage } from "../utils/getErrorMessage";

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium");

  // ================= FETCH TASKS =================
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.tasks);
      } catch (error) {
        setError(getErrorMessage(error, "Failed to fetch tasks"));
      }
    }

    fetchTasks();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // ================= CREATE TASK =================
  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/tasks", {
        title,
        description,
        priority,
      });

      setTasks([response.data.task, ...tasks]);

      setTitle("");
      setDescription("");
      setPriority("medium");
    } catch (error) {
      setError(getErrorMessage(error, "Failed to create task"));
    }
  };

  // ================= TOGGLE COMPLETE =================
  const handleToggleComplete = async (task: Task) => {
    try {
      const response = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      setTasks(tasks.map((t) => (t._id === task._id ? response.data.task : t)));
    } catch (error) {
      setError(getErrorMessage(error, "Failed to update task"));
    }
  };

  // ================= DELETE TASK =================
  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError(getErrorMessage(error, "Failed to delete task"));
    }
  };

  // ================= START EDIT =================
  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
  };

  // ================= CANCEL EDIT =================
  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  // ================= SAVE EDIT =================
  const handleSaveEdit = async (taskId: string) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
      });

      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data.task : task))
      );

      setEditingTaskId(null);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to update task"));
    }
  };

  // ================= UI =================
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>

      {error && <p className="text-red-500">{error}</p>}

      {/* Create Task */}
      <form onSubmit={handleCreateTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {/* Tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <button onClick={() => handleSaveEdit(task._id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <span>{task.priority}</span>
                <span>{task.completed ? "Done" : "Pending"}</span>

                <button onClick={() => handleToggleComplete(task)}>
                  Toggle
                </button>
                <button onClick={() => handleStartEdit(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
