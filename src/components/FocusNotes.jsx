import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { focusNotes } from '../data/focusNotes'

export default function FocusNotes() {
  const [index, setIndex] = useState(0)
  const total = focusNotes.length
  const note = focusNotes[index]

  const goPrev = () => setIndex(i => (i - 1 + total) % total)
  const goNext = () => setIndex(i => (i + 1) % total)

  return (
    <section className="carousel" aria-roledescription="carousel" aria-label="Focus Notes">
      <div
        className="slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${total}`}
        aria-live="polite"
      >
        <p className="slide-count">Focus Notes · {index + 1} of {total}</p>
        <h2>{note.title}</h2>
        <p>{note.text}</p>
      </div>

      <div className="carousel-controls">
        <button className="icon-btn" onClick={goPrev} aria-label="Previous note">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <div className="dots">
          {focusNotes.map((n, i) => (
            <button
              key={n.id}
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => setIndex(i)}
              aria-label={`Go to note ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>

        <button className="icon-btn" onClick={goNext} aria-label="Next note">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}