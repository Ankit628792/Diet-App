import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function useMessages() {
    const groupId = useSelector(state => state.auth.groupId)
    const [messages, setMessages] = useState([])
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
            setMessages(response.data)
        }
    }
    useEffect(() => {
        if (groupId?.length > 0) {
            fetchChat()
        }
    }, [groupId])
    return [messages, setMessages]
}

export default useMessages