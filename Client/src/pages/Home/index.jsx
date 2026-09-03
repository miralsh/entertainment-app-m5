import { LuSearch } from "react-icons/lu";
import Trending from "../../components/Trending";
import Recommended from "../../components/Recommended";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { LuX } from "react-icons/lu";
import { img_url } from '../../../constants';
import { RiBookmarkFill, RiBookmarkLine, RiFilmFill } from 'react-icons/ri';
import { TbDeviceTvOld } from 'react-icons/tb';
//import { add_to_bookmark, delete_bookmark, get_bookmark, get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_tv_cast, get_tvseriesDetail } from '../../../redux/action';
import { getYear } from '../../helper';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_tv_cast, get_tvseriesDetail } from "../../../redux/thunks/mediaThunks";
import { add_to_bookmark, delete_bookmark, get_bookmark } from "../../../redux/thunks/bookmarkThunks";
import { setActive } from "../../../redux/slices/uiSlice";
import { clearMediaSearchList, searchAll } from "../../../redux/slices/mediaSlice";
export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const certificationMap = useSelector(state => state.media.certificationMap)
  const tv_cert = useSelector(state => state.media.tv_cert)
  const bkmark = useSelector(state => state.bookmark.bookmark)
  const added = useSelector(state => state.bookmark.added)
  const delete_bkmark = useSelector(state => state.bookmark.delete_bookmark)
  const [bookmarkTriggeredHere, setBookmarkTriggeredHere] = useState(false);
  const [val, setVal] = useState('')
  const debounceTimer = useRef()
  const searchResults = useSelector(state => state.media.search_all)
  const toast = useToast()

  // fetching the certifications of bookmarked TV Series and movies
  useEffect(() => {
    const uniqueIdsToFetch = [];
    const uniqueIdsToFetchTv = [];
    searchResults.forEach((element) => {
      if (element.media_type === 'movie') {
        // check if the certification is present for a movie id 
        if (!certificationMap[element.id]) {
          uniqueIdsToFetch.push(element.id);
        }
      } else {
        // check if the certification is present for a tv series id 
        if (!tv_cert[element.id]) {
          uniqueIdsToFetchTv.push(element.id);
        }
      }
    });
    if (uniqueIdsToFetch.length > 0) {
      uniqueIdsToFetch.forEach((id) => {
        dispatch(get_certification_movie(id));
      });
    }
    if (uniqueIdsToFetchTv.length > 0) {
      uniqueIdsToFetchTv.forEach((id) => {
        dispatch(get_certification_tv(id));
      });
    }
  }, [searchResults]);
  const [bookmark, setBookMark] = useState([])
  useEffect(() => {
    if (!bookmarkTriggeredHere || added === undefined) return;

    if (added != undefined) {
      if (added.message == "created") {
        // call get bookmark to reflect the added bookmark 
        dispatch(get_bookmark(localStorage.getItem("user_id")))
        //show a toast message
        toast({
          title: 'Success',
          description: `${added.bookmark ? added.bookmark.title ? added.bookmark.title : added.bookmark.name : ''} added to bookmark successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        //show a toast on error
        if (added.error != undefined) {
          toast({
            title: 'Error',
            description: added.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }
    }
    setBookmarkTriggeredHere(false);
  }, [added])
  useEffect(() => {
    if (!bookmarkTriggeredHere || delete_bkmark === undefined) return;

    if (delete_bkmark != undefined) {
      if ("id" in delete_bkmark) {
        // call get bookmark to reflect the status of deleted bookmark
        dispatch(get_bookmark(localStorage.getItem("user_id")))
        toast({
          title: 'Success',
          description: `${delete_bkmark ? delete_bkmark.title ? delete_bkmark.title : delete_bkmark.name : ''} removed from bookmark successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        if (added.error != undefined) {
          toast({
            title: 'Error',
            description: added.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }
    }
    setBookmarkTriggeredHere(false);
  }, [delete_bkmark])
  const onBookMark = (val) => {
    // on bookmark click
    if (localStorage.getItem("accesstoken") != null) {
      setBookmarkTriggeredHere(true);
      // bookmark present then delete or add bookmark
      bookmark.find(e => e.id == val.id) ? (dispatch(delete_bookmark({id:val.id, user_id:localStorage.getItem("user_id")}))) :
        (dispatch(add_to_bookmark({ ...val, user_id: localStorage.getItem("user_id") })))
    } else {
      dispatch(setActive(''))
      navigate("/login")
      toast({
        description: 'Please login to continue',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  useEffect(() => { setBookMark(bkmark) }, [bkmark])
  const onSelect = (id, media_type) => {
    // on item click go to detail page
    if (media_type == "movie") {
      dispatch(get_movieDetail(id))
      dispatch(get_movie_cast(id))
      dispatch(setActive(''))
      navigate(`/movieDetails/${id}`)
    } else {
      dispatch(get_tvseriesDetail(id))
      dispatch(get_tv_cast(id))
      dispatch(setActive(''))
      navigate(`/tvSeriesDetails/${id}`)
    }
  }

  //on search 
  const search = (e) => {
    setVal(e.target.value)
    clearTimeout(debounceTimer.current);
    // debouncing to limit the search query and improve performance
    debounceTimer.current = setTimeout(() => {
      dispatch(searchAll(e.target.value))
    }, 500);
  }

  //clear search list on page mount
  useEffect(() => {
    dispatch(clearMediaSearchList())
  }, [])

  //clear search list on empty input
  useEffect(() => {
    if (val == '') {
      dispatch(clearMediaSearchList())
    }
  }, [val])
  useEffect(() => () => clearTimeout(debounceTimer.current), [])
  return (
    < div className="mx-auto w-full max-w-[1600px] overflow-x-hidden scrollbar-hide px-4 sm:px-5 lg:px-8">
      <div className="my-5 flex max-w-2xl items-center rounded-xl border border-transparent bg-[#161D2F] px-4 shadow-sm transition focus-within:border-[#5A698F] focus-within:ring-2 focus-within:ring-[#FC4747]/25">
        <LuSearch className="shrink-0 text-[#BFC4CE]" size={22} />
        <input aria-label="Search movies and TV series" placeholder="Search for movies or TV series" type="search" className="w-full bg-transparent px-3 py-3 text-base text-white placeholder-[#87898E] outline-none md:text-lg" onChange={search} value={val} />
        {val && <button type="button" aria-label="Clear search" onClick={() => setVal('')} className="rounded-md p-1 text-[#BFC4CE] transition hover:bg-[#283044] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FC4747]"><LuX size={20} /></button>}
      </div>
      {/* display search results if found */}
      {val.trim()!='' && searchResults && searchResults.length > 0?(<><h2 className="mb-3 text-lg font-medium text-white">{`Found ${searchResults.length} results for '${val}'`}</h2></>):(<></>)}
      {val.trim()!='' && searchResults && searchResults.length > 0 ?
        
        
         ( <div className='grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4'>
            {searchResults.map((element) => (
              <div key={`${element.media_type}-${element.id}`} className='group'>
                {/* poster img */}
                <div className='relative aspect-video overflow-hidden rounded-xl bg-[#283044] bg-cover bg-center shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/40 cursor-pointer' style={{ backgroundImage: `linear-gradient(to top, rgba(16,20,30,.8), rgba(16,20,30,.05)), url(${element.backdrop_path != null ? img_url + element.backdrop_path : 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg'})` }} onClick={() => onSelect(element.id, element.media_type)}>
                  {/* bookmark */}
                  <div className='group flex justify-end pt-2 pe-2'>
                    <div className="flex p-1 w-8 h-8 rounded-full bg-gray-700 opacity-75 cursor-pointer items-center justify-center group-hover:bg-white" onClick={(e) => {
                      e.stopPropagation()
                      onBookMark(element)
                    }}>
                      {bookmark.find(e => e.id == element.id) ? (<RiBookmarkFill className={`group-hover:text-black  text-white `} />) : (<RiBookmarkLine className={`group-hover:text-black  text-white `} />)}
                    </div>
                  </div>

                </div>
                {/* content */}
                <div className='flex flex-col px-1'>
                  <div className='flex items-center'>
                    <p className='flex  items-center text-gray-200 py-1 md:ps-4 md:pe-2 px-1 text-xs md:text-sm'>{getYear(element.release_date)}{getYear(element.first_air_date)}</p>
                    <hr className=" w-1 border-white border-dotted border-t-4" />
                    <p className='flex items-center md:px-2 text-xs md:text-sm text-gray-200 capitalize'>{element.media_type == 'movie' ? <RiFilmFill className='px-1' size={26} style={{ color: 'white' }} /> : <TbDeviceTvOld className='px-1' size={26} style={{ color: 'white' }} />}{element.media_type}</p>
                    <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                    <p className='flex items-center md:px-2 text-xs md:text-sm text-gray-200 capitalize'>{element.media_type == 'movie' ? certificationMap[element.id] || 'Loading...' : tv_cert[element.id] || 'Loading...'}</p>
                  </div>
<p className='flex md:text-lg items-center text-white w-[95%] font-medium pb-4 overflow-hidden text-ellipsis whitespace-nowrap' style={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2
                                    }}>
                                        {element.title}{element.name}</p>                     </div>

              </div>
            ))}</div>) : (val.trim()!=''?<div className="rounded-xl border border-dashed border-[#5A698F] bg-[#161D2F] p-8 text-center text-[#BFC4CE]"><p className="text-lg font-medium text-white">No titles found</p><p className="mt-1 text-sm">Try a different title, spelling, or keyword.</p></div>: <>
              {/* display trending and recommended content */}
              <h2 className="text-white md:text-2xl text-xl my-4">Trending</h2>
              <Trending />
              <h2 className="text-white md:text-2xl text-xl my-4">Recommended for you</h2>
              <Recommended />
            </>)}
    </div>
  )
}
