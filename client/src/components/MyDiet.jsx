import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ReactToPrint from 'react-to-print'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddItem from './AddItem';
import DietList from './DietList';
import Navbar from './Navbar';
import UserDiet from './UserDiet';

function MyDiet() {
    const navigate = useNavigate()
    const printRef = useRef()
    const user = useSelector(state => state.auth.user)
    const [addItem, setAddItem] = useState(false)
    const [userDiet, setUserDiet] = useState([])

    const fetchDiet = async () => {
        const res = await fetch('http://localhost:5000/api/diet/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.jwtToken
            }
        })
        const response = await res.json()
        if (res.status == 200) {
            setUserDiet(response)
        }
        else {
            toast.error(response.msg)
        }
    }

    useEffect(() => {
        if (!localStorage.jwtToken && !user) {
            navigate('/')
        }
        else {
            fetchDiet()
        }
    }, [user])

    return (
        <>
            <main className="flex items-start w-full min-h-screen overflow-hidden bg-emerald-50">
                <Navbar />
                <section className="w-full p-5 py-10 lg:p-10 flex-grow overflow-y-auto h-screen">
                    <div className='space-x-4'>
                        <button onClick={() => setAddItem(true)} className="py-2 px-5 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer shadow-lg">Add Item</button>
                        <ReactToPrint
                            trigger={() => <button className="py-2 px-5 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer shadow-lg">Print Diet</button>}
                            content={() => printRef.current}
                        />
                    </div>
                    <div ref={printRef}>
                        {user && userDiet?.length > 0 && <UserDiet userDiet={userDiet} setUserDiet={setUserDiet} />}
                        {user && user?.targetCalory && <DietList targetCalory={user?.targetCalory} user={user} />}
                    </div>
                </section>
            </main>
            {addItem && <AddItem setAddItem={setAddItem} user={user} setUserDiet={setUserDiet} userDiet={userDiet} />}
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
        </>
    )
}

export default MyDiet