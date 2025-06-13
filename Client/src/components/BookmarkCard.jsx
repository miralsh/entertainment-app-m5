
import { img_url } from '../../constants';
import { RiBookmarkFill, RiBookmarkLine, RiFilmFill } from 'react-icons/ri';
import { TbDeviceTvOld } from 'react-icons/tb';
import { getYear } from '../helper';
const BookmarkCard = ({element,isMovie,onSelect,onBookMark,isBookmarked,certification}) => {
    return (
          <div>
                                {/* movie poster img */}
                                <div  className='w-[90%] me-4 bg-cover rounded-xl h-45 my-2 cursor-pointer hover:shadow-sm hover:shadow-white' style={{ backgroundImage: `url(${element.backdrop_path != null ? img_url + element.backdrop_path : 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg'})` }} onClick={() => onSelect(element)}>
                                    {/* bookmark */}
                                    <div className='group flex justify-end pt-2 pe-2'>
                                        <div className="flex p-1 w-8 h-8 rounded-full bg-gray-700 opacity-75 cursor-pointer items-center justify-center group-hover:bg-white" onClick={(e) => { e.stopPropagation(); onBookMark(element) }}>
                                            {isBookmarked ? (<RiBookmarkFill className={`group-hover:text-black  text-white `} />) : (<RiBookmarkLine className={`group-hover:text-black  text-white `} />)}
                                        </div>
                                    </div>
        
                                </div>
                                {/* content */}
                                <div className='flex flex-col'>
                                    <div className='flex items-center'>
                                        <p className='flex  items-center text-gray-200 py-1 md:ps-4 md:pe-2 text-xs md:text-sm px-1 '>{getYear(isMovie?element.release_date:element.first_air_date)}</p>
                                        <hr className=" w-1 border-white border-dotted border-t-4" />
                                        <p className='flex items-center md:px-2 text-xs md:text-sm text-gray-200 capitalize'>{isMovie?<RiFilmFill className='px-1' size={26} style={{ color: 'white' }} />:<TbDeviceTvOld className='px-1' size={26} style={{ color: 'white' }} />}{isMovie?'Movie':'TV'}</p>
                                        <hr className=" w-1 border-white border-dotted border-t-4 mx-1" />
                                        <p className='flex items-center md:px-2 text-xs md:text-sm text-gray-200 capitalize'>{certification|| 'Loading...'}</p>
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
    );
};

export default BookmarkCard;