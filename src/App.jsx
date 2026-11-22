import { useState } from 'react'
import TaskForm from './components/TaskForm'
import useLocalStorage from './hooks/useLocalStorage'
import { sampleTasks, STATUS } from './data/sampleTasks'
import FocusNotes from './components/FocusNotes'
import { ListTodo, Loader, CircleCheck, Percent } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)
  const [showForm, setShowForm] = useState(false)

  const addTask = data => {
  const newTask = { ...data, id: crypto.randomUUID(), category: 'General' }
  setTasks([newTask, ...tasks])
  setShowForm(false)
}

  // Derived values: calculated from `tasks`, never stored
  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === STATUS.IN_PROGRESS).length
  const completed = tasks.filter(t => t.status === STATUS.COMPLETED).length
  const completion = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header onAdd={() => setShowForm(true)} />
        <section aria-label="Overview" className="stats">
          <StatCard title="Total tasks" value={total} icon={ListTodo} />
          <StatCard title="In progress" value={inProgress} icon={Loader} />
          <StatCard title="Completed" value={completed} icon={CircleCheck} />
          <StatCard title="Completion" value={`${completion}%`} icon={Percent} />
        </section>

        <FocusNotes />
        <section aria-label="Tasks" className="placeholder">
          Task list goes here ({tasks.length} tasks)
        </section>
      </main>
      {showForm && <TaskForm onSave={addTask} onCancel={() => setShowForm(false)} />}
    </div>
  )
}