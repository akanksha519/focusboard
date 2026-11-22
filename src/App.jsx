import useLocalStorage from './hooks/useLocalStorage'
import { sampleTasks, STATUS } from './data/sampleTasks'
import { ListTodo, Loader, CircleCheck, Percent } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'

export default function App() {
  const [tasks] = useLocalStorage('focusboard_tasks', sampleTasks)

  // Derived values: calculated from `tasks`, never stored
  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === STATUS.IN_PROGRESS).length
  const completed = tasks.filter(t => t.status === STATUS.COMPLETED).length
  const completion = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header onAdd={() => console.log('Add task clicked')} />

        <section aria-label="Overview" className="stats">
          <StatCard title="Total tasks" value={total} icon={ListTodo} />
          <StatCard title="In progress" value={inProgress} icon={Loader} />
          <StatCard title="Completed" value={completed} icon={CircleCheck} />
          <StatCard title="Completion" value={`${completion}%`} icon={Percent} />
        </section>

        <section aria-label="Focus Notes" className="placeholder">Carousel goes here</section>
        <section aria-label="Tasks" className="placeholder">
          Task list goes here ({tasks.length} tasks)
        </section>
      </main>
    </div>
  )
}