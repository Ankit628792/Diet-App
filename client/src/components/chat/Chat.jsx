import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setActveGroupId } from '../../action/user.action'
import Navbar from '../Navbar'
import Body from './Body'
import Sidebar from './Sidebar'

function Chat() {
    const user = useSelector(state => state.auth.user)
    const groupId = useSelector(state => state.auth.groupId)
    const dispatch = useDispatch()
    const [chats, setChats] = useState([])

    useEffect(() => {
        (async () => {
            const data = await fetch('http://localhost:5000/api/chat/group', { headers: { "token": localStorage.jwtToken } }).then(res => res.json()).catch(e => console.log(e))
            if (data?.length > 0) {
                dispatch(setActveGroupId(data[0]._id))
                setChats(data)
            }
        })()
    }, [])


    return (
        <>
            <main id="divToPrint" className="flex items-center w-full min-h-screen overflow-hidden bg-emerald-50">
                <Navbar />
                <div className='w-full max-w-5xl mx-auto h-[700px] overflow-hidden bg-white rounded-lg flex items-stretch border-2 m-4'>
                    {chats ?
                        <>
                            <Sidebar user={user} setChats={setChats} chats={chats} />
                            {groupId ? <Body groupId={groupId} user={user} /> : <h1></h1>}
                        </>
                        :
                        <h1></h1>}
                </div>
            </main>
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
        </>
    )
}

export default Chat