import { navItems } from '../data/navItems'

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      <ul>
        {navItems.map(({ label, icon: Icon }, index) => (
          <li key={label}>
            <a
              href="#"
              className={index === 0 ? 'bottom-link active' : 'bottom-link'}
              aria-current={index === 0 ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}