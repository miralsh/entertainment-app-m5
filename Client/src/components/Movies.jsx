import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { img_url } from '../../constants';
import { RiBookmarkFill, RiBookmarkLine, RiFilmFill } from 'react-icons/ri';
import { add_to_bookmark, clear_search_list, delete_bookmark, get_bookmark, get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_movies, search_movie, setActive } from '../../redux/action';
import { getYear } from '../helper';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useToast } from '@chakra-ui/react';
const Movies = ({ val }) => {
    const toast = useToast()
    const dispatch = useDispatch()
    const movies = useSelector(state => state.movies.results)
    const searched_movies = useSelector(state => state.search_movie.results)
    const pages = useSelector(state => state.movies.total_pages)
    const search_pages = useSelector(state => state.search_movie.total_pages)
    const certificationMap = useSelector(state => state.certificationMap)
    const bkmark = useSelector(state => state.bookmark)
    const added = useSelector(state => state.added)
    const delete_bkmark = useSelector(state => state.delete_bookmark)
    const [currPage, setCurrPage] = useState(1)
    const navigate = useNavigate()
    const [bookmarkTriggeredHere, setBookmarkTriggeredHere] = useState(false);
    const [bookmark, setBookMark] = useState([])
    // clear search list on page mount
    useEffect(() => {
        dispatch(clear_search_list())
    }, [])

    // on add bookmark, call get bookmark and display toast message
    useEffect(() => {
        if (!bookmarkTriggeredHere || added === undefined) return;

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
        setBookmarkTriggeredHere(false)
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
        setBookmarkTriggeredHere(false)
    }, [delete_bkmark])
    //on bookmark click
    const onBookMark = (val) => {
        // check if user has login
        if (localStorage.getItem("accesstoken") != null) {
            //state to keep track of which screen has added bookmark
            setBookmarkTriggeredHere(true);
            //if bookmark present - delete or add bookmark
            bookmark.find(e => e.id == val.id) ? (dispatch(delete_bookmark(val.id, localStorage.getItem("user_id")))) :
                dispatch(add_to_bookmark({ ...val, media_type: "movie", user_id: localStorage.getItem("user_id") }))
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
        const allMovies = [...(movies || []), ...(searched_movies || [])];
        const uniqueIdsToFetch = [];
        // get certification for each movie
        allMovies.forEach((movie) => {
            // check if certification is present
            if (!certificationMap[movie.id]) {
                uniqueIdsToFetch.push(movie.id);
            }
        });
        // fetch movie certification
        if (uniqueIdsToFetch.length > 0) {
            uniqueIdsToFetch.forEach((id) => {
                dispatch(get_certification_movie(id));
            });
        }
    }, [movies, searched_movies]);
    // on item click
    const onSelect = (id) => {
        // fetch movie and cast details and navigate to movie detail page 
        dispatch(get_movieDetail(id))
        dispatch(get_movie_cast(id))
        dispatch(setActive(''))
        navigate(`/movieDetails/${id}`)
    }
    // on next click
    const onNext = () => {
        let pg = 1
        if (currPage < (pages ? pages : search_pages)) {
            pg = currPage + 1
        } else {
            pg = currPage
        }

        setCurrPage(pg)
        dispatch(get_movies(pg))
        dispatch(search_movie(val, pg))
    }
    // on prev click
    const onPrevious = () => {
        let pg = 1
        if (currPage > 0) {
            pg = currPage - 1
        } else {
            pg = currPage
        }

        setCurrPage(pg)
        dispatch(get_movies(pg))
        dispatch(search_movie(val, pg))
    }
    // render search list or movies list
    const listToRender = searched_movies && searched_movies.length > 0 ? searched_movies : movies
    return (
        <div className='w-full lg:mx-6 mx-2'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                {listToRender?.map((element, index) => (
                    <div key={index}>
                        {/* img */}
                        <div className='w-[90%] me-4 bg-cover rounded-xl h-45 my-2 cursor-pointer hover:shadow-sm hover:shadow-white' style={{ backgroundImage: `url(${element.backdrop_path != null ? img_url + element.backdrop_path : 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg'})` }} onClick={() => onSelect(element.id)}>
                            {/* bookmark */}
                            <div className='group flex justify-end pt-2 pe-2'>
                                <div className={`flex p-1 w-8 h-8 rounded-full bg-gray-700 opacity-75 cursor-pointer items-center justify-center group-hover:bg-white`} onClick={(e) => {
                                    e.stopPropagation()
                                    onBookMark(element)
                                }}>
                                    {bookmark.find(e => e.id == element.id) ? (<RiBookmarkFill className={`group-hover:text-black  text-white `} />) : (<RiBookmarkLine className={`group-hover:text-black  text-white `} />)}
                                </div>
                            </div>

                        </div>
                        {/* content         */}
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <p className='flex  items-center text-gray-200  py-1 md:ps-4 pe-2 text-sm'>{getYear(element.release_date)}</p>
                                <hr className=" w-1 border-white border-dotted border-t-4" />
                                <p className='flex items-center md:px-2 px-1 text-sm text-gray-200 capitalize'><RiFilmFill className='px-1' size={26} style={{ color: 'white' }} /> Movie</p>
                                <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                                <p className='flex items-center md:px-2 px-1 text-sm text-gray-200 capitalize'>{certificationMap[element.id] || 'Loading...'}</p>
                            </div>
                            <p className='flex md:text-xl items-center text-white w-[100%] mx-auto font-medium md:px-4 pb-4 line-clamp-2'>{element.title}{element.name}</p>
                        </div>
                    </div>
                ))}

            </div>
            {/* Pagination */}
            <div className='mx-auto flex items-center justify-center'>
                <IoIosArrowBack style={{ color: "white" }} size={25} className='hover:scale-[1.2] cursor-pointer' onClick={() => onPrevious()} />
                <p className='mx-4 text-white text-lg'> Page {currPage} of {searched_movies?.length > 0 ? search_pages : pages} </p>
                <IoIosArrowForward style={{ color: "white" }} size={25} className='hover:scale-[1.2] cursor-pointer' onClick={() => onNext()} />
            </div>
        </div>
    );
};

export default Movies;