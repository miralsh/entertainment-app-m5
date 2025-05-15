import { MdMovie } from "react-icons/md";
import { RiLayoutGridFill, RiFilmFill, RiBookmarkFill } from "react-icons/ri";
import { TbDeviceTvOld } from "react-icons/tb";
import img from "../assets/react.svg"
import { useState } from "react";
export default function Navbar() {
    const [active,setActive]=useState('Home');
    const onSelect=(val)=>{
        setActive(val)
    }
    return (
        <div className="mx-auto  bg-[#161D2F] rounded-xl px-2 lg:px-0 w-[100%] lg:w-auto">
            <div className="flex lg:flex-col justify-between items-center  mx-2 lg:my-8">
                <MdMovie size={30} className="cursor-pointer" style={{'color':"#FC4747"}}/>
                <div className="flex lg:flex-col items-center py-6  lg:h-100">
                    <RiLayoutGridFill className={`lg:my-4  mx-2 ${active=='Home' ? 'text-white':'text-[#5A698F]'} cursor-pointer` } size={24}  onClick={()=>{onSelect('Home')}}/>
                    <RiFilmFill className={`lg:my-4 mx-2  ${active=='Movie' ? 'text-white':'text-[#5A698F]'}  cursor-pointer`} size={24} onClick={()=>{onSelect('Movie')}}/>
                    <TbDeviceTvOld className={`lg:my-4  mx-2 ${active=='Tv' ? 'text-white':'text-[#5A698F]'} cursor-pointer`} size={24} onClick={()=>{onSelect('Tv')}}/>
                    <RiBookmarkFill className={`lg:my-4 mx-2  ${active=='Bookmark' ? 'text-white':'text-[#5A698F]'} cursor-pointer`} size={24} onClick={()=>{onSelect('Bookmark')}}/>
                </div>
                <div className="flex lg:flex-col items-center justify-end ">
                    <div className="flex p-1 w-8 h-8 rounded-full bg-white cursor-pointer">
                        <img src={img} />
                    </div>
                </div>
            </div>

        </div>
    )
}