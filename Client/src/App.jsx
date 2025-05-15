
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <div className='lg:flex bg-[#10141E] h-full max-h-full '>
      <div className='lg:flex  md:px-6  py-6 bg-[#10141E]'>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
