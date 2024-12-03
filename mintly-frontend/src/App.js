import React from 'react';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Router>
      <nav className="w-full bg-blue-600 py-4">
        <div className="container mx-auto flex justify-center space-x-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-100 font-semibold bg-blue-500 px-4 py-2 rounded-md'
                : 'text-white font-semibold hover:bg-blue-500 px-4 py-2 rounded-md hover:text-blue-100'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-100 font-semibold bg-blue-500 px-4 py-2 rounded-md'
                : 'text-white font-semibold hover:bg-blue-500 px-4 py-2 rounded-md hover:text-blue-100'
            }
          >
            Add Expense
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-100 font-semibold bg-blue-500 px-4 py-2 rounded-md'
                : 'text-white font-semibold hover:bg-blue-500 px-4 py-2 rounded-md hover:text-blue-100'
            }
          >
            History
          </NavLink>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
