import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <Search size={16} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Find a task..."
        aria-label="Search tasks by title"
      />
    </div>
  )
}