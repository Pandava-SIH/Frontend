import './App.css'
import Home from './Components/Home'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import Assistance from './Pages/Assistance'
import Guidance from './Pages/Guidance'
import Generator from './Pages/Generator'
import { useState } from 'react'
import Playground from './Pages/Playground'
import Header from "./Components/Header";

function App() {
  const [api, setApi] = useState("");
  return (
    <>
      <div className="head-container">
        <Header />
      </div>
      <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/assistance' Component={Assistance} />
          <Route path='/guidance' Component={Guidance}/>
          <Route path='/generation' element={<Generator callback={setApi}/>}/>
          <Route path='/playground' element={<Playground format={api}/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
