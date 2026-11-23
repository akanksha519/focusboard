import { useState } from 'react'
import { ListTodo, Loader, CircleCheck} from 'lucide-react'
import useLocalStorage from './hooks/useLocalStorage'
import { sampleTasks, STATUS, PRIORITIES } from './data/sampleTasks'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import FocusNotes from './components/FocusNotes'
import TaskList from './components/TaskList'
import SearchBar from './components/SearchBar'
import FilterTabs from './components/FilterTabs'
import TaskForm from './components/TaskForm'
import ConfirmDialog from './components/ConfirmDialog'
import BottomNav from './components/BottomNav'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)   // null = creating a new task
  const [taskToDelete, setTaskToDelete] = useState(null) // null = no dialog open
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

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
const query = search.trim().toLowerCase()
const visibleTasks = tasks.filter(
  t =>
    t.title.toLowerCase().includes(query) &&
    (statusFilter === 'All' || t.status === statusFilter) &&
    (priorityFilter === 'All' || t.priority === priorityFilter)
)
const filtersActive = query !== '' || statusFilter !== 'All' || priorityFilter !== 'All'

const resetFilters = () => {
  setSearch('')
  setStatusFilter('All')
  setPriorityFilter('All')
}
      return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header onAdd={openCreate} />

        <FocusNotes tasks={tasks} completion={completion} />

        <section aria-label="Overview" className="stats">
          <StatCard title="Total tasks" value={total} caption="Across all projects" icon={ListTodo} />
          <StatCard title="In progress" value={inProgress} caption="Keep the momentum" icon={Loader} />
          <StatCard title="Completed" value={completed} caption="Great work this week" icon={CircleCheck} />
        </section>

        <section aria-labelledby="tasks-heading" className="tasks-section">
          <h2 id="tasks-heading">My tasks</h2>
          <p className="subtitle">Manage and track everything in one place.</p>

          <div className="toolbar">
            <FilterTabs active={statusFilter} onChange={setStatusFilter} totalCount={total} />
            <SearchBar value={search} onChange={setSearch} />
            <select
              className="priority-select"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              aria-label="Filter by priority"
            >
              <option value="All">Priority: All</option>
              {PRIORITIES.map(p => <option key={p} value={p}>Priority: {p}</option>)}
            </select>
            {filtersActive && (
              <button className="btn-secondary" onClick={resetFilters}>Clear filters</button>
            )}
          </div>

          <TaskList
            tasks={visibleTasks}
            emptyMessage={
              tasks.length === 0
                ? 'No tasks yet. Click "New task" to add one.'
                : 'No tasks match your search or filters.'
            }
            onStatusChange={changeStatus}
            onEdit={openEdit}
            onDelete={setTaskToDelete}
          />
        </section>
      </main>
      <BottomNav />

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
