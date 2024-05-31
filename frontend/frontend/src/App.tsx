import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Exercises from './components/Exercises';
import AddExercises from './components/AddExercises';
import Workouts from './components/Workouts';
import AddWorkouts from './components/AddWorkouts'
import Nutrition from './components/Nutrition';
import AddNutrition from './components/AddNutrition';



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
          <Route path="/exercises/add" element={<AddExercises />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition/add" element={<AddNutrition />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
