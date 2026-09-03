
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/Login'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import TvSeriesDetail from './pages/TvSeriesDetail'
import Bookmark from './pages/Bookmark'
import Footer from './components/Footer'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import Tv from './pages/Tv'
import { get_recommended, get_trending_list } from '../redux/thunks/mediaThunks'
import { get_bookmark } from '../redux/thunks/bookmarkThunks'
function App() {
  const dispatch = useDispatch()
  //loading the home page data - trending, recommended and bookmarks if logged in
  useEffect(() => {
    dispatch(get_trending_list());
    dispatch(get_recommended());
    const userId = localStorage.getItem("user_id")
    const accessToken = localStorage.getItem("accesstoken")
    if (userId && accessToken) dispatch(get_bookmark(userId))
  }, [location.pathname])
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-[#0B0B0D] font-outfit font-light'>
          <Navbar />
          <main className='min-w-0 px-0 py-4 md:px-4 lg:px-6 lg:py-6'>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvseries" element={<Tv />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/movieDetails/:id' element={<MovieDetail/>}/>
            <Route path="/tvSeriesDetails/:id" element={<TvSeriesDetail/>}/>
            <Route path='/bookmarked' element={<Bookmark/>}/>
            </Routes>
            <Footer />
          </main>
      </div>
    </BrowserRouter>
  )
}

export default App
