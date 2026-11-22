import { useState } from 'react'
import { ListTodo, Loader, CircleCheck, Percent } from 'lucide-react'
import useLocalStorage from './hooks/useLocalStorage'
import { sampleTasks, STATUS } from './data/sampleTasks'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import FocusNotes from './components/FocusNotes'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import ConfirmDialog from './components/ConfirmDialog'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)   // null = creating a new task
  const [taskToDelete, setTaskToDelete] = useState(null) // null = no dialog open

  // Derived values: calculated from `tasks`, never stored
  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === STATUS.IN_PROGRESS).length
  const completed = tasks.filter(t => t.status === STATUS.COMPLETED).length
  const completion = total === 0 ? 0 : Math.round((completed / total) * 100)

  const openCreate = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const openEdit = task => {
    setEditingTask(task)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  const saveTask = data => {
    if (editingTask) {
      setTasks(tasks.map(t => (t.id === editingTask.id ? { ...t, ...data, id: t.id } : t)))
    } else {
      setTasks([{ ...data, id: crypto.randomUUID(), category: 'General' }, ...tasks])
    }
    closeForm()
  }

  const changeStatus = (id, status) =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)))

  const confirmDelete = () => {
    setTasks(tasks.filter(t => t.id !== taskToDelete.id))
    setTaskToDelete(null)
  }

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header onAdd={openCreate} />

        <section aria-label="Overview" className="stats">
          <StatCard title="Total tasks" value={total} icon={ListTodo} />
          <StatCard title="In progress" value={inProgress} icon={Loader} />
          <StatCard title="Completed" value={completed} icon={CircleCheck} />
          <StatCard title="Completion" value={`${completion}%`} icon={Percent} />
        </section>

        <FocusNotes />

        <section aria-labelledby="tasks-heading" className="tasks-section">
          <h2 id="tasks-heading">My tasks</h2>
          <p className="subtitle">Manage and track everything in one place.</p>
          <TaskList
            tasks={tasks}
            onStatusChange={changeStatus}
            onEdit={openEdit}
            onDelete={setTaskToDelete}
          />
        </section>
      </main>

      {showForm && <TaskForm task={editingTask} onSave={saveTask} onCancel={closeForm} />}
      {taskToDelete && (
        <ConfirmDialog
          task={taskToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  )
}