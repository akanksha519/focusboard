import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { STATUSES, PRIORITIES } from '../data/sampleTasks'

const emptyForm = { title: '', description: '', status: 'To do', priority: 'Medium', dueDate: '' }

export default function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState(task ?? emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const title = form.title.trim()
    if (!title) {
      setError('Please enter a task title.')
      return
    }
    onSave({ ...form, title, description: form.description.trim() })
  }

  return (
    <div className="overlay" onMouseDown={e => e.target === e.currentTarget && onCancel()}>
      <form className="dialog" role="dialog" aria-modal="true" aria-labelledby="form-title" onSubmit={handleSubmit} noValidate>
        <div className="dialog-head">
          <div>
            <h2 id="form-title">{task ? 'Edit task' : 'Create new task'}</h2>
            <p className="subtitle">Add your task details to stay on top of your work.</p>
          </div>
          <button type="button" className="icon-btn" onClick={onCancel} aria-label="Close form">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <label>
          Task title *
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Update pricing page"
            autoFocus
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'title-error' : undefined}
          />
          {error && <span id="title-error" className="error" role="alert">{error}</span>}
        </label>

        <label>
          Description
          <textarea name="description" rows="3" value={form.description} onChange={handleChange} placeholder="Add notes about this task..." />
        </label>

        <div className="form-row">
          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label>
            Priority
            <select name="priority" value={form.priority} onChange={handleChange}>
              {PRIORITIES.map(p => <option key={p}>{p}</option>)}
            </select>
          </label>
        </div>

        <label>
          Due date
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </label>

        <p className="subtitle">* Required field</p>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">{task ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </div>
  )
}