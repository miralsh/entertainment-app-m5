import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { img_url } from '../../constants';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { TbDeviceTvOld } from "react-icons/tb";
import { get_certification_tv, get_tvseriesDetail, get_tv_cast, get_tvseries, search_tv } from '../../redux/thunks/mediaThunks'
import { clearMediaSearchList } from '../../redux/slices/mediaSlice';
import { setActive } from '../../redux/slices/uiSlice';
import { get_bookmark, add_to_bookmark, delete_bookmark } from '../../redux/thunks/bookmarkThunks'
import { getYear } from '../helper';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useToast } from '@chakra-ui/react';
const Tv = ({ val }) => {
    const toast = useToast()
    const dispatch = useDispatch()
    const searched_tv = useSelector(state => state.media.search_tv.results)
    const tv_series = useSelector(state => state.media.tv_series.results)
    const pages = useSelector(state => state.media.tv_series.total_pages)
    const search_pages = useSelector(state => state.media.search_tv.total_pages)
    const currpg = useSelector(state => state.media.tv_series.page)
    const curr_searchpg = useSelector(state => state.media.search_tv.page)
    const tv_cert = useSelector(state => state.media.tv_cert)
    const bkmark = useSelector(state => state.bookmark.bookmark)
    const added = useSelector(state => state.bookmark.added)
    const delete_bkmark = useSelector(state => state.bookmark.delete_bookmark)
    const navigate = useNavigate()
    const [bookmarkTriggeredHere, setBookmarkTriggeredHere] = useState(false);
    // clear search list on page mount
    useEffect(() => {
        dispatch(clearMediaSearchList())
    }, [])
    const [bookmark, setBookMark] = useState([])
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
                toast({
                    title: 'Success',
                    description: `${delete_bkmark ? delete_bkmark.title ? delete_bkmark.title : delete_bkmark.name : ''} removed from bookmark successfully`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                dispatch(get_bookmark(localStorage.getItem("user_id")))
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
            setBookmarkTriggeredHere(true)
            //if bookmark present - delete or add bookmark
            bookmark.find(e => e.id == val.id) ? (dispatch(delete_bookmark({ id: val.id, user_id: localStorage.getItem("user_id") }))) :
                dispatch(add_to_bookmark({ ...val, media_type: "tv", user_id: localStorage.getItem("user_id") }))
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
    // get certification for each tv series
    useEffect(() => {
        const allTV = [...(tv_series || []), ...(searched_tv || [])];
        // check if certification is missing
        const missingCertIds = allTV
            .filter(show => !tv_cert[show.id])
            .map(show => show.id);
            
        // fetch tv certification
        missingCertIds.forEach(id => {
            dispatch(get_certification_tv(id));
        });
      //  console.log(searched_tv)
    }, [tv_series, searched_tv, tv_cert]);
    // on item click
    const onSelect = (id) => {
        // fetch tv and cast details and navigate to tv series detail page 
        dispatch(get_tvseriesDetail(id))
        dispatch(get_tv_cast(id))
        dispatch(setActive(''))
        navigate(`/tvSeriesDetails/${id}`)
    }// on next click
    const onNext = () => {
        if (val?.trim() !== '' && searched_tv?.length > 0) {
            const nextPage = curr_searchpg < search_pages ? curr_searchpg + 1 : curr_searchpg;
            dispatch(search_tv({tv: val, pg: nextPage }));
        } else {
            const nextPage = currpg < pages ? currpg + 1 : currpg;
            dispatch(get_tvseries(nextPage));
        }
    }
    // on prev click
    const onPrevious = () => {
        if (val?.trim() !== '' && searched_tv?.length > 0) {
            const prevPage = curr_searchpg > 1 ? curr_searchpg - 1 : curr_searchpg;
              console.log("prev "+val+" "+prevPage)
            dispatch(search_tv({ tv:val, pg: prevPage }));
        } else {
            const prevPage = currpg > 1 ? currpg - 1 : currpg;
            console.log("prev "+prevPage)
            dispatch(get_tvseries(prevPage));
        }
    }
    // render search list or tv series list
    const listToRender = val?.trim() != '' && searched_tv && searched_tv.length > 0 ? searched_tv : tv_series
    return (
        <div className='w-full  lg:mx-6 mx-2'>
            {val?.trim() != '' && searched_tv && searched_tv.length > 0 ? (<></>) : (val?.trim() != ''&& searched_tv && searched_tv.length == 0 ? <h2 className="text-white">No results found</h2> : (<></>))}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-1 mt-6'>
                {listToRender?.map((element, index) => (
                    <div key={index}>
                        {/* img */}
                        <div className='w-[90%] me-4 bg-cover rounded-xl h-45 my-2 cursor-pointer hover:shadow-sm hover:shadow-white' style={{ backgroundImage: `url(${element.backdrop_path != null ? img_url + element.backdrop_path : 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg'})` }} onClick={() => onSelect(element.id)}>
                            {/* bookmark */}
                            <div className='group flex justify-end pt-2 pe-2'>
                                <div className={`flex p-1 w-8 h-8 rounded-full bg-gray-700 opacity-75 cursor-pointer items-center justify-center group-hover:bg-white `} onClick={(e) => { e.stopPropagation(); onBookMark(element) }} >
                                    {bookmark.find(e => e.id == element.id) ? (<RiBookmarkFill className={`group-hover:text-black  text-white `} />) : (<RiBookmarkLine className={`group-hover:text-black  text-white `} />)}
                                </div>
                            </div>

                        </div>
                        {/* content         */}
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <p className='flex  items-center text-gray-200 py-1 md:ps-4 md:pe-2 text-xs md:text-sm px-1'>{getYear(element.first_air_date)}</p>
                                <hr className=" w-1 border-white border-dotted border-t-4" />
                                <p className='flex items-center md:px-2 text-xs md:text-sm px-1 text-gray-200 capitalize'><TbDeviceTvOld className='px-1' size={26} style={{ color: 'white' }} />Tv</p>
                                <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                                <p className='flex items-center md:px-2 text-xs md:text-sm px-1 text-gray-200 capitalize'>{tv_cert[element.id] || 'Loading...'}</p>
                            </div>
                            <p className='flex  md:text-xl items-center text-white w-[95%]  font-medium md:px-4 pb-4 px-1 overflow-hidden text-ellipsis whitespace-nowrap' style={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2
                            }}>
                                {element.title}{element.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className='mx-auto flex items-center justify-center'>
                <IoIosArrowBack style={{ color: "white" }} size={25} className='hover:scale-[1.2] cursor-pointer' onClick={() => onPrevious()} />
                <p className='mx-4 text-white text-lg'> Page {val?.trim() !== '' && searched_tv?.length > 0 ? curr_searchpg : currpg} of {val?.trim() !== '' && searched_tv?.length > 0 ? search_pages : pages} </p>
                <IoIosArrowForward style={{ color: "white" }} size={25} className='hover:scale-[1.2] cursor-pointer' onClick={() => onNext()} />
            </div>
        </div>
    );
};

export default Tv;