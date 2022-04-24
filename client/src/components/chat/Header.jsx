import React, { useEffect, useState } from 'react'

function Header({ groupId }) {
    const [group, setGroup] = useState(null)
    const fetchChat = async () => {
        const url = `http://localhost:5000/api/chat/details/${groupId}`;

        const options = {
            method: 'GET',
            headers: {
                "token": localStorage.jwtToken
            }
        };
        const res = await fetch(url, options)
        const response = await res.json();
        if (res.status == 200) {
            setGroup(response)
        }
    }
    useEffect(() => groupId && fetchChat(), [groupId])
    return (
        <div className='p-4 bg-white border shadow flex items-center absolute top-0 right-0 left-0'>
            <h1 className='inline-block w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-center border-4 border-emerald-100 md:text-3xl'>A</h1>
            <div className='px-2'>
                <h1 className='text-lg md:text-xl font-semibold text-emerald-600 truncate'>{group?.groupName}</h1>
                <p className='truncate text-sm text-gray-400'>Created at: {new Date(group?.createdAt).toDateString()}</p>
            </div>
        </div>
    )
}

export default Header