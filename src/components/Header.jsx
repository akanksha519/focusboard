import { Plus } from 'lucide-react'

export default function Header({ onAdd }) {
  return (
    <header className="header">
      <div>
        <h1>Your work, in focus.</h1>
        <p className="subtitle">Plan your day, stay organized, and celebrate small wins.</p>
      </div>
      <button className="btn-primary" onClick={onAdd}>
        <Plus size={18} aria-hidden="true" />
        New task
      </button>
    </header>
  )
}