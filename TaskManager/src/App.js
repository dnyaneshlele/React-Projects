import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todocomponent from './Components/Todocomponent';
import History from './Components/History'; // Import History component


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todocomponent />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}
