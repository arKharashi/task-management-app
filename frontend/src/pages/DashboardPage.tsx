import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: string;
};

const DashboardPage = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium");

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
    navigate("/");
  };

  async function handleCreateTask(event: FormEvent<HTMLFormElement>) {
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
      setError("Failed to create task");
    }
  }

  async function handleToggleComplete(task: Task) {
    setError("");

    try {
      const response = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      setTasks(
        tasks.map((currentTask) =>
          currentTask._id === task._id ? response.data.task : currentTask
        )
      );
    } catch (error) {
      setError("Failed to update task");
    }
  }

  async function handleDeleteTask(taskId: string) {
    setError("");

    try {
      await api.delete(`/tasks/${taskId}`);

      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError("Failed to delete task");
    }
  }

  function handleStartEdit(task: Task) {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
  }

  function handleCancelEdit() {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
  }

  async function handleSaveEdit(taskId: string) {
    setError("");

    try {
      const response = await api.put(`/tasks/${taskId}`, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
      });

      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data.task : task))
      );

      handleCancelEdit();
    } catch (error) {
      setError("Failed to update task");
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleCreateTask}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {editingTaskId === task._id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                  />

                  <input
                    type="text"
                    value={editDescription}
                    onChange={(event) => setEditDescription(event.target.value)}
                  />

                  <select
                    value={editPriority}
                    onChange={(event) => setEditPriority(event.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <button onClick={() => handleSaveEdit(task._id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{task.title}</strong> - {task.priority} -{" "}
                  {task.completed ? "Done" : "Pending"}
                  {task.description && <p>{task.description}</p>}
                  <button onClick={() => handleToggleComplete(task)}>
                    {task.completed ? "Mark Pending" : "Mark Done"}
                  </button>
                  <button onClick={() => handleStartEdit(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
