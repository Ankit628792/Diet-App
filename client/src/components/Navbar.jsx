import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../action/user.action";
import { useWindowSize } from '../hooks/useWindowSize'

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const size = useWindowSize()
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        if (size?.width > 769) {
            setIsActive(false)
        }
        else
            setIsActive(true)
    }, [size])

    const logoutUser = () => {
        localStorage.removeItem('jwtToken');
        dispatch(removeUser());
        navigate('/login')
    }
    return (
        <nav className={`bg-emerald-500 rounded-tr-3xl rounded-br-3xl px-5 py-20 min-w-max w-[250px] h-full min-h-screen flex flex-col fixed duration-300 z-20 slide-in md:relative ${isActive ? '-left-72' : 'left-0'} ${size?.width > 768 ? 'left-0' : ''}`} style={{ boxShadow: '4px 0 20px rgb(16 185 129 / 0.4)' }}>
            <h1 className="text-3xl font-bold text-white">Diet App</h1>
            <button onClick={() => setIsActive(!isActive)} className={`fixed -top-3 -left-3 shadow p-5 pt-6 pl-6 rounded-full font-semibold md:hidden ${!isActive ? 'bg-white text-emerald-600' : 'bg-emerald-600 text-white'}`}>
                {isActive ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                }
            </button>
            <ul className={`text-2xl font-semibold text-white space-y-4 mt-10`}>
                <li className='cursor-pointer hover:text-emerald-700' onClick={() => navigate('/')}>Dashboard</li>
                <li className='cursor-pointer hover:text-emerald-700' onClick={() => navigate('/mydiet')}>My Diet</li>
                <li className='cursor-pointer hover:text-emerald-700' onClick={() => navigate('/chats')}>Chats</li>
                <li className='cursor-pointer hover:text-emerald-700' onClick={logoutUser}>Logout</li>
            </ul>
        </nav>
    )
}

export default Navbar