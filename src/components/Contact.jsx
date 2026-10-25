import { useState } from 'react'
import { Mail } from 'lucide-react'
import { PROFILE } from '../data'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name.'
  if (!EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address.'
  if (v.subject.trim().length < 3) e.subject = 'Enter a subject.'
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters.'
  return e
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="err" id={`${id}-err`}>{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('')
      return
    }
    // No backend yet: open the visitor's email app with the message filled in.
    const body = `${values.message}\n\nFrom: ${values.name} (${values.email})`
    window.location.href =
      `mailto:${PROFILE.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
    setStatus('Your email app should open with the message ready. Nothing is sent until you press send there.')
  }

  const props = (id) => ({
    id, name: id, value: values[id], onChange,
    'aria-invalid': errors[id] ? 'true' : 'false',
    'aria-describedby': errors[id] ? `${id}-err` : undefined,
  })

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title">Contact</h2>
        <p className="lead">Have a project or an opportunity in mind? Send me a message.</p>
        <div className="contact-grid">
          <ul className="info">
            <li><Mail size={16} aria-hidden="true" /> <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
            <li>Phone: <a href={`tel:${PROFILE.phoneHref}`}>{PROFILE.phone}</a></li>
            <li>
              GitHub:{' '}
              {PROFILE.github
                ? <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">{PROFILE.github}</a>
                : <span className="note">link pending</span>}
            </li>
            <li>
              LinkedIn:{' '}
              {PROFILE.linkedin
                ? <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">{PROFILE.linkedin}</a>
                : <span className="note">link pending</span>}
            </li>
          </ul>

          <form onSubmit={onSubmit} noValidate>
            <Field id="name" label="Name" error={errors.name}>
              <input type="text" autoComplete="name" {...props('name')} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input type="email" autoComplete="email" {...props('email')} />
            </Field>
            <Field id="subject" label="Subject" error={errors.subject}>
              <input type="text" {...props('subject')} />
            </Field>
            <Field id="message" label="Message" error={errors.message}>
              <textarea rows="5" {...props('message')} />
            </Field>
            <div><button type="submit" className="btn primary">Send message</button></div>
            <p className="note" role="status">{status}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
