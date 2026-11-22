import useLocalStorage from './hooks/useLocalStorage'
import { sampleTasks } from './data/sampleTasks'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)

  return (
    <div>
      <h1>FocusBoard</h1>
      <p>{tasks.length} tasks</p>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title} ({t.status})
            <button onClick={() => setTasks(tasks.filter(x => x.id !== t.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}