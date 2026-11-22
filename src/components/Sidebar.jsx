import { navItems } from '../data/navItems'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">FocusBoard</div>
      <nav aria-label="Main navigation">
        <ul>
          {navItems.map(({ label, icon: Icon }, index) => (
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