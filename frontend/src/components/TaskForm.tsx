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
    <form onSubmit={onSubmit}>
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
  );
}

export default TaskForm;
