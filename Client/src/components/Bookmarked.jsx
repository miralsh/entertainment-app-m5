import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { img_url } from '../../constants';
import { RiBookmarkFill, RiBookmarkLine, RiFilmFill } from 'react-icons/ri';
import { TbDeviceTvOld } from 'react-icons/tb';
import { add_to_bookmark, clear_search_list, delete_bookmark, get_bookmark, get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_tv_cast, get_tvseriesDetail, setActive } from '../../redux/action';
import { getYear } from '../helper';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
const Bookmarked = () => {
    const dispatch = useDispatch()
    const bmark = useSelector(state => state.bookmark)
    const search_bkmark = useSelector(state => state.search_bkmark)
    const certificationMap = useSelector(state => state.certificationMap)
    const tv_cert = useSelector(state => state.tv_cert)
    const bkmark = useSelector(state => state.bookmark)
    const added = useSelector(state => state.added)
    const delete_bkmark = useSelector(state => state.delete_bookmark)
    const navigate = useNavigate()
    const toast = useToast()
    const [bookmarkTriggeredHere, setBookmarkTriggeredHere] = useState(false)
    // clear search list on page mount
    useEffect(() => {
        dispatch(clear_search_list())
    }, [])

    // fetch bookmarks
    const [bookmark, setBookMark] = useState([])

    useEffect(() => {
        if (added.message == "created") {
            if (!bookmarkTriggeredHere || added === undefined) return;
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
        setBookmarkTriggeredHere(false)
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
        setBookmarkTriggeredHere(false)
    }, [delete_bkmark])
    const onBookMark = (val) => {
        // on bookmark click
        if (localStorage.getItem("accesstoken") != null) {
            setBookmarkTriggeredHere(true)
            // bookmark present then delete or add bookmark
            bookmark.find(e => e.id == val.id) ? (dispatch(delete_bookmark(val.id, localStorage.getItem("user_id")))) :
                dispatch(add_to_bookmark({ ...val, user_id: localStorage.getItem("user_id") }))
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
    useEffect(() => {
        const uniqueIdsToFetch = [];
        const uniqueIdsToFetchTv = [];
        const allbmark = [...(bmark || []), ...(search_bkmark || [])];

        // get certification for each movie and tv series
        allbmark.forEach((element) => {
            if (element.media_type === 'movie') {
                // check if certification is present
                if (!certificationMap[element.id]) {
                    uniqueIdsToFetch.push(element.id);
                }
            } else {
                if (!tv_cert[element.id]) {
                    uniqueIdsToFetchTv.push(element.id);
                }
            }
        });
        // fetch movie certification
        if (uniqueIdsToFetch.length > 0) {
            uniqueIdsToFetch.forEach((id) => {
                dispatch(get_certification_movie(id));
            });
        }
        //fetch tv certification / rating
        if (uniqueIdsToFetchTv.length > 0) {
            uniqueIdsToFetchTv.forEach((id) => {
                dispatch(get_certification_tv(id));
            });
        }
    }, [bmark, search_bkmark]);



    const onSelect = (element) => {
        // on item click go to detail page
        if (element.media_type == "movie") {
            dispatch(get_movieDetail(element.id))
            dispatch(get_movie_cast(element.id))
            dispatch(setActive(''))
            navigate(`/movieDetails/${element.id}`)
        } else {
            dispatch(get_tvseriesDetail(element.id))
            dispatch(get_tv_cast(element.id))
            dispatch(setActive(''))
            navigate(`/tvSeriesDetails/${element.id}`)
        }
    }
    {/* display search results if found or displays bookmarked shows*/ }
    const listToRender = search_bkmark && search_bkmark.length > 0 ? search_bkmark : bkmark
    return (
        <div className='w-full lg:mx-6 '>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                {listToRender ? listToRender.filter(e => e.media_type == "movie").length != 0 ? listToRender.filter(e => e.media_type == "movie").map((element, index) => (
                    <div>
                        {/* movie poster img */}
                        <div key={index} className='w-[90%] me-4 bg-cover rounded-xl h-45 my-2 cursor-pointer hover:shadow-sm hover:shadow-white' style={{ backgroundImage: `url(${element.backdrop_path != null ? img_url + element.backdrop_path : 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg'})` }} onClick={() => onSelect(element)}>
                            {/* bookmark */}
                            <div className='group flex justify-end pt-2 pe-2'>
                                <div className="flex p-1 w-8 h-8 rounded-full bg-gray-700 opacity-75 cursor-pointer items-center justify-center group-hover:bg-white" onClick={(e) => { e.stopPropagation(); onBookMark(element) }}>
                                    {bookmark.find(e => e.id == element.id) ? (<RiBookmarkFill className={`group-hover:text-black  text-white `} />) : (<RiBookmarkLine className={`group-hover:text-black  text-white `} />)}
                                </div>
                            </div>

                        </div>
                        {/* content */}
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <p className='flex  items-center text-gray-200 py-1 ps-4 pe-2 text-sm cursor-pointer hover:shadow-sm hover:shadow-white'>{getYear(element.release_date)}</p>
                                <hr className=" w-1 border-white border-dotted border-t-4" />
                                <p className='flex items-center px-2 text-sm text-gray-200 capitalize'><RiFilmFill className='px-1' size={26} style={{ color: 'white' }} /> Movie</p>
                                <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                                <p className='flex items-center px-2 text-sm text-gray-200 capitalize'>{certificationMap[element.id] || 'Loading...'}</p>
                            </div>
                            <p className='flex text-xl items-center text-white w-[100%] mx-auto font-medium px-4 pb-4 line-clamp-2'>{element.title}{element.name}</p>
                        </div>
                    </div>
                )) : <p className='text-gray-500  my-4 text-xl'>No movies in bookmark</p> : <>Loading...</>}
            </div>
            <h2 className="text-white text-2xl mt-6">Bookmarked TV Series</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 '>
                {/* display bookmarked tv series content */}
                {listToRender ? listToRender.filter(e => e.media_type == "tv").length != 0 ? listToRender.filter(e => e.media_type == "tv").map((element, index) => (
                    <div>
                        {/* tv series poster img */}
                        <div key={index} className='w-[90%] me-4 bg-cover rounded-xl h-45 my-2' style={{ backgroundImage: `url(${element.backdrop_path != null ? img_url + element.backdrop_path : 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg'})` }} onClick={() => onSelect(element)}>
                            {/* bookmark */}
                            <div className='group flex justify-end pt-2 pe-2'>
                                <div className="flex p-1 w-8 h-8 rounded-full bg-gray-700 opacity-75 cursor-pointer items-center justify-center group-hover:bg-white" onClick={(e) => { e.stopPropagation(); onBookMark(element) }}>
                                    {bookmark.find(e => e.id == element.id) ? (<RiBookmarkFill className={`group-hover:text-black  text-white `} />) : (<RiBookmarkLine className={`group-hover:text-black  text-white `} />)}
                                </div>
                            </div>

                        </div>
                        {/* content */}
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <p className='flex  items-center text-gray-200 py-1 ps-4 pe-2 text-sm'>{getYear(element.first_air_date)}</p>
                                <hr className=" w-1 border-white border-dotted border-t-4" />
                                <p className='flex items-center px-2 text-sm text-gray-200 capitalize'><TbDeviceTvOld className='px-1' size={26} style={{ color: 'white' }} />Tv</p>
                                <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                                <p className='flex items-center px-2 text-sm text-gray-200 capitalize'>{tv_cert[element.id] || 'Loading...'}</p>
                            </div>
                            <p className='flex text-xl items-center text-white w-[100%] mx-auto font-medium px-4 pb-4 line-clamp-2'>{element.title}{element.name}</p>
                        </div>
                    </div>
                )) : <p className='text-gray-500 my-4 text-xl  '>No TV series in bookmark</p> : <>Loading...</>}
            </div>

        </div>
    );
};

export default Bookmarked;