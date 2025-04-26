import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import SearchBar from './components/SearchBar';
import MediaResults from './components/MediaResults';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  const [results, setResults] = useState([]);

  return (
    <Router>
      <div className="App">
        {/* Navbar always shown */}
        <Navbar />

        <main className="container py-4">
          <Routes>
            {/* Redirect base path to login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected route */}
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <>
                    <h2 className="text-center mb-4">Openverse Media Search</h2>
                    <SearchBar setResults={setResults} />
                    <MediaResults results={results} />
                  </>
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
