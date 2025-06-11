import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { img_url } from '../../constants';
import { RiBookmarkFill, RiBookmarkLine, RiFilmFill } from 'react-icons/ri';
import { TbDeviceTvOld } from 'react-icons/tb';
import { add_to_bookmark, delete_bookmark, get_bookmark, get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_tv_cast, get_tvseriesDetail, setActive } from '../../redux/action';
import { getYear } from '../helper';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Recommended = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const recommended = useSelector(state => state.recommended)
    const certificationMap = useSelector(state => state.certificationMap)
    const tv_cert = useSelector(state => state.tv_cert)
    const bkmark = useSelector(state => state.bookmark)
    const added = useSelector(state => state.added)
    const delete_bkmark = useSelector(state => state.delete_bookmark)
    const [bookmarkTriggeredHere, setBookmarkTriggeredHere] = useState(false);
    const toast = useToast()


    useEffect(() => {
        const uniqueIdsToFetch = [];
        const uniqueIdsToFetchTv = [];
        // get certification for each movie and tv series
        recommended.forEach((element) => {
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
    }, [recommended]);
    const [bookmark, setBookMark] = useState([])

    // on add bookmark, call get bookmark and display toast message
    useEffect(() => {
        if (!bookmarkTriggeredHere || added === undefined) return;

        if (added != undefined) {
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
                console.log(added);
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

    //on bookmark click
    const onBookMark = (val) => {
        // check if user has login
        if (localStorage.getItem("accesstoken") != null) {
            //state to keep track of which screen has added bookmark
            setBookmarkTriggeredHere(true);
            //if bookmark present - delete or add bookmark
            bookmark.find(e => e.id == val.id) ? (dispatch(delete_bookmark(val.id, localStorage.getItem("user_id")))) :
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
        <div className='w-full lg:mx-6 mx-2'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {recommended ? recommended.map((element, index) => (
                    <div key={index}>
                        {/* img */}
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
                        <div className='flex flex-col '>
                            <div className='flex items-center'>
                                <p className='flex  items-center text-gray-200 py-1 md:ps-4 pe-2 text-sm'>{getYear(element.release_date)}{getYear(element.first_air_date)}</p>
                                <hr className=" w-1 border-white border-dotted border-t-4" />
                                <p className='flex items-center px-2 text-sm text-gray-200 capitalize'>{element.media_type == 'movie' ? <RiFilmFill className='px-1' size={26} style={{ color: 'white' }} /> : <TbDeviceTvOld className='px-1' size={26} style={{ color: 'white' }} />}{element.media_type}</p>
                                <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                                <p className='flex items-center px-2 text-sm text-gray-200 capitalize'>{element.media_type == 'movie' ? certificationMap[element.id] || 'Loading...' : tv_cert[element.id] || 'Loading...'}</p>
                            </div>
                            <p className='flex md:text-xl items-center text-white w-[100%] mx-auto font-medium md:px-4 pb-4 line-clamp-2'>{element.title}{element.name}</p>
                        </div>

                    </div>
                )) : <>Loading...</>}
            </div>

        </div>
    );
};

export default Recommended;