import React, { useEffect, useState } from "react"
import '../styles/Register.scss'
import { Link, useNavigate } from "react-router-dom"
import '../styles/Login.scss'
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../redux/login/asyncAction"
import store from "../redux/store"


 const Login = () => {


    const {token} = useSelector(store => store.register)


    useEffect(() => {
        if(token) {
            navigate("/", {replace: true})
        }
    },[])

    const [userData, setUserData] = useState({
        phone: '',
        password: '',
        token: token,
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };

    const signLogin = (e) => {
        e.preventDefault()
        dispatch(loginUser(userData))
        
        console.log(userData.phone);
        console.log(userData.password);

        setUserData({
            phone: '',
            password: '',

        })

    }


    return (
        <> 
            <div className="login w-full flex items-center h-screen justify-center mx-auto bg-indigo-600 ">
                <div className="login__content w-[45%] mx-auto flex flex-col gap-[50px] bg-white py-[50px] px-[30px] rounded-md shadow-md">
                    <h1 className='text-center text-3xl font-semibold text-indigo-600 font-mono'>Login</h1>

                    <form onSubmit={signLogin} className="flex flex-col  gap-6">


                        <fieldset  className='border rounded-3xl px-[15px] flex items-center py-[6px] ' >
                            <legend className='text-gray-600 px-[10px] ml-[10px]'>phone</legend>

                            <input name="phone" onChange={handleChange}  className="border-none outline-none w-full px-[10px]" type="phone" required placeholder="+998901234567"/>
                        </fieldset>

                        <fieldset  className='border rounded-3xl px-[15px] flex items-center py-[6px] '>
                            <legend className='text-gray-600 px-[10px] ml-[10px]'>password</legend>
                            <input name="password" onChange={handleChange}  className="border-none outline-none w-full px-[10px]"  type="password" required placeholder="**********"/>
                        </fieldset>

                        <div className="btn flex flex-col gap-6">



                                <button  className="  hover:bg-indigo-500 hover:text-white text-indigo-500 text-xl rounded-3xl py-2 shadow-md shadow-indigo-300 transition easy " >Login</button>

                        </div>


                    </form>
                </div>
            </div>

        </>
    )
 }

 export default Login