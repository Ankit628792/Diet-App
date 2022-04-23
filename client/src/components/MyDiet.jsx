import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddItem from './AddItem';
import Navbar from './Navbar';

function MyDiet() {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const [addItem, setAddItem] = useState(false)

    useEffect(() => {
        if (!localStorage.jwtToken && !user) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <main className="flex items-start w-full min-h-screen overflow-hidden bg-emerald-50">
                <Navbar />
                <section className=" w-full p-5 py-10 lg:p-10 flex-grow overflow-y-auto h-screen">
                <button onClick={() => setAddItem(true)} className="py-2 px-5 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit">Add Item</button>

                </section>
            </main>
            {addItem && <AddItem setAddItem={setAddItem} user={user} />}
        </>
    )
}

export default MyDiet