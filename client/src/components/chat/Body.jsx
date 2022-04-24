import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Header from './Header'
const inputBx = `flex-grow w-full h-12 px-4 my-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-emerald-300 focus:outline-none `


function Body({ groupId, user, socket }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

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
            console.log(response)
            setMessages(response)
        }
    }
    useEffect(() => groupId && fetchChat(), [groupId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return;
        const data = {
            sender: user._id,
            groupId: groupId,
            content: message
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
            setMessages((prev) => [...prev, data])
            // setMessages(messages?.length > 0 ? setMessages([...messages, data]) : setMessages([data]))
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
        <div className='border w-full min-h-full overflow-y-auto flex-grow flex flex-col gap-2 relative'>
            {groupId && <Header groupId={groupId} />}
            <div className='flex-grow pt-24 pb-2'>
                {messages?.length > 0 && messages?.map(item => <p key={item._id} className='py-2 px-4 m-2 text-lg bg-emerald-50 rounded-2xl max-w-max w-40 break-words'>{item.content}<br /><span className='text-xs text-gray-300 truncate'>{new Date(item.createdAt).toLocaleTimeString()}</span></p>)}
                <span ref={scrollRef}></span>
            </div>
            <form onSubmit={handleSubmit} className='w-full flex gap-3 items-center px-4 sticky bottom-0'>
                <input className={inputBx} placeholder='Type your message...' type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit" className='cursor-pointer font-medium text-lg px-4 py-2 bg-emerald-600 text-white rounded-2xl'>Send</button>
            </form>
        </div>
    )
}

export default Body