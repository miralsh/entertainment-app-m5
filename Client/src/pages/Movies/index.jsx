import { useState } from 'react';
import { LuSearch } from "react-icons/lu";
import Movies from "../../components/Movies";
import { useDispatch } from 'react-redux';
import { clearMediaSearchList } from '../../../redux/slices/mediaSlice';
import { search_movie } from '../../../redux/thunks/mediaThunks';
//import { clear_search_list, search_movie } from '../../../redux/action';
const index = () => {
    const [inp, setInp] = useState('')
    const dispatch = useDispatch()
    let debounceTimer;
    //on search 
    const onSearch = (e) => {
        setInp(e.target.value)
        clearTimeout(debounceTimer);
        // debouncing to limit the search query and improve performance
        debounceTimer = setTimeout(() => {
            // clear list on value empty
            if (e.target.value.trim() == "") {
                dispatch(clearMediaSearchList())
            } else {
                // call search movie api
                dispatch(search_movie({movieName:e.target.value, pg:1}))
            }
        }, 500);
    }
    return (
        < div className="px-2 w-full overflow-x-hidden scrollbar-hide">
            {/* search bar */}
            <div className="flex items-center my-4  lg:mx-6 mx-2">
                <LuSearch style={{ 'color': 'white' }} size={24} />
                <input placeholder="Search for movies" type="search" className="md:text-xl w-100 mx-2 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E]  text-white focus:caret-[#FC4747] focus:border-b-1 focus:border-b-[#5A698F]" onChange={(e) => onSearch(e)} value={inp} />
            </div>
            {/* Movies */}
            <h2 className="text-white md:text-2xl text-xl  lg:mx-6 mx-2">Movies</h2>
            <Movies val={inp} />
        </div>
    );
};

export default index;