import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addTask,
  removeTask,
  selectAllTasks,
  toggleTask,
} from '../store/slices/tasksSlice'

import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Checkbox,
  Paper,
  Stack,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddTaskIcon from '@mui/icons-material/AddTask'

export function TaskList() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectAllTasks)
  const [taskTitle, setTaskTitle] = useState('')

  function handleAddTask() {
    if (!taskTitle.trim()) return

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    }

    dispatch(addTask(newTask))
    setTaskTitle('')
  }

  function handleRemoveTask(id: number) {
    dispatch(removeTask(id))
  }

  function handleToggle(id: number) {
    dispatch(toggleTask(id))
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Tarefas
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Nova tarefa"
          variant="outlined"
          size="small"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button
          variant="contained"
          onClick={handleAddTask}
          startIcon={<AddTaskIcon />}
          sx={{ px: 3 }}
        >
          Adicionar
        </Button>
      </Stack>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveTask(task.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={task.title}
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary',
              }}
            />
          </ListItem>
        ))}
        {tasks.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center">
            Nenhuma tarefa adicionada ainda.
          </Typography>
        )}
      </List>
    </Paper>
  )
}
