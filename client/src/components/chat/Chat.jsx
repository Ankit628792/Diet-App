import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { setActveGroupId } from '../../action/user.action'
import useMessages from '../../hooks/useMessages'
import Navbar from '../Navbar'
import Body from './Body'
import Sidebar from './Sidebar'



function Chat() {
    const user = useSelector(state => state.auth.user)
    const groupId = useSelector(state => state.auth.groupId)
    const [chats, setChats] = useState([])
    const socket = useRef()

    useEffect(() => {
        socket.current = io('http://localhost:5000')
        socket.current.emit("setup", user);
        // socket.on("connected", () => setSocketConnected(true));
        // socket.on("typing", () => setIsTyping(true));
        // socket.on("stop typing", () => setIsTyping(false));
    }, [])
    useEffect(() => {
        (async () => {
            const data = await fetch('http://localhost:5000/api/chat/group', { headers: { "token": localStorage.jwtToken } }).then(res => res.json()).catch(e => console.log(e))
            setChats(data)
        })()
    }, [])

    // useEffect(() => {
    //     console.log('message recieved')
    //     socket.current.on("message recieved", (newMessageRecieved) => {
    //         console.log(newMessageRecieved)
    //         if (newMessageRecieved) {
    //             setMessages([...messages, newMessageRecieved]);
    //         }
    //     });
    // }, []);







    return (
        <>
            <main className="flex items-center w-full min-h-screen overflow-hidden bg-emerald-50">
                <Navbar />
                <div className='w-full max-w-5xl mx-auto h-[700px] overflow-hidden bg-white rounded-lg flex items-stretch border-2'>
                    <Sidebar user={user} setChats={setChats} chats={chats} />
                    {groupId && <Body groupId={groupId} user={user} socket={socket} />}
                </div>
            </main>

            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
        </>
    )
}

export default Chat