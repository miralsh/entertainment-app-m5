
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup'
function App() {

  return (
    <div className='md:flex  bg-[#10141E] md:h-full md:max-h-full'>
      <div className='md:flex  md:px-6 py-6 bg-[#10141E] w-full h-full'>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
