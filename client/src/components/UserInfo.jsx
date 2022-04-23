import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import useBMI from '../hooks/useBMI'
import useCaloryRequirement from '../hooks/useCaloryRequirement'
import useIdealWeight from '../hooks/useIdealWeight'
import DelUser from './DelUser';
import DietList from './DietList';
import EditUser from './EditUser';

function UserInfo({ user }) {
    const { age, weight, height, gender } = user;
    const [targetCalory, setTargetCalory] = useState(user?.targetCalory || 2500)
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const bmi = useBMI({ age, weight, height })
    const idealWeight = useIdealWeight({ height, gender })
    const calory = useCaloryRequirement({ age, weight, height, gender })

    return (
        <>
            <section className="flex items-start justify-evenly flex-wrap gap-10 my-5">
                <div className="p-5 bg-white rounded-xl shadow-lg text-center min-w-[250px] relative">
                    <div className="w-16 h-16 grid place-items-center rounded-full border-4 border-emerald-100 mx-auto text-3xl text-emerald-700 shadow-lg font-semibold mb-2">
                        {user?.name[0]}
                    </div>

                    <h1 className="font-semibold text-lg sm:text-xl">Hi, <span className="text-emerald-400">{user?.name}</span> </h1>
                    {(user.age && user.gender)
                        ? <p className="capitalize text-gray-500">{user.age} years , {user.gender}</p>
                        : <p className="text-gray-500 text-base sm:text-lg">{user?.email}</p>
                    }
                    <hr className="my-3 bg-gray-200 rounded" />
                    {user.height && <div className="flex items-center justify-evenly gap-3">
                        <div>
                            <h1 className='font-semibold text-emerald-400 sm:text-lg'>Weight</h1>
                            <p className='text-gray-600 text-xl sm:text-2xl font-medium'>{user.weight} kg</p>
                        </div>
                        <div>
                            <h1 className='font-semibold text-emerald-400 sm:text-lg'>Height</h1>
                            <p className='text-gray-600 text-xl sm:text-2xl font-medium'>{user.height} cms</p>
                        </div>
                    </div>}
                </div>

                <div className="p-5 bg-white rounded-xl shadow-lg text-center min-w-[250px] relative">
                    <p className="text-gray-500 text-base sm:text-lg">Configuration</p>
                    <hr className="my-3 bg-gray-200 rounded" />
                    {user.height ? <> <div>
                        <h1 className='font-semibold text-emerald-400 sm:text-lg'>Body Mass Index (BMI)</h1>
                        <p className='text-gray-600 text-xl sm:text-2xl font-medium'>{bmi?.bmi} ({bmi?.health})</p>
                    </div>
                        <hr className="my-3 bg-gray-200 rounded" />
                        <div>
                            <h1 className='font-semibold text-emerald-400 sm:text-lg'>Ideal Weight</h1>
                            <p className='text-gray-600 text-xl sm:text-2xl font-medium'>{idealWeight} kg</p>
                        </div>
                    </>
                        :
                        <p className='text-emerald-600 text-xl sm:text-2xl font-medium'>Add Info for more information</p>
                    }
                </div>

                <div className="p-5 bg-white rounded-xl shadow-lg text-center min-w-[250px] relative">
                    <p className="text-gray-500 text-base sm:text-lg">Actions</p>
                    <hr className="my-3 bg-gray-200 rounded" />
                    <button onClick={() => setIsEdit(true)} className="py-2 px-5 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit">Add Info</button>
                    <hr className="my-3 bg-gray-200 rounded" />
                    <button onClick={() => setIsDelete(true)} className="py-2 px-5 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit">Delete Account </button>
                </div>

            </section>

            {calory &&
                <section className='p-10'>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-emerald-600'>
                        Calories Required for:
                    </h1>
                    <div className='flex items-center gap-10 flex-wrap p-5'>
                        <div onClick={() => setTargetCalory(calory['maintain weight']?.toFixed(2))} className='bg-white rounded-3xl p-5 cursor-pointer shadow-lg'>
                            <h1 className='font-semibold text-emerald-400 sm:text-lg'>Maintain Weight</h1>
                            <p className='text-gray-600 text-xl sm:text-2xl font-medium'>{calory['maintain weight']?.toFixed(2)}  calories</p>
                        </div>
                        {
                            Object.getOwnPropertyNames(calory).map((key, i) => calory[key]?.calory &&
                                <div key={i + key} onClick={() => setTargetCalory(calory[key]?.calory?.toFixed(2))} className='bg-white rounded-3xl p-5 cursor-pointer shadow-lg'>
                                    <h1 className='font-semibold text-emerald-400 sm:text-lg'>{key}</h1>
                                    <p className='text-gray-600 text-xl sm:text-2xl font-medium'>{calory[key]?.calory?.toFixed(2)} calories</p>
                                </div>
                            )
                        }
                    </div>
                </section>
            }
            {targetCalory && <DietList targetCalory={targetCalory} user={user} />}
            {isEdit && <EditUser isEdit={true} setIsEdit={setIsEdit} preData={user} />}
            {isDelete && <DelUser setIsDelete={setIsDelete} />}
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>

        </>
    )
}

export default UserInfo