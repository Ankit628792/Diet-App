import { useState } from "react"
import { useDispatch } from "react-redux"
import jwt_decode from 'jwt-decode'
import { setUser } from "../action/user.action"
import toast from "react-hot-toast"

const inputBx = `flex-grow w-full h-12 px-4 my-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-cyan-300 focus:outline-none ; `


const EditUser = ({ setIsEdit, preData }) => {
    const [isSending, setIsSending] = useState(false)

    const [data, setData] = useState({
        age: '',
        weight: '',
        height: '',
        gender: '',
        ...preData,
    })

    const dispatch = useDispatch()

    const updateUser = async (data) => {
        setIsSending(true)
        const res = await fetch('http://localhost:5000/api/user/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.jwtToken
            },
            body: JSON.stringify(data)
        })
        const response = await res.json();
        if (res.status == 200) {
            const { token, msg } = response;
            localStorage.setItem("jwtToken", token);
            const decoded = jwt_decode(token);
            dispatch(setUser(decoded));
            toast.success(msg)
            setIsEdit(false)
        }
        else {
            toast.error(response.msg)
        }
        setIsSending(false)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let { age, height, weight, gender } = data
        if (age < 1 || age > 150) return toast.error('Invalid Age');
        if (height < 1 || height > 300) return toast.error('Invalid Height');
        if (weight < 1 || weight > 1000) return toast.error('Invalid Weight');
        if (!age || !height, !weight, !gender) return toast.error('All Fields are Required');
        updateUser(data)
    }
    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
                <form onSubmit={handleSubmit} className='max-w-lg w-full border bg-white border-cyan-300 sm:shadow-cyan-50 shadow-none p-5 py-10 sm:p-10 rounded-xl sm:shadow-lg flex flex-col justify-center items-center'>
                    <h1 className='text-3xl lg:text-4xl font-semibold text-cyan-700 mb-4 text-center'>Edit Details</h1>

                    <input className={inputBx}
                        type="number"
                        min={0}
                        max={150}
                        name="age"
                        placeholder="Your age in years"
                        value={data.age}
                        onChange={handleChange} />

                    <input className={inputBx}
                        type="number"
                        min={0}
                        max={300}
                        name="height"
                        placeholder="Your height in cm"
                        value={data.height}
                        onChange={handleChange} />

                    <input className={inputBx}
                        type="number"
                        name="weight"
                        min={0}
                        max={1000}
                        placeholder="Your weight in kg"
                        value={data.weight}
                        onChange={handleChange} />

                    <select
                        defaultValue=""
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        name="gender"
                        value={data.gender}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>

                    <div className='flex items-center justify-around gap-x-5 mt-4'>
                        <button className="px-5 py-2 text-lg font-medium text-white hover:bg-cyan-800 border bg-cyan-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                            onClick={handleSubmit} disabled={isSending}>{isSending ? 'Wait...' : 'Submit'}</button>
                        <button className="px-5 py-2 text-lg font-medium text-white hover:bg-cyan-800 border bg-cyan-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                            onClick={() => setIsEdit(false)} disabled={isSending}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default EditUser