import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { PHRASES } from '../data'

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const onChange = (e) => setReduced(e.matches)
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Types each character, pauses, erases, then moves to the next phrase.
function useTyping(phrases, reduced) {
  const [text, setText] = useState(reduced ? phrases[0] : '')

  useEffect(() => {
    let i = 0
    if (reduced) {
      setText(phrases[0])
      const id = setInterval(() => {
        i = (i + 1) % phrases.length
        setText(phrases[i])
      }, 3000)
      return () => clearInterval(id)
    }

    let n = 0
    let deleting = false
    let timer
    const tick = () => {
      const word = phrases[i]
      if (!deleting) {
        n += 1
        setText(word.slice(0, n))
        if (n === word.length) {
          deleting = true
          timer = setTimeout(tick, 1600) // pause on the full phrase
          return
        }
        timer = setTimeout(tick, 85)
      } else {
        n -= 1
        setText(word.slice(0, n))
        if (n === 0) {
          deleting = false
          i = (i + 1) % phrases.length
          timer = setTimeout(tick, 350)
          return
        }
        timer = setTimeout(tick, 45)
      }
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [phrases, reduced])

  return text
}

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const text = useTyping(PHRASES, reduced)

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-in">
        <h1 id="hero-title">Hi, I'm Sheila.</h1>
        <p className="role">
          <span className="sr-only">{PHRASES.join(', ')}</span>
          <span aria-hidden="true">{text}</span>
          {!reduced && <span className="cursor" aria-hidden="true" />}
        </p>
        <p className="intro">
          I'm Sheila Chepkorir, a computing student at Karatina University and an aspiring software
          developer. I enjoy building practical web projects and learning how software, data and
          security fit together.
        </p>
        <div className="actions">
          <a className="btn primary" href="#projects">
            View projects <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn" href="#contact">Contact me</a>
        </div>
      </div>
    </section>
  )
}
