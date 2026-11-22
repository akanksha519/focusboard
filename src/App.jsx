import useLocalStorage from './hooks/useLocalStorage'
import { sampleTasks } from './data/sampleTasks'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

export default function App() {
  const [tasks] = useLocalStorage('focusboard_tasks', sampleTasks)

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header onAdd={() => console.log('Add task clicked')} />
        <section aria-label="Overview" className="placeholder">Stats cards go here</section>
        <section aria-label="Focus Notes" className="placeholder">Carousel goes here</section>
        <section aria-label="Tasks" className="placeholder">
          Task list goes here ({tasks.length} tasks)
        </section>
      </main>
    </div>
  )
}