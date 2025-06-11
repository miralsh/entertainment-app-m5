
import { LuSearch } from "react-icons/lu";
import Bookmarked from "../../components/Bookmarked"
import { useDispatch } from "react-redux";
import { clear_search_list, searchBookmark } from "../../../redux/action";
import { useState } from "react";
import { useEffect } from "react";
const index = () => {
    const [val, setVal] = useState('')
    const dispatch = useDispatch()
    let debounceTimer;
    //on search
    const search = (e) => {
        setVal(e.target.value)
        clearTimeout(debounceTimer);
        // debouncing to limit the search query and improve performance
        debounceTimer = setTimeout(() => {
            dispatch(searchBookmark(e.target.value))
        }, 500);
    }
    //clear search list on empty input
      useEffect(() => {
        if (val == '') {
          dispatch(clear_search_list())
        }
      }, [val])
    return (
        < div className="px-4 w-full overflow-x-hidden scrollbar-hide">
            {/* search bar */}
            <div className="flex items-center my-4 lg:mx-6">
                <LuSearch style={{ 'color': 'white' }} size={24} />
                <input placeholder="Search for bookmarked shows" type="search" className="text-xl w-100 mx-2 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E]  text-white focus:caret-[#FC4747] focus:border-b-1 focus:border-b-[#5A698F]" onChange={(e) => search(e)} value={val} />
            </div>
            {/* bookmark */}
            <h2 className="text-white text-2xl lg:mx-6">Bookmarked Movies</h2>
            <Bookmarked />
        </div>
    );
};


export default index;