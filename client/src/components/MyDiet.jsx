import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddItem from './AddItem';
import DietList from './DietList';
import Navbar from './Navbar';
import UserDiet from './UserDiet';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function MyDiet() {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const [addItem, setAddItem] = useState(false)
    const [userDiet, setUserDiet] = useState([])

    const fetchDiet = async () => {
        const res = await fetch('https://diet-backend-0hdj.onrender.com/api/diet/', {
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

    function printDocument() {
        const input = document.getElementById('divToPrint');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    // orientation: 'landscape',
                    unit: 'px',
                    format: [input.clientHeight, input.clientWidth]
                });
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save('download.pdf');
            });
    }

    return (
        <>
            <main className="flex items-start w-full min-h-screen overflow-hidden bg-emerald-50">
                <Navbar />

                <section className="w-full p-5 py-10 lg:p-10 flex-grow overflow-y-auto h-screen">
                    <div className='space-x-4'>
                        <button onClick={() => setAddItem(true)} className="py-2 px-5 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer shadow-lg">Add Item</button>
                        <button onClick={printDocument} className="py-2 px-5 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer shadow-lg">Download Diet</button>
                    </div>
                    <div id="divToPrint">
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