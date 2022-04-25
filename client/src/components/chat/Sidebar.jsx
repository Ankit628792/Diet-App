import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { setActveGroupId } from '../../action/user.action';
const inputBx = `flex-grow w-full h-12 px-4 my-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-emerald-300 focus:outline-none `

const Row = ({ name, id, admin }) => {
    const dispatch = useDispatch();

    const joinGroup = async () => {
        dispatch(setActveGroupId(id))
    }

    return <div className='p-2 my-2 shadow-md shadow-gray-50 hover:shadow-gray-100 cursor-pointer hover:scale-105 transition-transform duration-100 rounded-lg flex items-center' onClick={joinGroup}>
        <h1 className='inline-block w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-center border-4 border-emerald-100 text-3xl'>A</h1>
        <div className='px-2'>
            <h1 className='text-lg md:text-xl font-semibold text-emerald-600 truncate'>{name}</h1>
            <p className='truncate text-sm text-gray-400'>Created by {admin}</p>
        </div>
    </div>
}

function Sidebar({ user, chats, setChats }) {

    const [isPopup, setIsPopup] = useState(false)
    const inputRef = useRef()
    const createGroup = async (e) => {
        e.preventDefault()
        const jsonData = JSON.stringify({ groupName: inputRef.current.value || 'Unknown', groupAdmin: user._id, adminName: user.name })
        const res = await fetch('http://localhost:5000/api/chat/group', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.jwtToken
            },
            body: jsonData
        })
        const response = await res.json();
        if (res.status == 201) {
            const { data, msg } = response;
            toast.success(msg)
            setChats(chats.length > 0 ? [...chats, data] : [data])
            setIsPopup(false)
        }
        else {
            toast.error(response.msg)
        }
    }

    return (
        <>
            <div className='w-full max-w-[250px] md:max-w-xs px-2 min-h-full max-h-full overflow-y-auto relative'>
                <button onClick={() => setIsPopup(!isPopup)} className='sticky top-0 bg-white p-5 w-full text-3xl pb-6 font-bold border-b text-emerald-700 cursor-pointer'>Create Group</button>
                {
                    chats?.length > 0 && chats?.map(chat => <Row key={chat._id} name={chat.groupName} id={chat._id} users={chat.users} currentUser={user._id} admin={chat.adminName} />)
                }

            </div>
            {isPopup && <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
                <form onSubmit={createGroup} className='max-w-lg w-full bg-white border border-emerald-300 sm:shadow-emerald-50 shadow-none p-5 py-10 sm:p-10 rounded-xl sm:shadow-lg flex flex-col justify-center items-center'>
                    <h1 className='text-3xl lg:text-4xl font-semibold text-emerald-600 mb-4 text-center'>Name of Group</h1>
                    <input className={inputBx}
                        type="text"
                        required
                        ref={inputRef} />
                    <div className='flex items-center justify-evenly px-4 gap-4 w-full'>
                        <input className="py-2 px-5 my-4 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit" value="Add" />
                        <input className="py-2 px-5 my-4 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer" type="reset" value="Cancel" onClick={() => setIsPopup(false)} />
                    </div>
                </form>
            </div>}
        </>
    )
}

export default Sidebar