import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { img_url } from '../../constants';
import { RiBookmarkFill, RiBookmarkLine, RiFilmFill } from 'react-icons/ri';
import { TbDeviceTvOld } from 'react-icons/tb';
//import { add_to_bookmark, delete_bookmark, get_bookmark, get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_tv_cast, get_tvseriesDetail, setActive } from '../../redux/action';
import { useNavigate } from 'react-router-dom';
import { getYear } from '../helper';
import { useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { add_to_bookmark, delete_bookmark, get_bookmark } from '../../redux/thunks/bookmarkThunks';
import { setActive } from '../../redux/slices/uiSlice';
import { get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_tv_cast, get_tvseriesDetail } from '../../redux/thunks/mediaThunks';
const Trending = () => {
    const toast = useToast()
    const dispatch = useDispatch()
    const trending = useSelector(state => state.media.trending)
    const certificationMap = useSelector(state => state.media.certificationMap)
    const tv_cert = useSelector(state => state.media.tv_cert)
    const bkmark = useSelector(state => state.bookmark.bookmark)
    const added = useSelector(state => state.bookmark.added)
    const delete_bkmark = useSelector(state => state.bookmark.delete_bookmark)
    const [bookmarkTriggeredHere, setBookmarkTriggeredHere] = useState(false);
    const [bookmark, setBookMark] = useState([])
    const navigate = useNavigate()

    // on add bookmark, call get bookmark and display toast message
    useEffect(() => {
        if (!bookmarkTriggeredHere || added === undefined) return;
        if (added != undefined) {
            console.log("added " + JSON.stringify(added))
            if (added.message == "created") {

                dispatch(get_bookmark(localStorage.getItem("user_id")))
                toast({
                    title: 'Success',
                    description: `${added.bookmark ? added.bookmark.title ? added.bookmark.title : added.bookmark.name : ''} added to bookmark successfully`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                console.log(added.error);
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
    //on delete bookmark, call get bookmark and display toast message
    useEffect(() => {
        if (!bookmarkTriggeredHere || delete_bkmark === undefined) return;

        if (delete_bkmark != undefined) {
            if ("id" in delete_bkmark) {

                dispatch(get_bookmark(localStorage.getItem("user_id")))
                toast({
                    title: 'Success',
                    description: `${delete_bkmark ? delete_bkmark.title ? delete_bkmark.title : delete_bkmark.name : ''} removed from bookmark successfully`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                console.log(added.error);
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


    const scrollRef = useRef(null);

    // scrolling of trending component
    const scroll = (offset) => {
        scrollRef.current.scrollBy({
            left: offset,
            behavior: 'smooth',
        });
    };

    //on bookmark click
    const onBookMark = (event, val) => {
        // check if user has login
        if (localStorage.getItem("accesstoken") != null) {
            //state to keep track of which screen has added bookmark
            setBookmarkTriggeredHere(true);
            //if bookmark present - delete or add bookmark
            bookmark.find(e => e.id == val.id) ? (dispatch(delete_bookmark({id:val.id,user_id: localStorage.getItem("user_id")}))) :
                (dispatch(add_to_bookmark({ ...val, user_id: localStorage.getItem("user_id") })))
        } else {
            toast({
                description: 'Please login to continue',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            dispatch(setActive(''))
            navigate("/login")

        }
    }

    useEffect(() => {
        const uniqueIdsToFetch = [];
        const uniqueIdsToFetchTv = [];

        // get certification for each movie and tv series
        trending?.forEach((element) => {
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
    }, [trending]);
    // fetch bookmarks
    useEffect(() => { setBookMark(bkmark) }, [bkmark])




    // on item click
    const onSelect = (id, media_type) => {
        // fetch movie and cast details and navigate to movie detail page 
        if (media_type == "movie") {
            dispatch(get_movieDetail(id))
            dispatch(get_movie_cast(id))
            dispatch(setActive(''))
            navigate(`/movieDetails/${id}`)
        } else {
            // fetch tv series and cast details and navigate to tv series detail page 
            dispatch(get_tvseriesDetail(id))
            dispatch(get_tv_cast(id))
            dispatch(setActive(''))
            navigate(`/tvSeriesDetails/${id}`)
        }

    }
    return (

        <div className="relative w-full">
            {/* Left arrow */}

            <button
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black cursor-pointer"
                onClick={() => scroll(-300)}
            >
                <FaChevronLeft />
            </button>

            {/* Scrollable content */}
            <div
                ref={scrollRef}
                className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth px-10"
            >
                {trending?.map((element, index) => (
                    // img 
                    <div
                        key={index}
                        className="relative inline-block w-64 sm:w-72 md:w-80 lg:w-80 mr-4 bg-cover bg-no-repeat rounded-xl h-45 cursor-pointer
                         hover:shadow-sm hover:shadow-white mb-2"
                        style={{ backgroundImage: `url(${element.backdrop_path != null ? img_url + element.backdrop_path : 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg'})` }}
                        onClick={() => onSelect(element.id, element.media_type)}
                    >
                        {/* bookmark */}
                        <div className='group flex justify-end pt-2 pe-2' >
                            <div className="flex p-1 w-8 h-8 rounded-full bg-gray-700 opacity-75 cursor-pointer items-center justify-center group-hover:bg-white" onClick={(e) => {
                                e.stopPropagation()
                                onBookMark(e, element)
                            }} >
                                {bookmark.find(e => e.id == element.id) ? (<RiBookmarkFill className={`group-hover:text-black  text-white `} />) : (<RiBookmarkLine className={`group-hover:text-black  text-white `} />)}

                            </div>
                        </div>
                        {/* content */}
                        <div className='absolute bottom-0  ' >

                            <div className='flex flex-col '>
                                <div className='flex items-center'>
                                    <p className='flex  items-center text-gray-200 py-1 md:ps-4 md:pe-2 text-xs md:text-sm px-1'>{getYear(element.release_date)}{getYear(element.first_air_date)}</p>
                                    <hr className=" w-1 border-white border-dotted border-t-4" />
                                    <p className='flex items-center md:px-2 text-xs md:text-sm text-gray-200 capitalize'>{element.media_type == 'movie' ? <RiFilmFill className='px-1' size={26} style={{ color: 'white' }} /> : <TbDeviceTvOld className='px-1' size={26} style={{ color: 'white' }} />}{element.media_type}</p>
                                    <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                                    <p className='flex items-center md:px-2 text-xs md:text-sm text-gray-200 capitalize'>{element.media_type == 'movie' ? certificationMap[element.id] || 'Loading...' : tv_cert[element.id] || 'Loading...'}</p>
                                </div>
                                <p className='flex  items-center  w-[75%]  text-white  font-medium mx-4 pb-4 lg:text-xl xl:text-xl md:text-lg overflow-hidden text-ellipsis whitespace-nowrap  '
                                    style={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 1
                                    }}
                                >{element.title}{element.name}</p>
                            </div>
                        </div>


                    </div>
                ))}
            </div>

            {/* Right arrow */}
            <button
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black cursor-pointer"
                onClick={() => scroll(300)}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Trending;