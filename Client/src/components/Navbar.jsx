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
        <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0B0D]/95 px-3 shadow-lg shadow-black/30 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 md:h-[4.75rem] md:px-5">
                {/* Logo */}
                <Link to="/" aria-label="CineVault home" className="flex shrink-0 items-center gap-2 text-white"><MdMovie size={30} className="cursor-pointer transition-transform hover:scale-110" style={{ 'color': "#E50914" }} /><span className="hidden text-lg font-bold tracking-tight sm:block">CineVault</span></Link>
                {/* options */}
                <div className="flex min-w-0 flex-1 items-center justify-end gap-2 overflow-x-auto py-2 sm:justify-start sm:gap-4 md:gap-8">
                    <Link to="/" aria-label="Home" className={`inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] ${activeP == 'Home' ? 'text-white' : 'text-[#B3B3B3]'}`} onClick={() => onSelect('Home')}><RiLayoutGridFill size={20} /><span className="hidden md:inline">Home</span></Link>
                    <Link to="/movies" aria-label="Movies" className={`inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] ${activeP == 'Movie' ? 'text-white' : 'text-[#B3B3B3]'}`} onClick={() => onSelect('Movie')}><RiFilmFill size={20} /><span className="hidden md:inline">Movies</span></Link>
                    <Link to="/tvseries" aria-label="TV series" className={`inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] ${activeP == 'Tv' ? 'text-white' : 'text-[#B3B3B3]'}`} onClick={() => onSelect('Tv')}><TbDeviceTvOld size={20} /><span className="hidden md:inline">TV Series</span></Link>
                    <button type="button" aria-label="Bookmarks" className={`inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] ${activeP == 'Bookmark' ? 'text-white' : 'text-[#B3B3B3]'}`} onClick={() => onSelect('Bookmark')}><RiBookmarkFill size={20} /><span className="hidden md:inline">My List</span></button>
                </div>
                
                {/* SignIn/Logout */}
                <div className="flex shrink-0 items-center justify-end">
                    {localStorage.getItem("accesstoken") ? (<button type="button" aria-label="Sign out" title="Sign out" className="rounded-md p-2 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E50914]" onClick={Logout}><LiaSignOutAltSolid size={23} /></button>) :
                        <Link to="/signup" aria-label="Create an account"> <div className="flex h-9 w-9 items-center justify-center rounded bg-[#E50914] transition hover:bg-[#F6121D]">
                            <CgProfile size={25} className="text-white" />
                        </div></Link>
                    }
                </div>
            </div>

        </nav>
    )
}
