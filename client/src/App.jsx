import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import PrivateRoute from './components/privateRoute';
import Problems from './components/problems'

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path = "/dashboard" element={<PrivateRoute element={Dashboard} />} />
            <Route path = "/problems" element={<PrivateRoute element={Problems} />} />
        </Routes>
      </Router>
  )
}

export default App
