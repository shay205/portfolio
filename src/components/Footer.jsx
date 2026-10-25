import { NAV, PROFILE } from '../data'

export default function Footer() {
  return (
    <footer>
      <div className="container foot">
        <p>&copy; {new Date().getFullYear()} {PROFILE.name}</p>
        <nav aria-label="Footer">
          <ul>
            {NAV.map(([label, id]) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ul>
        </nav>
        {PROFILE.github
          ? <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          : <span>GitHub (link pending)</span>}
      </div>
    </footer>
  )
}
