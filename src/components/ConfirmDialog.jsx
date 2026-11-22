import { useEffect, useRef } from 'react'

export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  const cancelRef = useRef(null)

  useEffect(() => {
    cancelRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="overlay" onMouseDown={e => e.target === e.currentTarget && onCancel()}>
      <div className="dialog small" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title">Delete this task?</h2>
        <p>"{task.title}" will be removed. This can't be undone.</p>
        <div className="form-actions">
          <button ref={cancelRef} className="btn-secondary" onClick={onCancel}>Keep task</button>
          <button className="btn-danger" onClick={onConfirm}>Delete task</button>
        </div>
      </div>
    </div>
  )
}