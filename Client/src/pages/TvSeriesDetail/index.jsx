import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { img_url } from '../../../constants';
import { FaRegStarHalfStroke, FaRegStar, FaStar, FaLink } from "react-icons/fa6";
import { FaImdb } from "react-icons/fa"
import { Link } from 'react-router-dom';
const index = () => {
    const tvSeriesDetail = useSelector(state => state.media.tvDetail)
    const cast = useSelector(state => state.media.tv_cast)
    const [tvDetail, setTvDetail] = useState({})
    const [mCast, setMCast] = useState([])
    // get tv series details
    useEffect(() => {
        setTvDetail(tvSeriesDetail)
    }, [tvSeriesDetail])
     // get cast data
    useEffect(() => { setMCast(cast) }, [cast])
    return (
        <div className='px-4 w-full overflow-x-hidden my-4'>
            <div className='  flex flex-col md:flex-row lg:flex-row  '>
                {/* poster img */}
                <img src={`${img_url}${tvDetail.poster_path}`} className='rounded-xl mx-8 h-[75%]' />
                {/* content */}
                <div className='flex flex-col md:px-12 lg:px-12 px-4 mt-4 md:mt-0 lg:mt-0 '>
                    <p className='text-4xl text-white'>{tvDetail.original_name}</p>
                    <div className='flex my-4 items-center mx-2'>
                        <div className='flex' style={{ color: "white", scale: 1.2 }}>
                            {tvDetail.popularity <= 10 ? (<><FaRegStarHalfStroke /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /></>) : tvDetail.popularity > 10 && tvDetail.popularity <= 20 ? (<><FaStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /></>) :
                                tvDetail.popularity > 20 && tvDetail.popularity <= 30 ? (<><FaStar /><FaRegStarHalfStroke /><FaRegStar /><FaRegStar /><FaRegStar /></>) : tvDetail.popularity > 30 && tvDetail.popularity <= 40 ? (<><FaStar /><FaStar /><FaRegStar /><FaRegStar /><FaRegStar /></>) : tvDetail.popularity > 40 && tvDetail.popularity <= 50 ? (<><FaStar /><FaStar /><FaRegStarHalfStroke /><FaRegStar /><FaRegStar /></>) : tvDetail.popularity > 50 && tvDetail.popularity <= 60 ? (<><FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar /></>) : tvDetail.popularity > 60 && tvDetail.popularity <= 70 ? (<><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke /><FaRegStar /></>) : tvDetail.popularity > 70 && tvDetail.popularity <= 80 ? (<><FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar /></>) : tvDetail.popularity > 80 && tvDetail.popularity <= 90 ? (<><FaStar /><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke /></>) : (<><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></>)}
                        </div>
                        <p className='text-white mx-3 text-xl'>( {tvDetail.vote_count} votes )</p>
                    </div>
                    <div className='grid grid-cols-4 gap-x-16 gap-y-2  font-bold my-4'>
                        <p className='text-[#87898E] w-100'>Language</p>
                        <p className='text-[#87898E]'>First Air</p>
                        <p className='text-[#87898E]'>Last Air</p>
                        <p className='text-[#87898E]'>Status</p>

                        <p className='text-white'>{tvDetail.original_language == 'en' ? 'English' : tvDetail.original_language == 'hi' ? 'Hindi' :
                            tvDetail.original_language == 'el' ? 'Greek' : tvDetail.original_language == 'it' ? 'Italian' :
                                tvDetail.original_language == 'ko' ? 'Korean' : 'N/A'}</p>
                        <p className='text-white'>{tvDetail.first_air_date}</p>
                        <p className='text-white '>{tvDetail.last_air_date}</p>
                        <p className='text-white line-clamp-1'>{tvDetail.status}</p>
                    </div>
                    {/* cast */}
                    <div >
                        <p className='text-white font-bold my-2'>Genres</p>
                        <div className='flex'>
                            {tvDetail.genres ? tvDetail.genres.map((val, index) => (
                                <p key={index} className='bg-white rounded px-2 py-1 me-2 font-bold text-sm'>{val.name}</p>
                            )) : (<p className='text-white'>Loading..</p>)}
                        </div>
                        <p className='text-white font-bold mt-6 mb-1'>Synopsis</p>
                        <p className='text-white'>{tvDetail.overview}</p>
                        <p className='text-white font-bold mt-6 mb-1'>Casts</p>
                        <div className='flex flex-wrap '>
                            {mCast ? mCast.map((val, index) => (
                                <p key={index} className='border-1 border-white rounded px-2 py-1 me-2 font-bold text-sm text-white my-1'>{val.name}</p>
                            )) : (<p className='text-white'>Loading..</p>)}
                        </div>
                        {/* links */}
                        <div className='flex font-bold mt-8'>
                            <Link to={tvDetail.homepage}><button className='flex items-center cursor-pointer text-white bg-gray-500 rounded px-6 py-2 text-sm me-4 ' >Website<FaLink className='ms-4' /></button></Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;