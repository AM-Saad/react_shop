import React from 'react'

const Loading = () => {
    return (
        <div className='grid grid-cols-4 mt-2'>
            <div className='col-span-1'>
                <div className='m-3 rounded bg-gray-200 h-7'></div>
                <div className='m-3 rounded bg-gray-200 h-7'></div>
                <div className='m-3 rounded bg-gray-200 h-7'></div>
                <div className='m-3 rounded bg-gray-200 h-7'></div>
            </div>
            <div className='grid grid-cols-3 col-span-3 gap-3'>
                {[0, 1, 2].map((item) => (

                    <div className="group" key={item}>
                        <div className="mb-5 w-full h-64 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">

                            <div className=" w-full h-full object-center object-cover group-hover:opacity-75 bg-gray-200"></div>
                        </div>
                        <div className='m-3 rounded bg-gray-200 h-5'></div>
                        <div className='m-3 rounded bg-gray-200 h-5'></div>
                    </div>
                ))}

            </div>
        </div>

    )
}

export default Loading