import { LayoutDashboard, ListTodo, Calendar, BarChart3, Settings } from 'lucide-react'

const items = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Tasks', icon: ListTodo },
  { label: 'Calendar', icon: Calendar },
  { label: 'Reports', icon: BarChart3 },
  { label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">FocusBoard</div>
      <nav aria-label="Main navigation">
        <ul>
          {items.map(({ label, icon: Icon }, index) => (
            <li key={label}>
              <a
                href="#"
                className={index === 0 ? 'nav-link active' : 'nav-link'}
                aria-current={index === 0 ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}