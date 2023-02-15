
const Loading = () => {
    return (
        <>

            {[1, 2, 3].map(i =>
                <li className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md  bg-gray-100">
                        <div

                            className="h-full w-full object-cover object-center"
                        ></div>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 className='w-3/5 p-3 bg-gray-100'>

                                </h3>
                                <p className="ml-4 p-3 bg-gray-100"></p>
                            </div>
                            <div className='flex mt-1 gap-3 p-3 bg-gray-100'>

                                <p className="text-sm text-gray-500"></p>
                            </div>
                        </div>

                        <div className="flex flex-1 items-center justify-between text-sm">
                            <div className='bg-gray-100 flex items-center p-2 rounded w-2/4'>
                                <span className="rounded bg-gray-200 cursor-pointer hover:bg-gray-100 mx-2 p-1"></span>
                                <div className="quantity-input bg-gray-100 p-1 w-10/12 text-center">

                                </div>
                                <span className="rounded bg-gray-200 cursor-pointer hover:bg-gray-100 mx-2 p-1"></span>

                            </div>

                            <div className="flex">
                                <div
                                    className="p-3 bg-gray-100"
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )}
        </>

    )
}

export default Loading