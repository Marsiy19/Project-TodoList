import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/api'


const Schedule = () => {
  const [allTasks, setAllTasks] = useState([])
  const [name,setName]=useState('')
  const [category_id,setCategory_id]= useState('')
  const [description,setDescription]=useState('')
  let formData = new FormData()
  const [openE,setOpenE]=useState(false)
  const [id,setId]=useState('')

  const params = useParams()

  useEffect(()=>{
    getTask()
  },[])

  const getTask = async ()=>{
    await api
      .get('/api/tasks')
      .then(res=>{
        setAllTasks(res.data.payload)
        console.log(res.data.payload);
      })
      .catch(err => console.log(err))
  }

  const addTask = (e)=>{
    e.preventDefault()
    formData.append('category_id',category_id)
    formData.append('description',description)
    formData.append('task', name)
    api
      .post('/api/tasks',formData)
      .then(res=>{
        getTask()
        console.log({'text': name, 'category id':category_id, 'description' : description})
      })
      .catch(err => console.log(err))
      console.log(name);
      setCategory_id('')
      setDescription('')
      setName('')

  }

  const editWindow =(id)=>{
    setOpenE(!openE)
    setId(id)
  }

  const editTask = async (e)=>{
    e.preventDefault()
    await api
      .patch(`/api/tasks/${id}`,{
        task:name,
        description:description,
        category_id:category_id,
      })
      .then(res=>{
        getTask()
      })
      .catch(err => console.log(err))
      setCategory_id('')
      setDescription('')
      setName('')
  }


  const deleted = async (id)=>{
    api
      .delete(`/api/tasks/${id}`)
      .then(res =>{
        getTask()
      })
      .catch(err => console.log(err))
  }






  return (
    <div className='list__content w-full min-h-screen max-h-full'>

      <div className="list__container w-[60%] max-sm:w-[90%]  mx-auto py-[10%] ">

        <div className="bg-white">

            <div className="list__header  w-full shadow-md">



            {
                openE ? 
                <form onSubmit={(e)=>editTask(e)}>
                  <label className='w-full border px-8 py-2 rounded-sm gap-5 flex items-center' >
                      <input value={category_id} onChange={(e) => setCategory_id(e.target.value)} className='w-full outline-none max-w-[100px] mr-5' type="number" placeholder='Number' />
                    
                      <input value={name}  onChange={(e) => setName(e.target.value)} className='w-full outline-none' type="text" placeholder='Schedule edited' />
                      <input value={description} onChange={(e) => setDescription(e.target.value)} className='w-full outline-none' type="text" placeholder='Description eddited' />
                    <button className='border py-1 px-3 rounded-sm text-base bg-blue-500 text-white ' type='submit' >Edit</button>

                    <Link to={'/'} className='hover:text-white hover:bg-blue-600 rounded-sm transition ease-in p-1' >
                      Home
                    </Link>

                  </label>
                </form>
                :
                <form onSubmit={(e)=>addTask(e)}>

                      <label className='w-full border px-8 py-2 rounded-sm gap-5 flex items-center' >
                        <span className='flex w-full max-md:flex-col max-md:gap-2'> 

                          <input value={category_id} onChange={(e) => setCategory_id(e.target.value)} className='w-full outline-none max-w-[100px] mr-5' type="number" placeholder='Number' />
                    
                          <input value={name} onChange={(e) => setName(e.target.value)} className='w-full outline-none' type="text" placeholder='Schedule added' />
                        </span>

                      <input  value={description} onChange={(e) => setDescription(e.target.value)} className='w-full outline-none' type="text" placeholder='Description added' />
                      <button className='border py-1 px-3 rounded-sm text-base bg-blue-500 text-white ' type='submit' >Add</button>

                      <Link to={'/'} className='hover:text-white hover:bg-blue-600 rounded-sm transition ease-in p-1' >
                        Home
                      </Link>

                    </label>
                </form>
              }


            </div>

            <ul className=' w-full flex flex-col py-3  snap-mandatory scroll-auto snap-y gap-1 px-5 '>



            {
                allTasks?.map(item => (

                  <li key={item.id} className='flex  justify-between p-2  max-md:gap-3 border rounded-sm items-center snap-mandatory scroll-auto snap-y'>

                    <span className='flex items-center gap-5   text-start'>
                      <span>{item.category_id}) </span>

                      <span className='flex flex-col
                      '>
                        <span className='text-lg font-medium'>{item.task}</span> 
                        <span className='text-gray-600'>{item.description}</span>

                      </span>

                    </span>

                  <div className="icons   flex max-md:flex-col  items-center gap-5 max-md:gap-1">
  
                    <EditOutlined onClick={()=>{editWindow(item.id)}} className='border p-1 rounded-sm transition ease-out hover:text-white hover:border-blue-600 cursor-pointer hover:bg-blue-600 hover:scale-110'/>
                    <DeleteOutlined onClick={()=>{deleted(item.id)}}  className='border p-1 rounded-sm transition ease-out hover:text-white hover:border-rose-600 cursor-pointer hover:bg-rose-600 hover:scale-110'/>
  
                  </div>

                </li>



                ))
              }










            </ul>

        </div>

      </div>
      
    </div>
  )
}

export default Schedule