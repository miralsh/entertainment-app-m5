import React, { useState } from 'react';
import { LuSearch } from "react-icons/lu";
import Tv from "../../components/Tv";
import { useDispatch } from 'react-redux';
import { clear_search_list, search_tv } from '../../../redux/action';
const index = () => {
    const [val, setVal] = useState('')
    const dispatch = useDispatch()
    let debounceTimer;
    //on search 
    const onSearch = (e) => {
        setVal(e.target.value)
        clearTimeout(debounceTimer);
        // debouncing to limit the search query and improve performance
        debounceTimer = setTimeout(() => {
            // clear list on value empty
            if (e.target.value.trim() == "") {
                dispatch(clear_search_list())
            } else {
                // call search tv series api
                dispatch(search_tv(e.target.value, 1))
            }
        }, 500);
    }
    return (

        < div className="lg:px-4 px-2 w-full overflow-x-hidden scrollbar-hide">
              {/* search bar */}
            <div className="flex items-center my-4 lg:mx-6 mx-2">
                <LuSearch style={{ 'color': 'white' }} size={24} />
                <input placeholder="Search for TV Series" type="search" value={val} className="text-xl w-100 mx-2 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E]  text-white focus:caret-[#FC4747] focus:border-b-1 focus:border-b-[#5A698F]" onChange={(e) => onSearch(e)} />
            </div>
            {/* TV Series */}
            <h2 className="text-white text-2xl mx-2 lg:mx-6 ">TV Series</h2>
            <Tv search={val} />
        </div>
    );
};

export default index;