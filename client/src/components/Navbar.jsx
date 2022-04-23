import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../action/user.action";

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutUser = () => {
        localStorage.removeItem('jwtToken');
        dispatch(removeUser());
        navigate('/login')
    }
    return (
        <nav className='bg-emerald-500 rounded-tr-3xl rounded-br-3xl px-5 py-16 min-w-max w-[250px] h-full min-h-screen flex flex-col' style={{ boxShadow: '4px 0 20px rgb(16 185 129 / 0.4)' }}>
            <h1 className="text-3xl font-bold text-white">Diet App</h1>
            <ul className="text-2xl font-semibold text-white space-y-4 mt-10">
                <li className='cursor-pointer hover:text-emerald-700' onClick={() => navigate('/')}>Dashboard</li>
                <li className='cursor-pointer hover:text-emerald-700' onClick={() => navigate('/mydiet')}>My Diet</li>
                <li className='cursor-pointer hover:text-emerald-700' onClick={logoutUser}>Logout</li>
            </ul>
            {/* <button onClick={logoutUser} className="py-2 px-4 rounded-3xl bg-white text-emerald-600 max-w-max text-xl font-semibold">Logout</button> */}
        </nav>
    )
}

export default Navbar