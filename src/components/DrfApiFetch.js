import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({id: '', title: ''})
  const [id, setId] = useState(1);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/',{
      headers: {
        'Authorization': 'Token 73517a8e6fc513a1e151ae8ef4dd0a3cb1c4aa00'
      }
    })
    .then(res => {
      setTasks(res.data);  
    })
  },[])

  const getTask = () => {
    axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`,{
      headers: {
        'Authorization': 'Token 73517a8e6fc513a1e151ae8ef4dd0a3cb1c4aa00'
      }
    })
    .then(res => {setSelectedTask(res.data)})
  }

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`,{
      headers: {
        'Authorization': 'Token 73517a8e6fc513a1e151ae8ef4dd0a3cb1c4aa00'
      }
    })
    .then(res => {
      setTasks(tasks.filter(task => task.id !== id));
      setSelectedTask([]);
    })
  }

  const newTask = (task) => {
    const data = {
      title: task.title
    }

    axios.post(`http://127.0.0.1:8000/api/tasks/`,data,{
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Token 73517a8e6fc513a1e151ae8ef4dd0a3cb1c4aa00'
      }
    })
    .then(res => {
      setTasks([...tasks, res.data])
      setEditedTask({id: '', title: ''})
    })
  }

  const editTask = (task) => {
    axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`,task,{
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Token 73517a8e6fc513a1e151ae8ef4dd0a3cb1c4aa00'
      }
    })
    .then(res => {
      setTasks(tasks.map(task => (task.id === editedTask.id ? res.data : task)))
      setEditedTask({id: '', title: ''})
    })
  }

  const handleInputChange = () => env => {
    const value = env.target.value;
    const name = env.target.name;
    setEditedTask({...editedTask, [name]: value})
  }

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} {task.id}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt" />
            </button>
            <button onClick={() => setEditedTask(task)}>
              <i className="fas fa-pen" />
            </button>
          </li>
        ))}
      </ul>

      Set id <br />
      <input type='text' value={id} onChange={env=>{setId(env.target.value)}} />
      <br />
      <button type='button' onClick={() => getTask()}>Get task</button>
      {/* <button type='button' onClick={() => deleteTask()}>Delete</button> */}

      <h3>{selectedTask.title} {selectedTask.id}</h3>

      <input 
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder="New task ?"
        required
      />
      {editedTask.id ? 
        <button onClick={() => editTask(editedTask)}>Update</button> :
        <button onClick={() => newTask(editedTask)}>Create</button>
      }
    </div>
  );
};

export default DrfApiFetch;
