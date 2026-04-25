import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { type Task } from "../components/TaskItem";
import api from "../services/api";

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

      <button onClick={handleLogout}>Logout</button>

      {error && <p>{error}</p>}

      <TaskForm
        title={title}
        description={description}
        priority={priority}
        setTitle={setTitle}
        setDescription={setDescription}
        setPriority={setPriority}
        onSubmit={handleCreateTask}
      />

      <TaskList
        tasks={tasks}
        editingTaskId={editingTaskId}
        editTitle={editTitle}
        editDescription={editDescription}
        editPriority={editPriority}
        setEditTitle={setEditTitle}
        setEditDescription={setEditDescription}
        setEditPriority={setEditPriority}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
        onStartEdit={handleStartEdit}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default DashboardPage;
