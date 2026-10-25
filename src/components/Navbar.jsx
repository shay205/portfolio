import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV, PROFILE } from '../data'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="nav">
      <nav className="container nav-in" aria-label="Main">
        <a className="logo" href="#home">{PROFILE.name}</a>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <ul id="menu" className={open ? 'open' : ''}>
          {NAV.map(([label, id]) => (
            <li key={id}>
              <a className="link" href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
