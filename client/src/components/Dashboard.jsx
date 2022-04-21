import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { removeUser } from "../action/user.action";
import Navbar from "./Navbar"



function Dashboard() {
  const user = useSelector(state => state.auth.user)
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto w-full p-5 flex justify-between items-start">

        <div className=" flex-grow">
          <h1 className="font-semibold text-lg sm:text-xl">Name: <span className="text-gray-700 text-base sm:text-lg">{user?.name}</span></h1>
          <h1 className="font-semibold text-lg sm:text-xl">EMail: <span className="text-gray-700 text-base sm:text-lg ">{user?.email}</span></h1>
          {user?.age && <h1 className="font-semibold text-lg sm:text-xl">Age: <span className="text-gray-700 text-base sm:text-lg ">{user?.email}years</span></h1>}
          {user?.height && <h1 className="font-semibold text-lg sm:text-xl">Height: <span className="text-gray-700 text-base sm:text-lg ">{user?.email}cms</span></h1>}
          {user?.weight && <h1 className="font-semibold text-lg sm:text-xl">Weight: <span className="text-gray-700 text-base sm:text-lg ">{user?.email}kg</span></h1>}
          {user?.targetWeight && <h1 className="font-semibold text-lg sm:text-xl">Target Weight: <span className="text-gray-700 text-base sm:text-lg ">{user?.email}kg</span></h1>}
          <button onClick={() => setIsEdit(true)} className="py-2 px-5 my-4 rounded-3xl bg-cyan-600 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit">Add Info</button>

        </div>
        <button onClick={() => setIsDelete(true)} className="py-2 px-5 my-4 rounded-3xl bg-cyan-600 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit">Delete Account </button>


        {isEdit && <EditUser isEdit={true} setIsEdit={setIsEdit} preData={user} />}
        {isDelete && <DelModel setIsDelete={setIsDelete} />}
        <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>

      </main>
    </>
  )
}

export default Dashboard

const EditUser = ({ isEdit, setIsEdit, preData }) => {
  const [data, setData] = useState({
    age: '',
    weight: '',
    height: '',
    targetWeight: '',
    ...preData,
  })
  return (
    <>
    </>
  )
}

const DelModel = ({ setIsDelete }) => {
  const [isSending, setIsSending] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsSending(true)
    const res = await fetch(`/api/user/`, {
      method: "DELETE",
      headers: {
        "token": localStorage.jwtToken
      }
    })
    const response = await res.json()
    if (res.status == 200) {
      toast.success(response.msg)
      setIsDelete(false)
      localStorage.removeItem('jwtToken');
      dispatch(removeUser());
      navigate('/login')
    }
    else
      toast.error(response.msg)
    setIsSending(false)
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
      <div className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white flex flex-col justify-center items-center'>
        <h1 className='text-cyan-800 text-2xl xl:text-3xl font-medium text-center mb-8'>Please confirm to remove account permanently!</h1>
        <div className='flex items-center justify-around gap-x-5'>
          <button className="px-5 py-2 text-lg font-medium text-white hover:bg-cyan-800 border bg-cyan-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
            onClick={handleDelete} disabled={isSending}>{isSending ? 'Wait...' : 'Delete'}</button>
          <button className="px-5 py-2 text-lg font-medium text-white hover:bg-cyan-800 border bg-cyan-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
            onClick={() => setIsDelete(false)} disabled={isSending}>Cancel</button>
        </div>
      </div>
    </div>
  )
}