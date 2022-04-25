import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Header from './Header'
import { io } from 'socket.io-client'
import Message from './Message'
import { Cipher } from '../../util'

const inputBx = `flex-grow w-full h-12 px-4 my-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-emerald-300 focus:outline-none `

function Body({ groupId, user }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    const socket = useRef()
    const scrollRef = useRef()

    const fetchChat = async () => {
        const url = `http://localhost:5000/api/chat/group/${groupId}`;
        const options = {
            method: 'GET',
            headers: {
                "token": localStorage.jwtToken
            }
        };
        const res = await fetch(url, options)
        const response = await res.json();
        if (res.status == 200) {
            setMessages(response)
        }
    }

    useEffect(() => {
        if (user && groupId) {
            socket.current = io('http://localhost:5000')
            socket.current.emit("join chat", groupId);
            fetchChat()
        }
    }, [groupId])

    useEffect(() => {
        if (socket.current) {
            socket.current.on("message recieved", (newMessageRecieved) => {
                if (newMessageRecieved) {
                    setNewMessage(newMessageRecieved);
                }
            });
        }
    });

    useEffect(() => {
        newMessage && newMessage.sender !== user._id && setMessages((prev) => [...prev, newMessage])
    }, [newMessage])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return;
        let encText = Cipher(message);
        const data = {
            sender: user._id,
            name: user.name,
            groupId: groupId,
            content: encText,
            createdAt: Date.now()
        }

        socket.current.emit("new message", data);
        const res = await fetch('http://localhost:5000/api/chat/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.jwtToken
            },
            body: JSON.stringify(data)
        })
        const response = await res.json();
        if (res.status == 201) {
            const { data } = response;
            setMessage('')
            console.log(data)
            setMessages((prev) => [...prev, data])
        }
        else {
            toast.error(response.msg)
        }
        setMessage('')
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])


    return (
        <div className=' border-l w-full min-h-full overflow-y-auto flex-grow flex flex-col gap-2 relative'>
            {groupId && <Header groupId={groupId} />}
            <div className='flex-grow pt-24 pb-2 px-5 flex flex-col gap-4'>
                {messages?.length > 0 && messages?.map(item => {
                    const isUser = (item?.sender._id || item.sender) == user._id
                    return <Message key={item.createdAt} isUser={isUser} message={item} />
                })}
                <span ref={scrollRef}></span>
            </div>
            <form onSubmit={handleSubmit} className='w-full flex gap-3 items-center px-4 sticky bottom-0 bg-white'>
                <input className={inputBx} placeholder='Type your message...' type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit" className='cursor-pointer font-medium text-lg px-4 py-2 bg-emerald-600 text-white rounded-2xl'>Send</button>
            </form>
        </div>
    )
}

export default Body