import type { FormEvent } from "react";

type TaskFormProps = {
  title: string;
  description: string;
  priority: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setPriority: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function TaskForm({
  title,
  description,
  priority,
  setTitle,
  setDescription,
  setPriority,
  onSubmit,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <input
          type="text"
          placeholder="Optional description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="flex items-center justify-between">
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
