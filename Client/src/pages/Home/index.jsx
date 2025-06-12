import { LuSearch } from "react-icons/lu";
import Trending from "../../components/Trending";
import Recommended from "../../components/Recommended";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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

  let debounceTimer;
  //on search 
  const search = (e) => {
    setVal(e.target.value)
    clearTimeout(debounceTimer);
    // debouncing to limit the search query and improve performance
    debounceTimer = setTimeout(() => {
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
  return (
    < div className="lg:mx-8 w-full overflow-x-hidden scrollbar-hide px-4">
      <div className="flex items-center my-4">
        <LuSearch style={{ 'color': 'white' }} size={24} />
        <input placeholder="Search for movies or TV series" type="search" className="md:text-xl w-100 mx-2 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E]  text-white focus:caret-[#FC4747] focus:border-b-1 focus:border-b-[#5A698F]" onChange={(e) => search(e)} value={val} />
      </div>
      {/* display search results if found */}
      {searchResults && searchResults.length > 0 ?
        (<><h2 className="text-white ">{`Found ${searchResults.length} results for '${val}'`}</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {searchResults.map((element, index) => (
              <div key={index}>
                {/* poster img */}
                <div className=' me-4 bg-cover rounded-xl h-45 my-2 cursor-pointer hover:shadow-sm hover:shadow-white ' style={{ backgroundImage: `url(${element.backdrop_path != null ? img_url + element.backdrop_path : 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg'})` }} onClick={() => onSelect(element.id, element.media_type)}>
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
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <p className='flex  items-center text-gray-200 py-1 ps-4 pe-2 text-sm'>{getYear(element.release_date)}{getYear(element.first_air_date)}</p>
                    <hr className=" w-1 border-white border-dotted border-t-4" />
                    <p className='flex items-center px-2 text-sm text-gray-200 capitalize'>{element.media_type == 'movie' ? <RiFilmFill className='px-1' size={26} style={{ color: 'white' }} /> : <TbDeviceTvOld className='px-1' size={26} style={{ color: 'white' }} />}{element.media_type}</p>
                    <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                    <p className='flex items-center px-2 text-sm text-gray-200 capitalize'>{element.media_type == 'movie' ? certificationMap[element.id] || 'Loading...' : tv_cert[element.id] || 'Loading...'}</p>
                  </div>
                  <p className='flex text-xl items-center text-white w-[100%] mx-auto font-medium px-4 pb-4 line-clamp-2'>{element.title}{element.name}</p>
                </div>

              </div>
            ))}</div></>) : (<>
              {/* display trending and recommended content */}
              <h2 className="text-white md:text-2xl text-xl my-4">Trending</h2>
              <Trending />
              <h2 className="text-white md:text-2xl text-xl my-4">Recommended for you</h2>
              <Recommended />
            </>)}
    </div>
  )
}