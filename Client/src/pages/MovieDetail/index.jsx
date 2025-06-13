import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { img_url } from '../../../constants';
import { FaRegStarHalfStroke, FaRegStar, FaStar, FaLink } from "react-icons/fa6";
import { FaImdb } from "react-icons/fa"
import { getYear } from '../../helper';
import { Link } from 'react-router-dom';
const index = () => {
    const movieDetail = useSelector(state => state.media.movieDetail)
    const cast = useSelector(state => state.media.movie_cast)
    const [mDetail, setMDetail] = useState({})
    const [mCast, setMCast] = useState([])
    // get movie details
    useEffect(() => {
        setMDetail(movieDetail)
    }, [movieDetail])
    // get cast data
    useEffect(() => { setMCast(cast) }, [cast])
    return (
        <div className='md:px-4 w-full overflow-x-hidden my-8 lg:my-4 xl:my-4'>
            <div className='  flex  flex-col md:flex-row lg:flex-row '>
                {/* poster img */}
                <img src={`${img_url}${mDetail.poster_path}`} className='rounded-xl mx-8 h-[75%]' />
                {/* content */}
                <div className='flex flex-col px-12 mt-4 md:mt-0 lg:mt-0'>
                    <p className='text-4xl text-white'>{mDetail.original_title}</p>
                    <div className='flex my-4 items-center mx-2'>
                        <div className='flex' style={{ color: "white", scale: 1.2 }}>
                            {mDetail.popularity <= 10 ? (<><FaRegStarHalfStroke /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /></>) : mDetail.popularity > 10 && mDetail.popularity <= 20 ? (<><FaStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /></>) :
                                mDetail.popularity > 20 && mDetail.popularity <= 30 ? (<><FaStar /><FaRegStarHalfStroke /><FaRegStar /><FaRegStar /><FaRegStar /></>) : mDetail.popularity > 30 && mDetail.popularity <= 40 ? (<><FaStar /><FaStar /><FaRegStar /><FaRegStar /><FaRegStar /></>) : mDetail.popularity > 40 && mDetail.popularity <= 50 ? (<><FaStar /><FaStar /><FaRegStarHalfStroke /><FaRegStar /><FaRegStar /></>) : mDetail.popularity > 50 && mDetail.popularity <= 60 ? (<><FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar /></>) : mDetail.popularity > 60 && mDetail.popularity <= 70 ? (<><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke /><FaRegStar /></>) : mDetail.popularity > 70 && mDetail.popularity <= 80 ? (<><FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar /></>) : mDetail.popularity > 80 && mDetail.popularity <= 90 ? (<><FaStar /><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke /></>) : (<><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></>)}
                        </div>
                        <p className='text-white mx-3 md:text-xl'>( {mDetail.vote_count} votes )</p>
                    </div>
                    <div className='grid grid-cols-4  md:gap-x-16 gap-y-2 gap-x-4  font-bold my-4 text-sm md:text-base'>
                        <p className='text-[#87898E] w-100'>Length</p>
                        <p className='text-[#87898E]'>Language</p>
                        <p className='text-[#87898E]'>Year</p>
                        <p className='text-[#87898E]'>Status</p>
                        <p className='text-white '>{mDetail.runtime} min.</p>
                        <p className='text-white'>{mDetail.original_language == 'en' ? 'English' : mDetail.original_language == 'hi' ? 'Hindi' :
                            mDetail.original_language == 'el' ? 'Greek' : mDetail.original_language == 'it' ? 'Italian' :
                                mDetail.original_language == 'ko' ? 'Korean' : 'N/A'}</p>
                        <p className='text-white'>{getYear(mDetail.release_date)}</p>
                        <p className='text-white'>{mDetail.status}</p>
                    </div>
                    {/* cast */}
                    <div >
                        <p className='text-white font-bold my-2'>Genres</p>
                        <div className='flex flex-wrap '>
                            {mDetail.genres ? mDetail.genres.map((val, index) => (
                                <p key={index} className='bg-white rounded px-2 py-1 me-2 font-bold text-sm my-1'>{val.name}</p>
                            )) : (<p className='text-white'>Loading..</p>)}
                        </div>
                        <p className='text-white font-bold mt-6 mb-1'>Synopsis</p>
                        <p className='text-white text-justify'>{mDetail.overview}</p>
                        <p className='text-white font-bold mt-6 mb-1'>Casts</p>
                        <div className='flex flex-wrap '>
                            {mCast ? mCast.map((val, index) => (
                                <p key={index} className='border-1 border-white rounded px-2 py-1 me-2 font-bold text-sm text-white my-1'>{val.name}</p>
                            )) : (<p className='text-white'>Loading..</p>)}
                        </div>
                        {/* links */}
                        <div className='flex font-bold mt-8'>
                            <Link to={mDetail.homepage} target='_blank'><button className='flex items-center cursor-pointer text-white bg-gray-500 rounded md:px-6 px-2 py-2 text-sm me-4 ' >Website<FaLink className='ms-4' /></button></Link>
                            <Link to={'https://www.imdb.com/title/' + mDetail.imdb_id} target='_blank'><button className='flex items-center cursor-pointer text-white bg-gray-500 rounded md:px-6 px-2 py-2 text-sm'>IMDB<FaImdb className='ms-4 '
                                style={{ color: "transparent", fill: "white" }} /></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;