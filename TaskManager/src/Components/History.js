import React from 'react';

const HistoryScreen = () => {
  const tasksByDate = JSON.parse(localStorage.getItem('tasksByDate')) || {};

  return (
    <div>
      <h1>Task History</h1>
      {Object.keys(tasksByDate).map((date) => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {tasksByDate[date].map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HistoryScreen;
