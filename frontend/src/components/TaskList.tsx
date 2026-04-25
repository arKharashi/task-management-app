import TaskItem, { type Task } from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
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

function TaskList(props: TaskListProps) {
  if (props.tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
        <p className="text-sm font-medium text-slate-700">No tasks yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {props.tasks.map((task) => (
        <TaskItem key={task._id} task={task} {...props} />
      ))}
    </ul>
  );
}

export default TaskList;
