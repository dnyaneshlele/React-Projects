import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingIndex, setEditingIndex] = useState(null); // To store the task being edited
  const [editedTask, setEditedTask] = useState(''); // To store the edited task text

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(data));
  }, [data]);

  const handleAddTask = () => {
    if (input.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }
    setData((values) => [...values, input]);
    setInput('');
  };

  const handleDeleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = data.filter((_, i) => i !== index);
      setData(updatedTasks);
    }
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditedTask(data[index]); // Set the current task to be edited
  };

  const handleSaveEditedTask = () => {
    if (editedTask.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }
    const updatedTasks = [...data];
    updatedTasks[editingIndex] = editedTask; // Replace the old task with the edited one
    setData(updatedTasks);
    setEditingIndex(null); // Reset the editing index
    setEditedTask('');
  };

  const backgroundImage = {
    position: 'relative',
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '20px',
    minHeight: '100vh',
    backgroundAttachment: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/Img/backimg.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    opacity: 0.2,
    zIndex: -1,
  };

  return (
    <div style={backgroundImage}>
      <div style={overlayStyle}></div>
      <h1 style={{ fontSize: 70, marginTop: 100, fontWeight: 'bold', color: 'green', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Todo Application
      </h1>

      <div style={{ marginTop: 40 }}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          customInput={(
            <input
              type="text"
              readOnly
              value={selectedDate.toLocaleDateString('en-GB')}
              style={{
                textAlign: 'center',
                padding: '10px',
                width: '200px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          )}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <input
          type="text"
          placeholder="Enter Task"
          style={{
            width: '80%',
            maxWidth: '400px',
            padding: '10px',
            marginTop: 40,
            borderRadius: '8px',
            border: '2px solid #007bff',
            fontSize: '16px',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
          value={editingIndex === null ? input : editedTask} // Show edited task if editing
          onChange={(text) => (editingIndex === null ? setInput(text.target.value) : setEditedTask(text.target.value))}
          autoFocus={true}
        />

        <div style={{ marginTop: 20 }}>
          <input
            type="button"
            onClick={editingIndex === null ? handleAddTask : handleSaveEditedTask}
            value={editingIndex === null ? 'Add Task' : 'Save Task'}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              borderWidth: 2,
              borderRadius: '50px',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '10px 20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
          gap: 20,
          width: '100%',
          maxWidth: '1000px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {data.map((c, index) => (
          <div
            key={index}
            style={{
              width: '80%',
              maxWidth: '400px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              transition: 'transform 0.2s ease, box-shadow 0.3s ease',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              minHeight: '100px',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            <h5 style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
              Task {index + 1}
            </h5>
            <p style={{ fontSize: '16px', color: '#333', lineHeight: '1.5', marginBottom: '15px', flexGrow: 1 }}>
              {c}
            </p>

            <i className="fa-solid fa-pen-to-square" 
              style={{
                color: 'blue',
                cursor: 'pointer',
                fontSize: '24px',
                position: 'absolute',
                top: '30px',
                right: '50px',
              }}
              onClick={() => handleEditTask(index)}
            ></i>

            <i className="fa-sharp fa-solid fa-trash-can"
              style={{
                color: '#ff4d4d',
                cursor: 'pointer',
                fontSize: '24px',
                position: 'absolute',
                top: '30px',
                right: '10px',
              }}
              onClick={() => handleDeleteTask(index)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
