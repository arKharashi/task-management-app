import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { type Task } from "../components/TaskItem";
import api from "../services/api";
import { getErrorMessage } from "../utils/getErrorMessage";

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
        setError(getErrorMessage(error, "Failed to fetch tasks"));
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
      setError(getErrorMessage(error, "Failed to create task"));
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
      setError(getErrorMessage(error, "Failed to update task"));
    }
  }

  async function handleDeleteTask(taskId: string) {
    setError("");

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError(getErrorMessage(error, "Failed to delete task"));
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
      setError(getErrorMessage(error, "Failed to update task"));
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Task Management
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-600">
              Manage your tasks in one clean workspace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/arKharashi/task-management-app"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm"
            >
              <FaGithub size={18} />
            </a>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white/85 p-7 shadow-sm">
          <TaskForm
            title={title}
            description={description}
            priority={priority}
            setTitle={setTitle}
            setDescription={setDescription}
            setPriority={setPriority}
            onSubmit={handleCreateTask}
          />
        </div>

        <div className="mt-7">
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
      </div>
    </div>
  );
};

export default DashboardPage;
