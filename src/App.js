import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your custom styles

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 500);
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="todo-form">
        <h1 className="text-center mb-4">Todo Application</h1>
        <form onSubmit={handleSubmit} className={formSubmitted ? 'blur' : ''}>
          <div className="d-flex">
            <input
              type="text"
              value={taskInput}
              onChange={handleInputChange}
              placeholder="Add a task"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary ml-2">
              Add Task
            </button>
          </div>
        </form>
        <ul className="list-group mt-3">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
                className="mr-3"
              />
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="btn btn-danger btn-sm ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
