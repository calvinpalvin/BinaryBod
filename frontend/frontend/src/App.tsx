import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Exercises from './components/Exercises';
import AddExercises from './components/AddExercises';
import Workouts from './components/Workouts';
import AddWorkouts from './components/AddWorkouts'
import Nutrition from './components/Nutrition';
import AddNutrition from './components/AddNutrition';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';



const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
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
    </UserProvider>
  );
};

export default App;
