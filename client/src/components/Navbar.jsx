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
        <main>
            <nav className='bg-cyan-700 px-5 py-3 md:px-10 flex items-center justify-between gap-4'>
                <h1 className="text-3xl font-bold text-white">Diet App</h1>
                <button onClick={logoutUser} className="py-2 px-4 rounded-3xl bg-white text-cyan-600 max-w-max text-xl font-semibold">Logout</button>
            </nav>
        </main>
    )
}

export default Navbar