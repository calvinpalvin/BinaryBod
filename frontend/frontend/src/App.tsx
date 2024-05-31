import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Exercises from './components/Exercises';
import Workouts from './components/Workouts';
import AddWorkouts from './components/AddWorkouts'
import Nutrition from './components/Nutrition';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<p>Hello world!</p>} />
          <Route path="/dashboard" element={<Home />} />
          {/* <Route path="/account" element={<Home />} /> */}
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workout/add" element={<AddWorkouts />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/nutrition" element={<Nutrition />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
