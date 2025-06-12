import { useEffect, useState } from "react";
import { MdMovie } from "react-icons/md";
import { emailRegex, pwRegex } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../../redux/slices/uiSlice";
import { signup } from "../../../redux/thunks/authThunks";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
export default function Signup() {
    const dispatch = useDispatch()
    const toast = useToast()
    const status = useSelector(state => state.auth.signup)
    const signup_err = useSelector(state => state.auth.signup_error)
    const [error, setError] = useState({ emailError: '', passwordError: '', confirmPwError: '' })
    const [valid, setValid] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpw, setConfirmPW] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (status.statusCode == 201) {
            if (status.httpResponse.email != "") {
            toast({
                title: 'Success',
                description: 'Signup successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
                // alert("Signup successful")
                 dispatch(setActive(''))
                navigate("/login")
            }
        } else if (status.httpResponse != undefined) {

            //  alert(status.httpResponse)
            toast({
                title: 'Error',
                description: JSON.stringify(status.httpResponse),
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        console.log(status)
    }, [status])
    useEffect(() => {
        if (signup_err.message != undefined) {
            toast({
                title: 'Error',
                description: JSON.stringify(signup_err.message),
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            //alert(JSON.stringify(signup_err.message))
        }
    }, [signup_err])
    //     useEffect(() => {
    //     if (login_status.status == 200) {
    //         if (status.httpResponse.accesstoken != "") {
    //            Navigate()
    //         }
    //     } else if (status.httpResponse != undefined) {
    //         alert(status.httpResponse)
    //     }
    //     console.log(status)
    // }, [login_status])
    // useEffect(() => {
    //     if (signup_err.message != undefined) {
    //         alert(JSON.stringify(signup_err.message))
    //     }
    // }, [signup_err])
    const handleInput = (e) => {
        if (e.target.id == "email") {
            validateEmail(e.target.value)
        } else if (e.target.id == "password") {
            validatePassword(e.target.value)
        } else if (e.target.id == "confirmpw") {
            validatePWMatch(e.target.value)
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

    const validatePWMatch = (val) => {
        let err = error.confirmPwError
        let isvalid = valid
        if (val.trim() == "") {
            isvalid = false
            err = "Can't be empty"
        } else if (val != password) {
            isvalid = false
            err = "Passwords do not match"
        } else {
            isvalid = true
            err = ""
        }
        setConfirmPW(val)
        setError({ ...error, confirmPwError: err })
        setValid(isvalid)
        return isvalid
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateEmail(email) && validatePassword(password) && validatePWMatch(confirmpw)) {
            setEmail("")
            setPassword("")
            setConfirmPW("")
            const user = { email, password }
            console.log(user)
            dispatch(signup(user))
        }
    }
    return (
        <div className="flex justify-center w-full min-h-screen overflow-x-hidden">
            <div className="flex flex-col lg:mx-auto items-center px-6">
                <MdMovie size={30} className="cursor-pointer my-14" style={{ 'color': "#FC4747" }} />
                <div className="flex flex-col  bg-[#161D2F] rounded-xl py-4 px-6 mx-12 ">
                    <p className="text-2xl text-white my-2 font-light">Sign up</p>
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
                        <div className="relative w-full">
                            <input id="confirmpw" placeholder="Repeat password" type="password" value={confirmpw} className={`text-sm w-75 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E] border-b-2 border-b-[#5A698F] text-white focus:caret-[#FC4747] focus:border-b-white ${error.confirmPwError ? 'border-b-[#FC4747] ' : 'border-b-[#5A698F] '}`} onInput={(e) => handleInput(e)} />
                            {error.confirmPwError && (
                                <span className="absolute right-2 -translate-y-1/2 top-1/2 text-xs text-[#FC4747]">{error.confirmPwError}</span>
                            )}
                        </div>
                        <button type="submit" className="text-sm w-75 bg-[#FC4747] text-white rounded my-4 py-2 hover:bg-white hover:text-black">Create an account</button>
                    </form>
                    <p className="my-2 text-white text-sm text-center">Already have an account? <a href="/login"><span className="mx-2 text-[#FC4747]">Login</span></a></p>
                </div>
            </div>
        </div>
    )
}
// import React, { useState } from 'react';
// import '../.././Input.css';

// const Signup = () => {
//   const [value, setValue] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (value.trim() === '') {
//       setError("Can't be empty");
//     } else {
//       setError('');
//       alert('Submitted!');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className='bg-white'>
//       <div className={`input-wrapper ${error ? 'error' : ''}`}>
//         {!value && (
//           <>
//             <span className="placeholder-left">Password</span>
//             <span className="placeholder-right">{error}</span>
//           </>
//         )}
//         <input
//           type="text"
//           value={value}
//           onInput={(e) => {
//             setValue(e.target.value);
//             setError('');
//           }}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Signup;
