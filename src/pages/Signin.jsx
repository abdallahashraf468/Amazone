import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { darkLogo, AmazonEgypt } from "../assets/index";
import * as EmailValidator from "email-validator";
import passwordRegexp from "password-regexp";
import { useNavigate } from "react-router-dom";
import {login} from "../firebase/auth"
import toast,{ Toaster } from 'react-hot-toast';
import { authContext } from "../Contexts/isAuth";



export default function Signin(props) {


    // const {setLogin,setDisplayName }=useContext(authContext)
    const {setLogin,setDisplayRes }=useContext(authContext)
    const navigate = useNavigate();
    const [user, setUser] = useState({
      email: "",
      password: "",
    });
  
    const [errors, setErrors] = useState({
      emailError: "",
      passwordError: "",
    });
  
    const handleForm = (evt) => {
    //   const { name, value } = evt.target;
  
     if (evt.target.name === "email") {
        setUser({ ...user, email: evt.target.value });
        setErrors({
          ...errors,
          emailError:
          evt.target.value.length === 0
              ? "Email is required"
              : EmailValidator.validate(evt.target.value)
              ? ""
              : "Please Enter a Valid Email",
        });
      }
      else if (evt.target.name === "password") {
        setUser({ ...user, password: evt.target.value });
        setErrors({
          ...errors,
          passwordError:
          evt.target.value.length === 0
              ? "Password is Required"
              : passwordRegexp().test(evt.target.value)
              ? ""
              : "Password must be at least 3 characters",
        });
      }
    };
  
    const signinhandle = async (e) => {
      e.preventDefault();
      try{
        if (errors.emailError||errors.passwordError) {
  
        toast.error("write a Valid Email or password")
  
      }else{
        const res= await login(user.email,user.password)
        console.log(res)
        localStorage.setItem('token',res.user.accessToken) 
        localStorage.setItem('displayName', res.user.displayName);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('creatAt', res.user.metadata.creationTime);




        setLogin(true)
         navigate("/")
  
      }
      }catch(err){
        toast.error(" some thing is wrong ")
    }
    };

    return (
        <>
            <div className="w-full"  onSubmit={signinhandle}>
                <div className="w-full bg-white pb-10">
                    <form className="w-[350px] mx-auto flex flex-col items-center">
                        <Link to="/">
                            <img className="w-32" src={darkLogo} alt="darkLogo"/>
                        </Link>
                        <div className="w-full border border-zinc-200 p-6">
                            <h2 className="font-titleFont text-3xl font-medium mb-4">
                                Sign in
                            </h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email or mobile phone number
                                    </label>
                                    <input
                                     name="email"
                                     value={user.email}
                                     onChange={handleForm}
                                        type="email"
                                        id="email"
                                        className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                                    />
                                              <p style={{ color: "red" }}>{errors.emailError}</p>

                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </label>
                                    <input
                                    name="password"
                                    value={user.password}
                                    onChange={handleForm}
                                        type="password"
                                        id="password"
                                        className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                                    />
                                </div>
                                <button
                                    className="w-full py-1.5 text-sm font-normal rounded-lg bg-gradient-to-t from-[#ffd814] to-[#ffd814] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                                >
                                    Continue
                                </button>
                            </div>
                            <p className="text-xs text-black leading-4 mt-4">
                                By Continuing, you agree to Amazon's{' '}
                                <span className="text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Conditions of Use </span>and{' '}
                                <span className="text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Privacy Notice.</span>
                            </p>
                            <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
                                <ArrowRightIcon />{' '}
                                <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                                    Need help?
                                </span>
                            </p>
                        </div>
                        <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
                            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
                            <span className="w-1/3 text-center">New to Amazon?</span>
                            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
                        </p>
                        <Link className="w-full" to="/register">
                            <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput" onClick={() => {
            navigate(`/register`);
          }}>
                                Create your Amazon account
                            </button>
                        </Link>
                    </form>
                </div>
                <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
                    <div className="flex items-center gap-6">
                        <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                            Conditions of Use
                        </p>
                        <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                            Privacy Notice
                        </p>
                        <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                            Privacy Notice
                        </p>
                    </div>
                    <p className="text-xs text-gray-600">
                        © 1996-2023, ReactBd.com, Inc. or its affiliates
                    </p>
                </div>
            </div>
            <Toaster  position ="top-center" /> 
        </>

    )
}