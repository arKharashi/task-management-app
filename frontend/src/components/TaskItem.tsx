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
  return (
    <li>
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

          <button onClick={() => onSaveEdit(task._id)}>Save</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <strong>{task.title}</strong> - {task.priority} -{" "}
          {task.completed ? "Done" : "Pending"}
          {task.description && <p>{task.description}</p>}
          <button onClick={() => onToggleComplete(task)}>
            {task.completed ? "Mark Pending" : "Mark Done"}
          </button>
          <button onClick={() => onStartEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
export type { Task };
