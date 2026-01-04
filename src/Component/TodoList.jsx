import { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { getDatabase, ref, set, push, onValue, Database, remove, update   } from "firebase/database";
import { MdModeEditOutline, MdDelete} from "react-icons/md";
import { GrClear } from "react-icons/gr";



const TodoList = () => {
  
    const [name, setName] = useState("")
    const [institute, setInstitute] = useState("")
    const [number, setNumber] = useState("")
    const [alldata, setAlldata] = useState([])

    const [dataEdit, setDataEdit] = useState(false)
    const [updateValueName, setUpdateValueName] = useState("")
    const [updateValueInstitute, setUpdateValueInstitute] = useState("")
    const [updateValueNumber, setUpdateValueNumber] = useState("")
    const [updateId, setUpdateId] = useState(0)


    const nameHandle=(e)=>{
      setName(e.target.value)
    }
    const instituteName=(e)=>{
      setInstitute(e.target.value)
    }
    const Number=(e)=>{
      setNumber(e.target.value)
    }

      const notify = () => 
        name =="" || institute =="" || number =="" ?        
        toast.error("Please Enter the Section", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              }) 
              :
        toast.success('Successfully Submite this task', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
              
      //  ! Data  Section Send with Database Start       
      const handleClick=(e)=>{
        e.preventDefault() 
        if(!name || !institute || !number){
          notify()     
        }else{
          
          const db = getDatabase();
          set(push(ref(db, 'todos/'), {
                Number: number,
                Institute: institute,
                Username: name,
              }).then(() => {
                notify();
                  setNumber("");
                  setInstitute("");
                  setName("")
              }))
            }
          }
      //  ! Data Section Send with Database End  

      //  ! Data Read Section with Database Start      
          
          useEffect(()=>{
            const db = getDatabase();
            const todos = ref(db, 'todos/');
            onValue(todos, (snapshot) => {
              // const data = snapshot.val();
              const arr = []
              snapshot.forEach((items)=>{
                arr.push({value:items.val(), id:items.key})
              })         
              setAlldata(arr)
            });        
          },[])
      //  ! Data Read Section with Database End  

      
      
      //  ! Submite BTN Change to Update BTN Database Start

      const updateData = (name, institute, number, id)=>{
        // toggol btn start
        setDataEdit(true)
        // toggol btn end
        setUpdateId(id)

        setUpdateValueName(name)
        setUpdateValueInstitute(institute)
        setUpdateValueNumber(number)
        }
              
      //  ! Submite BTN Change to Update BTN Database End  


      // ! Update Edit data  send to dataBase section start
          const handleUpdate=(e, id)=>{
            e.preventDefault()
              const db = getDatabase();
              update(ref(db, 'todos/'+ id),{
                Number: updateValueNumber,
                Institute: updateValueInstitute,
                Username: updateValueName,
              }).then(()=>{
                toast.success('Successfully Update this task', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                  });
              })
          }

      // ! Update Edit data section End

      // ! Update Edit data Clear section start
      const handleUpdateClear =()=>{
        setDataEdit(false)

        // setUpdateValueName(" ")
        // setUpdateValueInstitute(" ")
        // setUpdateValueNumber(" ")
      }

      // ! Update Edit data Clear section End


      // ! Data Delete Btn with server section Start
      const dataDelete = (id)=>{
        const db = getDatabase();
        remove(ref(db, 'todos/' + id)
            ).then(() => {
                  toast.error('Data Delete Successfully', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                  });
              })
          }
      // ! Data Delete Btn with server section End

    return (
      <>              
      <div className=' max-w-1250px m-20 '>
        <div className='grid  sm:grid-cols-1  lg:grid-cols-4  justify-center  gap-10 '>
          <div className='lg:max-w-[324px] lg:max-h-[454px] '>
            <div className="p-8 bg-[#ababab] rounded-xl ">
              <h1 className='text-black text-3xl font-bold text-center'>This is Todo List</h1>
                  <ToastContainer
                      position="top-right"
                      autoClose={1000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="dark"
                      transition={Bounce}
                      />
                      
              <form action="#">
                {
                    !dataEdit ?
                      <div  className='grid lg:grid-cols-1 md:grid-cols-3 sm:grid-cols-1 justify-center items-center md:gap-x-10 my-7 mx-auto'>
                        <div>
                          <label className='block text-[18px] font-bold' htmlFor="text">Enter Your Name  </label>
                          <input onChange={nameHandle} placeholder='Enter Full Name'
                          className='max-w-[350px] h-[30px] rounded-xl bg-white my-2.5 p-2.5 border-2 block border-[#ccc]' type="text" />
                      </div>
                      <div>
                          <label className='block text-[18px] font-bold' htmlFor="text">Institute Name  </label>
                          <input onChange={instituteName} placeholder='Enter Institute Name'
                          className='max-w-[350px] h-[30px] rounded-xl bg-white my-2.5 p-2.5 border-2 block border-[#ccc]' type="text" />
                      </div>
                      <div>
                          <label className='block text-[18px] font-bold' htmlFor="number">Number  </label>
                          <input onChange={Number} placeholder='Enter Mobile Number'
                          className='max-w-[350px] h-[30px] rounded-xl bg-white my-2.5 p-2.5 border-2 block border-[#ccc]' type="number" />
                      </div>
                    </div> 
                    :
                      <div  className='grid lg:grid-cols-1 md:grid-cols-3 sm:grid-cols-1 justify-center items-center md:gap-x-10 my-7 mx-auto'>
                        <div>
                          <label className='block text-[18px] font-bold' htmlFor="text">Update Your Name  </label>
                          <input value={updateValueName} onChange={(e)=> setUpdateValueName(e.target.value)} placeholder='Update Full Name'
                          className='max-w-[350px] h-[30px] bg-white my-2.5 p-2.5 border-2 block border-[#ccc]' type="text" />
                      </div>
                      <div>
                          <label className='block text-[18px] font-bold' htmlFor="text">Updata Institute Name  </label>
                          <input value={updateValueInstitute}  onChange={(e)=> setUpdateValueInstitute(e.target.value)}  placeholder='Update Institute Name'
                          className='max-w-[350px] h-[30px] bg-white my-2.5 p-2.5 border-2 block border-[#ccc]' type="text" />
                      </div>
                      <div>
                          <label className='block text-[18px] font-bold' htmlFor="text">UpdataNumber  </label>
                          <input value={updateValueNumber}  onChange={(e)=> setUpdateValueNumber(e.target.value)}  placeholder='Update Mobile Number'
                          className='max-w-[350px] h-[30px] bg-white my-2.5 p-2.5 border-2 block border-[#ccc]' type="number" />
                      </div>
                    </div>
                }

                  {  
                  !dataEdit ?
                    <button onClick={handleClick} 
                    className='p-[10px] bg-blue-600 cursor-pointer w-[150px] rounded-3xl text-white font-bold hover:bg-[#00264f] ' 
                    type="submit">Submite</button> 
                    :
                    <div className='flex gap-3'>

                      <button  onClick= {(e) => handleUpdate(e, updateId)} 
                      className='p-[10px] bg-green-900 cursor-pointer w-[150px] rounded-3xl text-white font-bold hover:bg-green-600 ' 
                      type="submit">Update</button>                 
                      <button onClick={handleUpdateClear} 
                      className='p-[10px] bg-red-500 cursor-pointer  rounded-3xl text-white font-bold hover:bg-red-600 ' 
                      type="submit"> <GrClear /> </button> 
                    
                    </div>                                          
                  } 


              </form>
            </div>  
          </div>   
     


        <div className=' lg:col-span-3 my-8 p-8 bg-[#ababab] rounded-xl'>
            <div className='mb-8'>
              <h1 className='text-black text-3xl underline font-bold text-center'>This is Result List</h1>
            </div>

            <div className="ResultSection ">  
              <div className="relative">
                <table className="w-full text-sm text-left rtl:text-right border-2 border-indigo-200 text-body">
                  <thead className="text-sm text-body bg-neutral-secondary-medium bg-[#797979]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-[16px] rounded-s-base font-bold w-[40%]">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-[16px] font-bold w-[35%]">
                        University
                      </th>
                      <th scope="col" className="px-6 py-3 text-[16px] rounded-e-base font-bold w-[20%]">
                        Number
                      </th>
                      <th scope="col" className="px-1 py-3 text-[16px] rounded-e-base font-bold w-[2.5%]">
                        Edit
                      </th>
                      <th scope="col" className="px-1 py-3 text-[16px] rounded-e-base font-bold w-[2.5%]">
                        Delete
                      </th>
                    </tr>
                  </thead>

                {/* /* ! Database data read section start  */}

                {
                  <tbody className="bg-neutral-primary">
                    {alldata.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-2  text-[14px] font-bold w-[40%]">
                          {item.value.Username}
                        </td>
                        <td className="px-6 py-2  text-[14px] w-[35%]">
                          {item.value.Institute}
                        </td>
                        <td className="px-6 py-2  text-[14px] w-[20%]">
                          {item.value.Number}
                        </td>
                        <td onClick={()=> updateData(item.value.Username, item.value.Institute, item.value.Number,  item.id)} 
                            className="px-3 py-2 text-center text-[22px] w-[2.5%]">
                           <MdModeEditOutline className='cursor-pointer text-[#007BFF] '/>
                        </td>
                        <td type="button"
                            onClick={()=> dataDelete(item.id)}
                            className="px-3 py-2 text-center text-[22px] w-[2.5%]">
                         <MdDelete className='cursor-pointer text-red-500 ' />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                }

                {/* /* ! Database data read section end */ }

                </table>
              </div>
            </div>
            </div>
        </div>   
      </div>
      </>
    )
}

export default TodoList