import { MdMovie } from "react-icons/md";
import { RiLayoutGridFill, RiFilmFill, RiBookmarkFill } from "react-icons/ri";
import { TbDeviceTvOld } from "react-icons/tb";
import img from "../assets/react.svg"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_bookmark, get_movies, get_tvseries, setActive } from "../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useToast } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
export default function Navbar() {
    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()
    const activepath = useSelector(state => state.active)
    const [activeP, setActiveP] = useState('Home');
    // tracks active path to highlight the icon
    useEffect(() => {
        setActiveP(activepath)
    }, [activepath])

    // on click of navbar options
    const onSelect = (val) => {
        if (val == 'Movie') {
            dispatch(setActive(val))
            dispatch(get_movies(1))
        }
        if (val == 'Tv') {
            dispatch(setActive(val))
            dispatch(get_tvseries(1))
        }
        if (val == 'Bookmark') {
            if (localStorage.getItem("accesstoken") != null) {
                dispatch(setActive(val))
                navigate("/bookmarked")
                console.log(localStorage.getItem("user_id"))
                dispatch(get_bookmark(localStorage.getItem("user_id")))
            } else {
                dispatch(setActive(''))
                navigate("/login")
            }
        }
        dispatch(setActive(val))
        setActiveP(val)

    }

    // on logout click 
    const Logout = () => {
        // delete access token and user id from local storage
        localStorage.removeItem("accesstoken")
        localStorage.removeItem("user_id")
        localStorage.clear()

        // show toast message
        toast({
            title: 'Success',
            description: `Logout successful`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })

        // go to home screen
        dispatch(setActive('Home'))
        navigate("/");
        window.location.reload();
    }
    return (
        <div className="  bg-[#161D2F] md:rounded-xl px-2 lg:px-0 w-[100%] lg:w-auto">
            <div className="flex lg:flex-col justify-between items-center  mx-2 lg:my-8 ">
                {/* Logo */}
                <Link to="/"><MdMovie size={30} className="cursor-pointer" style={{ 'color': "#FC4747" }} /></Link>
                {/* options */}
                <div className="flex lg:flex-col items-center py-6  lg:h-100">
                    <Link to="/"><RiLayoutGridFill className={`lg:my-4  mx-2 ${activeP == 'Home' ? 'text-white' : 'text-[#5A698F]'} cursor-pointer`} size={24} onClick={() => { onSelect('Home') }} /></Link>
                    <Link to="/movies"><RiFilmFill className={`lg:my-4 mx-2  ${activeP == 'Movie' ? 'text-white' : 'text-[#5A698F]'}  cursor-pointer`} size={24} onClick={() => { onSelect('Movie') }} /></Link>
                    <Link to="/tvseries"><TbDeviceTvOld className={`lg:my-4  mx-2 ${activeP == 'Tv' ? 'text-white' : 'text-[#5A698F]'} cursor-pointer`} size={24} onClick={() => { onSelect('Tv') }} /></Link>
                    <RiBookmarkFill className={`lg:my-4 mx-2  ${activeP == 'Bookmark' ? 'text-white' : 'text-[#5A698F]'} cursor-pointer`} size={24} onClick={() => { onSelect('Bookmark') }} />
                </div>
                
                {/* SignIn/Logout */}
                <div className="flex lg:flex-col items-center justify-end ">
                    {localStorage.getItem("accesstoken") ? (<LiaSignOutAltSolid className="cursor-pointer" size={24} style={{ color: "white" }} onClick={() => Logout()} />) :
                        <Link to="/signup"> <div className="flex justify-center items-center  w-8 h-8 rounded-full cursor-pointer bg-[#5A698F]">
                            <CgProfile size={30} className="text-[##384259]" />
                        </div></Link>
                    }
                </div>
            </div>

        </div>
    )
}