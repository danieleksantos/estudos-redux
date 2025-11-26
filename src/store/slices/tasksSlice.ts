import type { RootState } from '..'
import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

interface Task {
  id: number
  title: string
  completed: boolean
}

const tasksAdapter = createEntityAdapter<Task>()

const initialState = tasksAdapter.getInitialState

// const initialState: Task[] = [
//   { id: 1, title: 'Estudar Redux Toolkit', completed: false },
//   { id: 2, title: 'Estudar UX UI ', completed: false },
//   { id: 3, title: 'Estudar Lógica de Programação ', completed: false },
// ]

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     addTask: (state, action: PayloadAction<Task>) => {
//       state.push(action.payload)
//     },
//     removeTask: (state, action: PayloadAction<number>) => {
//       return state.filter((task) => task.id !== action.payload)
//     },
//     toggleTask: (state, action: PayloadAction<number>) => {
//       const task = state.find((t) => t.id === action.payload)
//       if (task) task.completed = !task.completed
//     },
//   },
// })

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    removeTask: tasksAdapter.removeOne,
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.entities[action.payload]
      if (task) task.completed = !task.completed
    },
  },
})

export const { selectAll: selectAllTasks } = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks,
)

export const { addTask, removeTask, toggleTask } = tasksSlice.actions

export default tasksSlice.reducer
