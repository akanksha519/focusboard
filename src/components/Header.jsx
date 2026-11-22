import { Plus } from 'lucide-react'

export default function Header({ onAdd }) {
  return (
    <header className="header">
      <div>
        <h1>Dashboard</h1>
        <p className="subtitle">Your tasks at a glance</p>
      </div>
      <button className="btn-primary" onClick={onAdd}>
        <Plus size={18} aria-hidden="true" />
        Add task
      </button>
    </header>
  )
}