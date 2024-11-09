import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/home-component'
import Register from './components/register/register-component'
import Login from './components/login/login-component'
import { Box } from '@chakra-ui/react'
import ResetPasswordForm from './components/reset-password/reset-password-component'
import ProtectedRoute from './components/protected-routes/protected-routes-component'
import { PageNotFound } from './components/error/error-component'
import MaintainBooks from './components/maintain-books/maintain-books-component'
import Navbar from './components/navbar/navbar-component'
import About from './components/about/about-component'

function App() {
  return (
    <Box minH={'100vh'} minW={'100vw'} bgGradient={'linear(to-b, #91ff8f, #6DD5FA, #2980B9)'}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route
          path="/maintain-books"
          element={
            <ProtectedRoute>
              <MaintainBooks />
            </ProtectedRoute>
          }
        />
        <Route path = "/about" element = {<About></About>}/>
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  )
}

export default App
