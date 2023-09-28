import './App.css'
import Home from './Components/Home'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import Assistance from './Pages/Assistance'
import Guidance from './Pages/Guidance'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/assistance' Component={Assistance} />
          <Route path='/guidance' Component={Guidance}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
