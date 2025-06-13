import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { add_to_bookmark, delete_bookmark, get_bookmark } from '../../redux/thunks/bookmarkThunks';
import { setActive } from '../../redux/slices/uiSlice';
import { get_certification_movie, get_certification_tv, get_movie_cast, get_movieDetail, get_tv_cast, get_tvseriesDetail } from '../../redux/thunks/mediaThunks'
import { clearBkmarkSearchList } from '../../redux/slices/bookmarkSlice';

import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import BookmarkCard from './BookmarkCard';
const Bookmarked = ({ val }) => {
    const dispatch = useDispatch()
    const bmark = useSelector(state => state.bookmark.bookmark)
    const search_bkmark = useSelector(state => state.bookmark.search_bkmark)
    const certificationMap = useSelector(state => state.media.certificationMap)
    const tv_cert = useSelector(state => state.media.tv_cert)
    const added = useSelector(state => state.bookmark.added)
    const delete_bkmark = useSelector(state => state.bookmark.delete_bookmark)
    const navigate = useNavigate()
    const toast = useToast()
    const [bookmarkTriggeredHere, setBookmarkTriggeredHere] = useState(false)
    // clear search list on page mount
    useEffect(() => {
        dispatch(clearBkmarkSearchList())
    }, [])



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
            bmark.find(e => e.id == val.id) ? (dispatch(delete_bookmark({ id: val.id, user_id: localStorage.getItem("user_id") }))) :
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
    const listToRender = search_bkmark && search_bkmark.length > 0 ? search_bkmark : bmark
    return (
        <div className='w-full lg:mx-6 '>
            {val?.trim() != '' && search_bkmark && search_bkmark.length > 0 ?
                (<> <h2 className="text-white text-2xl ">Bookmarked Movies</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-4 gap-1 mt-6'>
                    {listToRender ? listToRender.filter(e => e.media_type == "movie").length != 0 ? listToRender.filter(e => e.media_type == "movie").map((element, index) => (
                        <BookmarkCard key={index}
                            element={element}
                            isMovie={true}
                            onSelect={onSelect}
                            onBookMark={onBookMark}
                            isBookmarked={listToRender.find(e => e.id === element.id)}
                            certification={certificationMap[element.id]}
                        />
                    )) : <p className='text-gray-500  my-4 text-xl'>No movies in bookmark</p> : <>Loading...</>}
                </div>
                    <h2 className="text-white text-2xl mt-6">Bookmarked TV Series</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-1 mt-6 '>
                        {/* display bookmarked tv series content */}
                        {listToRender ? listToRender.filter(e => e.media_type == "tv").length != 0 ? listToRender.filter(e => e.media_type == "tv").map((element, index) => (
                            <BookmarkCard key={index}
                                element={element}
                                isMovie={false}
                                onSelect={onSelect}
                                onBookMark={onBookMark}
                                isBookmarked={listToRender.find(e => e.id === element.id)}
                                certification={tv_cert[element.id]}
                            />
                        )) : <p className='text-gray-500 my-4 text-xl  '>No TV series in bookmark</p> : <>Loading...</>}
                    </div></>) : (val?.trim() != '' ? <h2 className="text-white">No bookmarks found</h2> :
                        (<>
                            <h2 className="text-white text-2xl ">Bookmarked Movies</h2>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-4 gap-1 mt-6'>
                                {listToRender ? listToRender.filter(e => e.media_type == "movie").length != 0 ? listToRender.filter(e => e.media_type == "movie").map((element, index) => (

                                    <BookmarkCard key={index}
                                        element={element}
                                        isMovie={true}
                                        onSelect={onSelect}
                                        onBookMark={onBookMark}
                                        isBookmarked={listToRender.find(e => e.id === element.id)}
                                        certification={certificationMap[element.id]}
                                    />

                                )) : <p className='text-gray-500  my-4 text-xl'>No movies in bookmark</p> : <>Loading...</>}
                            </div>
                            <h2 className="text-white text-2xl mt-6">Bookmarked TV Series</h2>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-1 mt-6 '>
                                {/* display bookmarked tv series content */}
                                {listToRender ? listToRender.filter(e => e.media_type == "tv").length != 0 ? listToRender.filter(e => e.media_type == "tv").map((element, index) => (
                                    <BookmarkCard key={index}
                                        element={element}
                                        isMovie={false}
                                        onSelect={onSelect}
                                        onBookMark={onBookMark}
                                        isBookmarked={listToRender.find(e => e.id === element.id)}
                                        certification={tv_cert[element.id]}
                                    />
                                )) : <p className='text-gray-500 my-4 text-xl  '>No TV series in bookmark</p> : <>Loading...</>}
                            </div>
                        </>
                        ))}
        </div>
    );
};

export default Bookmarked;