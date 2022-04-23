import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../action/user.action";

const DelUser = ({ setIsDelete }) => {
    const [isSending, setIsSending] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsSending(true)
        const res = await fetch(`/api/user/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
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

export default DelUser