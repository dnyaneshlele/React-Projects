import React, { useState } from 'react';

const TaskManager = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  
  const handleCreateOrUpdateTask = () => {
    if (title.trim() && description.trim()) {
      if (editingIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editingIndex ? { title, description } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, { title, description }]);
      }
      setTitle('');
      setDescription('');
    }
  };


  const handleEditTask = (index) => {
    setTitle(tasks[index].title);
    setDescription(tasks[index].description);
    setEditingIndex(index);
  };

  const handleDeleteTask = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Manager</h1>

      {/* Input Section */}
      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Title"
          style={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          style={styles.inputField}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleCreateOrUpdateTask}
          disabled={!title || !description}
          style={styles.button}
        >
          {editingIndex !== null ? 'Update' : 'Create'}
        </button>
      </div>

      {/* Task List */}
      <div style={styles.taskContainer}>
        {tasks.map((task, index) => (
          <div key={index} style={styles.taskCard}>
            <div>
              <strong style={styles.taskTitle}>{task.title}</strong>
              <p style={styles.taskDescription}>{task.description}</p>
            </div>
            <div style={styles.buttonRow}>
              <button style={styles.editButton} onClick={() => handleEditTask(index)}>✏️ Edit</button>
              <button style={styles.deleteButton} onClick={() => handleDeleteTask(index)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const styles = {
  container:
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: "url('./Img/Background.jpg')",
    backgroundSize: 'cover',
    padding: '20px'
  },

  heading: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
  },

  inputRow:
  {
    display: 'flex',
    gap: 15,
    width: '90%',
    maxWidth: 800,
    marginBottom: 20
  },

  inputField:
  {
    flex: 1,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: '2px solid #fff',
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },

  button:
  {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    transition: '0.3s',
    fontWeight: 'bold'
  },

  taskContainer:
  {
    width: '100%',
    maxWidth: 800,
    marginTop: 20
  },

  taskCard:
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },

  taskTitle:
  {
    fontSize: 18,
    color: '#007bff'
  },

  taskDescription:
  {
    ontSize: 14,
    color: '#333',
    marginTop: 5
  },

  buttonRow:
  {
    display: 'flex',
    gap: 10
  },

  editButton:
  {
    backgroundColor: '#ffc107',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold'
  },

  deleteButton:
  {
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold'
  }
};

export default TaskManager;
