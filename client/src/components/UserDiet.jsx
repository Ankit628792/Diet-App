import toast from 'react-hot-toast';

const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});

function UserDiet({ userDiet, setUserDiet }) {

    const groupedDiet = groupBy(userDiet, diet => diet.day)

    const removeDiet = async (diet) => {
        let newData = [...userDiet]
        const i = newData.findIndex(data => data === diet)
        if (i >= 0) {
            newData.splice(i, 1);
            const res = await fetch(`/api/diet/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "token": localStorage.jwtToken
                },
                body: JSON.stringify({ _id: diet._id })
            })
            const response = await res.json()
            if (res.status == 200) {
                toast.success(response.msg)
                setUserDiet([...newData])
            }
            else
                toast.error(response.msg)
        }
    }
    return (
        <div className='mt-10 mb-16'>
            {groupedDiet && Object.getOwnPropertyNames(groupedDiet).map((item, i) => {
                return item && item !== 'undefined' && <div key={i} className='bg-white rounded-2xl p-5 my-4'>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-emerald-600 capitalize'>
                        {item}
                    </h1>
                    <div className='my-4 flex flex-wrap items-stretch gap-x-8 gap-y-10'>
                        {groupedDiet[item].map(data => <div key={data?.createdAt + 3} className='bg-emerald-50 rounded-3xl p-5 max-w-xs shadow-lg shadow-emerald-50 flex flex-col relative'>
                            <button onClick={() => removeDiet(data)} className="bg-red-50 border border-red-400 text-red-600 w-10 h-10 rounded-full cursor-pointer absolute -top-5 -right-5 grid place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className='flex items-center justify-between gap-2 mb-4'>
                                <h1 className='py-2 px-4 text-lg lg:text-xl font-medium capitalize bg-white text-emerald-600 max-w-max shadow rounded-xl'>
                                    {data?.slot}
                                </h1>
                                <h1 className='py-2 px-4 text-lg lg:text-xl font-medium capitalize bg-white text-sky-500 max-w-max shadow rounded-xl'>
                                    {data?.type}
                                </h1>
                            </div>
                            <hr className='bg-gray-300 rounded-full my-2' />
                            <div className='flex items-center justify-evenly flex-wrap gap-2 my-4 flex-1'>
                                {data?.items.map(item => <span key={item.name} className='px-4 py-2 rounded-xl bg-white capitalize text-emerald-700 shadow-md'> {item.name}</span>)}
                            </div>
                            <hr className='bg-gray-300 rounded-full my-2' />
                            <h1 className='text-sm text-gray-600 italic font-medium text-right'>Created At: {new Date(data?.createdAt).toDateString()}</h1>
                        </div>)}
                    </div>
                </div>
            }
            )}

        </div>
    )
}

export default UserDiet