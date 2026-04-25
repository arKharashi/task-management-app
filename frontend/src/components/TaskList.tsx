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
    return <p>No tasks yet</p>;
  }

  return (
    <ul>
      {props.tasks.map((task) => (
        <TaskItem key={task._id} task={task} {...props} />
      ))}
    </ul>
  );
}

export default TaskList;
