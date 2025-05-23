import { LuSearch } from "react-icons/lu";
export default function Home(){
    return(
        < div className="mx-8">
        <div className="flex items-center my-4">
          <LuSearch style={{'color':'white'}} size={24}/>
          <input placeholder="Search for movies or TV series" type="search" className="text-xl w-100 mx-2 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E]  text-white focus:caret-[#FC4747] focus:border-b-1 focus:border-b-[#5A698F]" />  
        </div>
        <h2 className="text-white text-2xl ">Trending</h2>

        </div>
    )
}