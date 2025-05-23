import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { img_url, url } from '../../constants';
const Trending = () => {

    const trending = useSelector(state => state.trending)
    const [trendinglist, setTrendingList] = useState([])


    useEffect(() => { setTrendingList(trending) }, [trending])
    return (
        <div className='flex  w-full overflow-x-auto my-4'>
            {trendinglist ? trendinglist.map((element) => {
                return (
                    <div className='flex me-6 '>
                        <div className='rounded bg-cover w-[300px] h-100' style={{ backgroundImage: `url(${img_url}${element.poster_path})` }}>


                            <p className='flex items-end  text-white mx-2'>{element.title}</p>
                        </div>
                    </div>
                )
            }) : <>Loading...</>}
        </div>
    );
};

export default Trending;