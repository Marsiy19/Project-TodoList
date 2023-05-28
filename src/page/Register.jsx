import React, { useEffect, useState } from "react"
import '../styles/Register.scss'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../redux/register/asyncAction"
import { Button } from "antd"
import store from "../redux/store"


 const Register = () => {


    const {token} = useSelector(store => store.register)

    useEffect(() => {
        if(token) {
            navigate("/", {replace: true})
        }
    },[])

    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        password: '',
        password2: ''
    })



    const dispatch = useDispatch()
    const navigate = useNavigate()



    const handleChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };

    const signRegister = (e) => {
        e.preventDefault()
        dispatch(registerUser(userData))


        console.log(userData.name);
        console.log(userData.phone);
        console.log(userData.password);


        setUserData(
            {
                name: '',
                phone: '',
                password: '',
                password2: ''
            }

        )
    }



    return (
        <> 
            <div className="register w-full flex items-center h-screen justify-center mx-auto  ">
                <div className="register__content w-[45%] mx-auto flex flex-col gap-[50px] bg-white py-[50px] px-[30px] rounded-md shadow-md">
                    <h1 className='text-center text-3xl font-semibold  text-indigo-600  font-mono'>Register</h1>

                    <form onSubmit={signRegister} className="flex flex-col  gap-6">
                        <fieldset className='border rounded-3xl px-[15px] flex items-center py-[6px] ' >
                            <legend className='text-gray-600 px-[10px] ml-[10px] '>name</legend>
                            <input name="name" onChange={handleChange}className="border-none outline-none px-[10px] w-full " type="text" required placeholder="Marsiy Poliy"/>
                        </fieldset>

                        <fieldset  className='border rounded-3xl px-[15px] flex items-center py-[6px] ' >
                            <legend className='text-gray-600 px-[10px] ml-[10px]'>phone</legend>

                            <input  name="phone" onChange={handleChange} className="border-none outline-none px-[10px] w-full" type="phone" required placeholder="+998901234567"/>
                        </fieldset>

                        <fieldset  className='border rounded-3xl px-[15px] flex items-center py-[6px] '>
                            <legend className='text-gray-600 px-[10px] ml-[10px]'>password</legend>
                            <input  name="password" onChange={handleChange} className="border-none outline-none w-full px-[10px]"  type="password" required placeholder="**********"/>
                        </fieldset>

                        <fieldset  className='border rounded-3xl px-[15px] flex items-center py-[6px] '>
                            <legend className='text-gray-600 px-[10px]  ml-[10px]'>configure password</legend>
                            <input name="password2" onChange={handleChange} className="border-none outline-none px-[10px] w-full" type="password" required placeholder="**********"/>
                        </fieldset>

                        <div className="btn flex flex-col gap-6">


                            <button  type="primary" className=" hover:bg-indigo-500 hover:text-white text-indigo-500 text-xl rounded-3xl py-2 shadow-md shadow-indigo-300 transition easy ">Register</button>

                            <Link to={'/login'} className="w-full">

                                <Button type="default" className=" pb-[35px]   rounded-3xl border-indigo-500 text-xl text-indigo-500 transition easy w-full" >Login</Button>

                            </Link>

                        </div>


                    </form>
                </div>
            </div>

        </>
    )
 }

 export default Register




















































