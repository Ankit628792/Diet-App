import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setUser } from "../action/user.action";
const inputBx = `flex-grow w-full h-12 px-4 my-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-emerald-300 focus:outline-none ; `

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const registerUser = async (data) => {
    const res = await fetch('https://diet-backend-0hdj.onrender.com/api/user/', {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, email, password } = data
    if (!name || !email || !password) return toast.error('All Fields are Required')
    registerUser(data)
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className='max-w-lg w-full border border-emerald-300 sm:shadow-emerald-50 shadow-none p-5 py-10 sm:p-10 rounded-xl sm:shadow-lg flex flex-col justify-center items-center'>
        <h1 className='text-3xl lg:text-4xl font-semibold text-emerald-600 mb-4 text-center'>User Registration</h1>

        <input className={inputBx}
          type="name"
          name="name"
          required
          placeholder="Enter Your name"
          value={data.name}
          onChange={handleChange} />

        <input className={inputBx}
          type="email"
          name="email"
          required
          placeholder="Enter an Email"
          value={data.email}
          onChange={handleChange} />

        <input className={inputBx}
          type="password"
          name="password"
          placeholder="Enter an password"
          value={data.password}
          onChange={handleChange} />

        <input className="py-2 px-5 my-4 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit" value="Register" />

        <p className="text-lg">Already have an account ? <Link to='/login' className="text-emerald-500 hover:text-emerald-600">Login</Link></p>

      </form>
      <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
    </section>
  )
}

export default Register