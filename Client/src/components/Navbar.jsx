import { MdMovie } from "react-icons/md";
import { RiLayoutGridFill, RiFilmFill, RiBookmarkFill } from "react-icons/ri";
import { TbDeviceTvOld } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../redux/slices/uiSlice";
import { get_movies,get_tvseries } from "../../redux/thunks/mediaThunks";
import { get_bookmark } from "../../redux/thunks/bookmarkThunks";
import { Link, useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useToast } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
export default function Navbar() {
    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()
    const activepath = useSelector(state => state.ui.active)
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
        <nav aria-label="Main navigation" className="bg-[#161D2F] shadow-lg shadow-black/10 md:rounded-xl px-2 lg:px-0 w-[100%] lg:w-auto lg:h-[90vh] relative">
            <div className="flex lg:flex-col justify-between items-center  mx-2 lg:my-8 ">
                {/* Logo */}
                <Link to="/" aria-label="Go to home"><MdMovie size={30} className="cursor-pointer transition-transform hover:scale-110" style={{ 'color': "#FC4747" }} /></Link>
                {/* options */}
                <div className="flex lg:flex-col items-center py-6  lg:h-100">
                    <Link to="/" aria-label="Home" title="Home" className={`rounded-md p-2 transition hover:bg-[#283044] focus:outline-none focus:ring-2 focus:ring-[#FC4747] ${activeP == 'Home' ? 'text-white' : 'text-[#5A698F]'}`} onClick={() => onSelect('Home')}><RiLayoutGridFill size={24} /></Link>
                    <Link to="/movies" aria-label="Movies" title="Movies" className={`rounded-md p-2 transition hover:bg-[#283044] focus:outline-none focus:ring-2 focus:ring-[#FC4747] ${activeP == 'Movie' ? 'text-white' : 'text-[#5A698F]'}`} onClick={() => onSelect('Movie')}><RiFilmFill size={24} /></Link>
                    <Link to="/tvseries" aria-label="TV series" title="TV series" className={`rounded-md p-2 transition hover:bg-[#283044] focus:outline-none focus:ring-2 focus:ring-[#FC4747] ${activeP == 'Tv' ? 'text-white' : 'text-[#5A698F]'}`} onClick={() => onSelect('Tv')}><TbDeviceTvOld size={24} /></Link>
                    <button type="button" aria-label="Bookmarks" title="Bookmarks" className={`rounded-md p-2 transition hover:bg-[#283044] focus:outline-none focus:ring-2 focus:ring-[#FC4747] ${activeP == 'Bookmark' ? 'text-white' : 'text-[#5A698F]'}`} onClick={() => onSelect('Bookmark')}><RiBookmarkFill size={24} /></button>
                </div>
                
                {/* SignIn/Logout */}
                <div className="flex lg:flex-col items-center justify-end lg:absolute lg:bottom-0 lg:pb-8">
                    {localStorage.getItem("accesstoken") ? (<LiaSignOutAltSolid className="cursor-pointer" size={24} style={{ color: "white" }} onClick={() => Logout()} />) :
                        <Link to="/signup"> <div className="flex justify-center items-center  w-8 h-8 rounded-full cursor-pointer bg-[#5A698F]">
                            <CgProfile size={30} className="text-[##384259]" />
                        </div></Link>
                    }
                </div>
            </div>

        </nav>
    )
}
