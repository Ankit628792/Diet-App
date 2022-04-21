import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import { setUser } from "../action/user.action";

const inputBx = `flex-grow w-full h-12 px-4 my-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-cyan-300 focus:outline-none ; `

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginUser = async (data) => {
    const res = await fetch('http://localhost:5000/api/session/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const response = await res.json();
    if (res.status == 201) {
      const { token } = response;
      localStorage.setItem("jwtToken", token);
      const decoded = jwt_decode(token);
      dispatch(setUser(decoded));
      toast.success('Login Successful')
      navigate('/')
    }
    else {
      toast.error(response.msg)
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = data
    if (!email || !password) return toast.error('All Fields are Required')
    loginUser(data)
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className='max-w-lg w-full border border-cyan-300 sm:shadow-cyan-50 shadow-none p-5 py-10 sm:p-10 rounded-xl sm:shadow-lg flex flex-col justify-center items-center'>
        <h1 className='text-3xl lg:text-4xl font-semibold text-cyan-700 mb-4 text-center'>User Login</h1>

        <input className={inputBx}
          type="email"
          name="email"
          placeholder="Enter an Email"
          value={data.email}
          onChange={handleChange} />

        <input className={inputBx}
          type="password"
          name="password"
          placeholder="Enter an password"
          value={data.password}
          onChange={handleChange} />

        <input className="py-2 px-5 my-4 rounded-3xl bg-cyan-600 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit" value="Login" />
        <p className="text-lg">Don't have an account ? <Link to='/register' className="text-cyan-500 hover:text-cyan-700">Register</Link></p>

      </form>
      <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
    </section>
  )
}

export default Login