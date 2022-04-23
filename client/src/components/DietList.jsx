import useGetDiet from "../hooks/useGetDiet"
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import { setUser } from "../action/user.action";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function DietList({ targetCalory, user }) {
    const [diet, isFetching, isError] = useGetDiet({ targetCalory: targetCalory })
    const dispatch = useDispatch()
    const [isSubscribed, setIsSubscribed] = useState(user?.targetCalory == targetCalory)
    useEffect(() => {
        setIsSubscribed(user?.targetCalory == targetCalory)
    }, [targetCalory])

    const updateUser = async ({ calory }) => {
        const res = await fetch('http://localhost:5000/api/user/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.jwtToken
            },
            body: JSON.stringify({ ...user, targetCalory: calory })
        })
        const response = await res.json();
        if (res.status == 200) {
            const { token } = response;
            localStorage.setItem("jwtToken", token);
            const decoded = jwt_decode(token);
            dispatch(setUser(decoded));
            toast.success(calory ? 'Your subscription successful' : 'You have unsubscibe plan')
            setIsSubscribed(Boolean(calory))
        }
        else {
            toast.error('Some error with subscription')
        }
    }

    const subscribe = async () => {
        await updateUser({ calory: targetCalory })
    }

    const unsubscribe = async () => {
        await updateUser({ calory: null })
    }

    return (
        <section>
            <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-emerald-600'>
                7 Days Meal Plan : {user && <button className='px-4 py-2 rounded-3xl bg-white text-emerald-600 text-base sm:text-lg shadow border border-emerald-300 cursor-pointer' onClick={() => isSubscribed ? unsubscribe() : subscribe()}>{isSubscribed ? 'Unubscribe' : 'Subscribe'}</button>}
            </h1>
            {(isFetching || isError) ?
                <div className='bg-white rounded-2xl p-5 py-10 my-4'>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-emerald-600 capitalize text-center'>
                        {isError ? 'Some Error with Api' : 'Loading data...'}
                    </h1>
                </div>
                :
                <>
                    {diet &&
                        Object.getOwnPropertyNames(diet).map((day, i) => {
                            return <div key={i} className='bg-white rounded-2xl p-5 pb-10 my-4'>
                                <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-emerald-600 capitalize'>
                                    {day}
                                </h1>
                                {
                                    Object.getOwnPropertyNames(diet[day]?.nutrients).map((item, i) =>
                                        <div key={i} className=' bg-emerald-50 rounded-3xl p-5 inline-block m-4 shadow-md'>
                                            <h1 className='font-semibold text-emerald-500 text-sm sm:text-base capitalize'>{item}</h1>
                                            <p className='text-gray-600 text-base sm:text-lg font-medium'>{diet[day]?.nutrients[item]}</p>
                                        </div>
                                    )
                                }
                                <div className='flex items-stretch justify-evenly gap-10 flex-wrap'>
                                    {diet[day]?.meals?.map((item, i) =>
                                        <div key={i} className='bg-emerald-50 rounded-3xl p-5 max-w-xs text-center shadow-lg shadow-emerald-50'
                                        // onClick={() => setActiveItem(item.id)}
                                        >
                                            <img className='w-60 rounded-2xl mx-auto object-cover' src={`https://webknox.com/recipeImages/${item.id}-556x370.jpg`} alt="" />
                                            <h1 className='text-lg font-medium mt-2 text-gray-800'>{item.title}</h1>
                                            <p className='font-semibold text-gray-500 text-lg mb-4'>Ready in: {item.readyInMinutes}, {item.servings} servings</p>
                                            <a className='bg-white rounded-full px-4 py-2 text-lg font-medium text-emerald-600 hover:text-emerald-800' href={item.sourceUrl} target="_blank" rel="noopener noreferrer">More Details</a>
                                        </div>
                                    )}
                                </div>

                            </div>
                        })
                    }
                </>}
        </section>

    )
}
