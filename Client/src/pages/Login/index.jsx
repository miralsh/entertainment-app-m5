import { useEffect, useState } from "react";
import { MdMovie } from "react-icons/md";
import { emailRegex, pwRegex } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { get_user, login } from "../../../redux/thunks/authThunks";
import { get_bookmark } from "../../../redux/thunks/bookmarkThunks";
import { setActive } from "../../../redux/slices/uiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
export default function Login() {
    const toast = useToast()
    const dispatch = useDispatch()
    const login_status = useSelector(state => state.auth.login)
    const login_err = useSelector(state => state.auth.login_error)
    const [error, setError] = useState({ emailError: '', passwordError: '', confirmPwError: '' })
    const [valid, setValid] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    useEffect(() => {
        console.log("user "+JSON.stringify(user))
        if(user.length!=0){
        localStorage.setItem("user_id", user.id)
        dispatch(get_bookmark(user.id))
         dispatch(setActive('Home'))
        navigate("/");
        }
      
    }, [user])
    useEffect(() => {
        if (login_status.statusCode == 200) {
            if (login_status.httpResponse.accessToken != "") {
                toast({
                    title: 'Success',
                    description: 'Login successful',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                localStorage.setItem("accesstoken", login_status.httpResponse.accessToken)
                dispatch(get_user())
                     
               // navigate("/");
            }
        } else if (login_status.httpResponse != undefined) {
            // alert(login_status.httpResponse)
            toast({
                title: 'Error',
                description: JSON.stringify(login_status.httpResponse),
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        console.log(login_status)
    }, [login_status])
    useEffect(() => {
        if (login_err.message != undefined) {
            // alert(JSON.stringify(login_err.message))
            toast({
                title: 'Error',
                description: JSON.stringify(login_err.message),
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }, [login_err])
    const handleInput = (e) => {
        if (e.target.id == "email") {
            validateEmail(e.target.value)
        } else if (e.target.id == "password") {
            validatePassword(e.target.value)
        }
    }
    const validateEmail = (val) => {
        let err = error.emailError
        let isValid = valid
        if (val.trim() == '') {
            isValid = false
            err = "Can't be empty"
        }
        else if (!emailRegex.test(val)) {
            isValid = false
            err = "invalid email"
            console.log(err)
        } else {
            isValid = true
            err = ""

        }
        setEmail(val)
        setError({ ...error, emailError: err })
        setValid(isValid)

        return isValid
    }
    const validatePassword = (val) => {
        let err = error.passwordError
        let isvalid = valid
        if (val.trim() == '') {
            isvalid = false
            err = "Can't be empty"
        } else if (val.length < 8) {
            isvalid = false
            err = "Password should be atleast 8 characters long"
        } else if (!pwRegex.test(val)) {
            isvalid = false
            err = "Password should contain atleast one uppercase, one lowercase, one digit and a special character"
        } else {
            isvalid = true
            err = ""
        }
        setPassword(val)
        setError({ ...error, passwordError: err })
        setValid(isvalid)
        console.log(err, isvalid)
        return isvalid
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateEmail(email) && validatePassword(password)) {
            setEmail("")
            setPassword("")
            const user = { email, password }
            console.log(user)
            dispatch(login(user))
        }
    }
    return (
        <div className="flex justify-center w-full min-h-screen overflow-x-hidden">
            <div className="flex flex-col lg:mx-auto items-center px-6">
                <MdMovie size={30} className="cursor-pointer my-14" style={{ 'color': "#FC4747" }} />
                <div className="flex flex-col  bg-[#161D2F] rounded-xl py-4 px-6 mx-12 ">
                    <p className="text-2xl text-white my-2 font-light">Login</p>
                    <form className="flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
                        <div className="relative w-full">
                            <input id="email" placeholder="Email address" type="email" value={email} className={`w-full text-sm w-75 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E] border-b-2 border-b-[#5A698F] text-white focus:caret-[#FC4747] focus:border-b-white ${error.emailError ? 'border-b-[#FC4747] ' : 'border-b-[#5A698F] '}`} onInput={(e) => handleInput(e)} />
                            {error.emailError && (
                                <span className="absolute right-2 -translate-y-1/2 top-1/2 text-xs text-[#FC4747]">{error.emailError}</span>
                            )}
                        </div>
                        <div className="relative w-full" data-tip="This is the text of the tooltip2">
                            <input id="password" placeholder="Password" type="password" value={password} className={`w-full text-sm w-75 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E] border-b-2 border-b-[#5A698F] text-white focus:caret-[#FC4747] focus:border-b-white 
                        ${error.passwordError != "" ? 'border-b-[#FC4747] ' : 'border-b-[#5A698F] '}`} onInput={(e) => handleInput(e)} />
                            {error.passwordError && (
                                <span className="absolute right-2 -translate-y-1/2 top-1/2 text-xs text-[#FC4747] w-1/2 line-clamp-2 text-right">{error.passwordError}</span>
                            )}
                        </div>
                        <button type="submit" className="text-sm w-75 bg-[#FC4747] text-white rounded my-4 py-2 hover:bg-white hover:text-black">Login to your account</button>
                    </form>
                    <p className="my-2 text-white text-sm text-center">Don't have an account? <Link to="/signup"><span className="mx-2 text-[#FC4747]">Sign Up</span></Link></p>
                </div>
            </div>
        </div>
    )
}