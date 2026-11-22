import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { focusNotes } from '../data/focusNotes'

const pad = n => String(n).padStart(2, '0')

export default function FocusNotes({ tasks, completion }) {
  const [index, setIndex] = useState(0)
  const total = focusNotes.length
  const note = focusNotes[index]
  const featured = tasks.find(t => t.status === note.cardStatus)

  const goPrev = () => setIndex(i => (i - 1 + total) % total)
  const goNext = () => setIndex(i => (i + 1) % total)

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Focus Notes">
      <div
        className="hero-slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${total}`}
        aria-live="polite"
      >
        <p className="hero-count">
          <span>Focus notes</span>
          <span>{pad(index + 1)} / {pad(total)}</span>
        </p>
        <h2>{note.title}</h2>
        <p className="hero-text">{note.text}</p>
      </div>

      <div className="hero-side">
        <div className="mini-card">
          <p className="mini-label">{note.cardLabel}</p>
          <p className="mini-title">{featured ? featured.title : 'No tasks here yet'}</p>
          <div className="mini-progress">
            <div className="mini-bar" role="progressbar" aria-label="Completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow={completion}>
              <span style={{ width: `${completion}%` }} />
            </div>
            <span>{completion}%</span>
          </div>
        </div>

        <div className="hero-buttons">
          <button className="round-btn" onClick={goPrev} aria-label="Previous note">
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button className="round-btn light" onClick={goNext} aria-label="Next note">
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="segments">
        {focusNotes.map((n, i) => (
          <button
            key={n.id}
            className={i === index ? 'segment active' : 'segment'}
            onClick={() => setIndex(i)}
            aria-label={`Go to note ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  )
}