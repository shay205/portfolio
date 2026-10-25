import { SKILLS } from '../data'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title">
      <div className="container">
        <h2 id="skills-title">Skills</h2>
        <p className="lead">Technologies I use and am building experience with.</p>
        <ul className="grid skills">
          {SKILLS.map((s) => (
            <li key={s.name} className="card">
              <h3>{s.name}</h3>
              <p className="tag">{s.type}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
