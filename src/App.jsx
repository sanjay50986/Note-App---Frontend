import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/SignUp'
import Login from './pages/Login/Login'

const routes = (
  <Router>
    <Routes>
      <Route path='dashboard' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signUp' element={<SignUp />} />
    </Routes>
  </Router>
)


const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
