import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import axios from 'axios'


function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  

  const refreshList = () => {
    axios.get("http://localhost:8000/api/tasks/").then(res => setTasks(res.data)).catch(err => console.log(err))
  }

  const addTask = () => {
    if (taskInput.trim() !== '') {
        axios.post("http://localhost:8000/api/tasks/",{
          "title":taskInput,
          "completed":false
        }).catch(err => console.log(err)).then(refreshList).then(setTaskInput(""))
    }
  };

  const deleteTask = (taskId) => {
    axios.delete("http://localhost:8000/api/tasks/"+taskId+"/").then(refreshList).catch(err => console.log(err))
  };

  const toggleComplete = (taskId,title) => {
    axios.put("http://localhost:8000/api/tasks/"+taskId+"/",{
      "title":title,
      "completed":true
    }).then(refreshList).catch(err => console.log(err))
  };

  const startEdit = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditingTaskText(taskText);
  };

  const saveEdit = (taskId) => {
    axios.put("http://localhost:8000/api/tasks/"+taskId+"/",{
      "title":editingTaskText,
      "completed":false
    }).then(refreshList).catch(err => console.log(err))
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  useEffect(refreshList,[])

  return (
    <div className="App">
      <div className="todo-box">
        <h1>ToDo App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <span>{task.title}</span>
                  <div className="actions">
                    <FontAwesomeIcon icon={faCheck} onClick={() => toggleComplete(task.id,task.title)} />
                    <FontAwesomeIcon icon={faEdit} onClick={() => startEdit(task.id, task.text)} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(task.id)} />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
