import { MdMovie } from "react-icons/md";
export default function Login() {
        return (
        <div className="flex justify-center w-full">
        <div className="flex flex-col lg:mx-auto items-center px-6">
            <MdMovie size={30} className="cursor-pointer my-14" style={{ 'color': "#FC4747" }} />
            <div className="flex flex-col  bg-[#161D2F] rounded-xl py-4 px-6 mx-12 ">
                <p className="text-2xl text-white my-2 font-light">Login</p>
                <form className="flex flex-col items-center">
                    <input placeholder="Email address" type="email" className="text-sm w-75 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E] border-b-2 border-b-[#5A698F] text-white focus:caret-[#FC4747] focus:border-b-white" />
                    <input placeholder="Password" type="password" className="text-sm w-75 focus:outline-hidden px-2 py-2 my-2 placeholder-[#87898E] border-b-2 border-b-[#5A698F] text-white focus:caret-[#FC4747] focus:border-b-white"  />
                    
                    <button className="text-sm w-75 bg-[#FC4747] text-white rounded my-4 py-2 hover:bg-white hover:text-black">Login to your account</button>
                </form>
                <p className="my-2 text-white text-sm text-center">Don't have an account? <a href="/signup"><span className="mx-2 text-[#FC4747]">Sign Up</span></a></p>
            </div>
        </div>
        </div>
    )
}