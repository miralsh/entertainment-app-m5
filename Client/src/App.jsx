
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
    dispatch(get_bookmark(localStorage.getItem("user_id")))
  }, [location.pathname])
  return (
    <div className='lg:flex bg-[#10141E] min-h-screen font-outfit font-light'>
      <div className='lg:flex  md:px-6  py-6 bg-[#10141E] w-full font-outfit font-light'>

        <BrowserRouter>
          <Navbar />
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
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
