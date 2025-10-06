import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Landing } from './routes/Landing'
import Login from './routes/Login'
import About from './routes/About'
import Credits from './routes/Credits'
import Dashboard from './routes/admin/Dashboard'
import Assessment from './routes/admin/Assessments'
import Announcement from './routes/admin/Announcements'
import Users from './routes/admin/Users'
import './App.css'
import { AuthContext } from './auth/AuthContext.jsx'
import Announcements from './routes/Announcements.jsx'

function App() {
  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/">
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="credits" element={<Credits />} />

        {/* Protected Admin Routes */}
        <Route path="admin">
          <Route index element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path="assessments" element={
            <RequireAuth>
              <Assessment />
            </RequireAuth>
          } />
          <Route path="announcements" element={
            <RequireAuth>
              <Announcement />
            </RequireAuth>
          } />
          <Route path="users" element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          } />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
