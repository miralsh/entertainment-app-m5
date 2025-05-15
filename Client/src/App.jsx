
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/Login'
function App() {

  return (
   <div className='lg:flex bg-[#10141E] h-full max-h-full '>
      <div className='lg:flex  md:px-6  py-6 bg-[#10141E] w-full'>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
