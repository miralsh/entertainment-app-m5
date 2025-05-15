
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <div className='md:flex  bg-[#10141E] md:h-full md:max-h-full'>
      <div className='md:flex  md:px-6 py-6 bg-[#10141E]'>
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
