import './App.css'
import Home from './Components/Home'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import Assistance from './Pages/Assistance'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/assistance' Component={Assistance} />
        </Routes>
      </Router>
    </>
  )
}

export default App
