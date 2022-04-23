import React from 'react'
import useDietDetail from '../hooks/useDietDetail'

function DietDetail({ setActiveItem, id }) {
    const dietDetail = useDietDetail({ id: id })
    return (
        <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10 overflow-y-auto'>
            {dietDetail && <div className='max-w-3xl rounded-xl p-5 sm:p-10 bg-white relative m-4'>
                <button onClick={() => setActiveItem(null)} className="py-2 px-5 rounded-3xl bg-emerald-500 text-white max-w-max text-xl font-semibold cursor-pointer absolute top-5 right-5">Close</button>
                <p className='flex-grow text-lg text-emerald-400'>#{dietDetail.id}</p>
                <h1 className='text-xl sm:text-2xl my-2'>{dietDetail.title}</h1>
                <div className='flex items-center flex-wrap gap-2'>
                    {dietDetail?.breadcrumbs?.map(breadcrumb => <span key={breadcrumb} className='px-4 py-2 rounded-xl bg-sky-50 text-sky-600'>{breadcrumb}</span>)}
                </div>
                <img className='max-w-sm my-4' src={dietDetail?.image} alt="" />
                <p className='text-lg text-gray-700 my-4'>{dietDetail?.generatedText}</p>
                <h1 className='text-lg text-gray-800 font-semibold my-2'>Popular Tags</h1>
                <div className='flex items-center flex-wrap gap-2'>
                    {dietDetail?.badges?.map(badge => <span key={badge} className='px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600'>{badge}</span>)}
                </div>
            </div>}
        </div>
    )
}

export default DietDetail