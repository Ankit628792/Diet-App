import React, { useState } from 'react'

const inputBx = `flex-grow w-full h-12 px-4 my-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-emerald-300 focus:outline-none ; `

const types = ['RECIPE', 'PRODUCT', 'MENU_ITEM', 'INGREDIENTS', 'CUSTOM_FOOD',]

function AddItem({ setAddItem, user }) {

    const [data, setData] = useState(
        {
            date: 1589500800,
            slot: 0, //either 1, 2, or 3 for breakfast, lunch, or dinner 
            position: 0,
            type: "",
            value: {
                title: ''
            }
        }
    )
    const [items, setItems] = useState([]);
    const [item, setItem] = useState('');


    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const delOption = async (itemId) => {
        const index = items.findIndex((item) => item.itemId == itemId)
        if (index >= 0) {
            items.splice(index, 1)
        } else {
            console.warn(`Can't remove item`)
        }
        setItems([...items]);
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>

            <form onSubmit={handleSubmit} className='max-w-lg w-full bg-white border border-emerald-300 sm:shadow-emerald-50 shadow-none p-5 py-10 sm:p-10 rounded-xl sm:shadow-lg flex flex-col justify-center items-center'>
                <h1 className='text-3xl lg:text-4xl font-semibold text-emerald-600 mb-4 text-center'>Add Diet</h1>

                <select
                    defaultValue=""
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    name="slot"
                    value={data.slot}
                    onChange={handleChange}
                >
                    <option value={0} disabled>Select Timing</option>
                    <option value={1}>Breakfast</option>
                    <option value={2}>Lunch</option>
                    <option value={3}>Dinner</option>
                </select>

                <select
                    defaultValue=""
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    name="type"
                    value={data.type}
                    onChange={handleChange}
                >
                    <option value='' disabled>Select Category</option>
                    {types.map(type => <option key={type} value={type}>{type}</option>)}
                </select>

                <div className='flex flex-grow w-full items-center space-x-2 '>
                    <input className={inputBx}
                        type="text"
                        name="item"
                        placeholder="Name of Item"
                        value={item}
                        onChange={(e) => setItem(e.target.value)} />

                    <div className="rounded-full p-2 inline-block">
                        <h1 className=" text-white bg-emerald-600 w-12 h-12 flex items-center justify-center text-5xl rounded-full cursor-pointer" onClick={() => {
                            if (item?.length > 1) {
                                setItems([...items, { name: item, itemId: Date.now() }]);
                                setItem('')
                            }
                        }} >
                            <span className='transform -translate-y-1'>+</span>
                        </h1>
                    </div>
                </div>
                <div className='flex items-center justify-evenly px-4 gap-4 w-full'>
                    <input className="py-2 px-5 my-4 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer" type="submit" value="Submit" />
                    <input className="py-2 px-5 my-4 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer" type="reset" value="Cancel" onClick={() => setAddItem(false)} />
                </div>

                <div className='flex flex-wrap gap-2'>
                    {items?.length > 0 && items.map(item => <h1 key={item.itemId} className=' text-emerald-600 m-1 shadow-md bg-white py-1 px-3 rounded-3xl text-lg font-medium min-w-max flex items-center'>{item.name}
                        <span className='text-red-500 ml-3 text-lg cursor-pointer' onClick={() => delOption(item.itemId)}>x</span>
                    </h1>)}
                </div>

            </form>
        </div>
    )
}

export default AddItem