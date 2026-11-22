import TaskCard from './TaskCard'

export default function TaskList({ tasks, onStatusChange, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Click "New task" to add one.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}