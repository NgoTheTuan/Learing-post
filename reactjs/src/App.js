
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import About from './views/About'
import ProtectedRoute from './routing/ProtectedRoute';

import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'

function App() {
  return (

    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            {/* Xử lí chuyển hướng vào login khi path la: / */}
            <Route path="/" element={<Navigate replace to="/login" />} />

            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />

          </Routes>
        </Router>
      </PostContextProvider>

    </AuthContextProvider>

  )
}

export default App;
