import { Calendar, Check } from 'lucide-react'
import { STATUS, STATUSES } from '../data/sampleTasks'

const formatDate = iso =>
  iso ? new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''

export default function TaskCard({ task, onStatusChange }) {
  const done = task.status === STATUS.COMPLETED

  return (
    <li className={done ? 'task done' : 'task'}>
      <button
        className={done ? 'check checked' : 'check'}
        onClick={() => onStatusChange(task.id, done ? STATUS.TODO : STATUS.COMPLETED)}
        aria-label={`Mark "${task.title}" as completed`}
        aria-pressed={done}
      >
        {done && <Check size={16} aria-hidden="true" />}
      </button>

      <div className="task-main">
        <h3>{task.title}</h3>
        {task.description && <p className="subtitle">{task.description}</p>}
      </div>

      <div className="task-meta">
        <span className="badge badge-category">{task.category}</span>
        <span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span>
        {task.dueDate && (
          <span className="due">
            <Calendar size={14} aria-hidden="true" />
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      <select
        className="status-select"
        value={task.status}
        onChange={e => onStatusChange(task.id, e.target.value)}
        aria-label={`Status for ${task.title}`}
      >
        {STATUSES.map(s => <option key={s}>{s}</option>)}
      </select>
    </li>
  )
}