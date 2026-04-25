import { CheckCircle2, Circle, Pencil, Trash2, X, Save } from "lucide-react";

type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: string;
};

type TaskItemProps = {
  task: Task;
  editingTaskId: string | null;
  editTitle: string;
  editDescription: string;
  editPriority: string;
  setEditTitle: (value: string) => void;
  setEditDescription: (value: string) => void;
  setEditPriority: (value: string) => void;
  onToggleComplete: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStartEdit: (task: Task) => void;
  onCancelEdit: () => void;
  onSaveEdit: (taskId: string) => void;
};

function TaskItem({
  task,
  editingTaskId,
  editTitle,
  editDescription,
  editPriority,
  setEditTitle,
  setEditDescription,
  setEditPriority,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
}: TaskItemProps) {
  const priorityStyle =
    task.priority === "high"
      ? "bg-red-50 text-red-700 border-red-100"
      : task.priority === "medium"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : "bg-emerald-50 text-emerald-700 border-emerald-100";

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {editingTaskId === task._id ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <input
            type="text"
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <div className="flex items-center justify-between gap-3">
            <select
              value={editPriority}
              onChange={(event) => setEditPriority(event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSaveEdit(task._id)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                <Save size={16} />
                Save
              </button>

              <button
                onClick={onCancelEdit}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onToggleComplete(task)}
                className={`transition ${
                  task.completed
                    ? "text-emerald-600 hover:text-emerald-700"
                    : "text-slate-400 hover:text-emerald-600"
                }`}
                aria-label="Toggle task completion"
              >
                {task.completed ? (
                  <CheckCircle2 size={21} />
                ) : (
                  <Circle size={21} />
                )}
              </button>

              <h3
                className={`text-lg font-medium ${
                  task.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-900"
                }`}
              >
                {task.title}
              </h3>

              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${priorityStyle}`}
              >
                {task.priority}
              </span>
            </div>

            {task.description && (
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {task.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartEdit(task)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Edit task"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => onDelete(task._id)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-700"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
export type { Task };
