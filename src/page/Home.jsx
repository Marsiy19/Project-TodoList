import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { Spin } from 'antd';
import "../styles/Home.scss"
import api from '../api/api'


const Home = () => {

  
  const [categories, setCategories] = useState([])
  const [name,setName]=useState('')
  let formData = new FormData()
  const [openE,setOpenE]=useState(false)
  const [id,setId]=useState('')

 

  useEffect(()=>{
    getCategories()
  },[])

  const getCategories = async ()=>{
    await api
      .get('/api/categories')
      .then(res=>{
        setCategories(res.data.data)
        console.log(res.data.data);
      })
      .catch(err => console.log(err))
  }

  const addCat = (e)=>{
    e.preventDefault()
    formData.append('name', name)
    api
      .post('/api/categories',formData)
      .then(res=>{
        getCategories()
      })
      .catch(err => console.log(err))
      console.log(name);
      setName('')

  }

  const editWindow =(id)=>{
    setOpenE(!openE)
    setId(id)
  }

  const editCat  = async (e)=>{
    e.preventDefault()
    await api
      .put(`/api/categories/${id}`,{name:name})
      .then(res=>{
        getCategories()
      })
      .catch(err => console.log(err))
      setName('')

  }


  const deleted = async (id)=>{
    api
      .delete(`/api/categories/${id}`)
      .then(res =>{
        getCategories()
      })
      .catch(err => console.log(err))
  }



  const {token, loading} = useSelector(store => store.register)
  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
        navigate('/register', {replace: true})
    }
  })


  return (


      <div className='todo__list w-full  h-screen flex  justify-center'>

        <div className="todo__container my-[10%] h-auto w-full ">

          <div className="bg-white todo__section w-[60%] max-sm:w-[90%] mx-auto py-4 rounded-md shadow-2xl  ">


          

            <div className="todo__list__header p-10  ">
              {
                openE ? 
                <form onSubmit={(e)=>editCat(e)}>
                  <label className="todo__add__category flex items-center gap-4 className='w-full border rounded-sm px-4 py-1 outline-none'  w-full">
                      <input 
                        value={name}
                        className='w-full    
                        outline-none' 
                        type="text" 
                        placeholder='EDIT' 
                        onChange={(e)=>{setName(e.target.value)}}
                      />

                      <button className='border py-1 px-3 rounded-sm text-base bg-blue-500 text-white ' type='submit' >edit</button>
                  </label>
                </form>
                :
                <form onSubmit={(e)=>addCat(e)}>
                  <label className="todo__add__category flex items-center gap-4 className='w-full border rounded-sm px-4 py-1 outline-none'  w-full">
                      <input 
                        value={name}
                        className='w-full    
                        outline-none' 
                        type="text" 
                        placeholder='ADD' 
                        onChange={(e)=>{setName(e.target.value)}}
                      />

                      <button className='border py-1 px-3 rounded-sm text-base bg-blue-500 text-white ' type='submit' >Add</button>
                  </label>
                </form>
              }


            </div>

            <ul className='todo__schould_content w-[90%] mx-auto flex flex-col py-3 gap-1 px-5'>

              <Spin spinning={loading}>

                <li className='flex todo__schould_container flex-col items-center justify-between gap-4'>

                                  {
                  categories.map(item=>(
                    <Link key={item.id} className=' todo_category_content hover:scale-105 w-full px-6 py-3 hover:text-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition ease-in  '>
                      <h1 className='todo_category flex  items-center text-xl justify-between'>
                        <Link to={`/lists/${item.id}`} >
                            {item.name}
                        </Link>

                        <div className="icons flex items-center gap-5">

                          <EditOutlined onClick={()=>{editWindow(item.id)}} className='border p-1 rounded-sm transition ease-out hover:text-white hover:border-blue-600 cursor-pointer hover:bg-blue-600 hover:scale-110'/>

                          <DeleteOutlined onClick={()=>{deleted(item.id)}} className='border p-1 rounded-sm transition ease-out hover:text-white hover:border-rose-600 
                          cursor-pointer hover:bg-rose-600 hover:scale-110'/>

                        </div>
                      </h1>
                  </Link>
                  ))
                }

                </li>
              </Spin>


            </ul>

          </div>


        </div>

      </div>


  )
}

export default Home