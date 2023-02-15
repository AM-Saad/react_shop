
const LoadingGallery = () => {
    return (
        <>
            <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8 cursor-pointer" >
                <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                    <div className="w-full h-full object-center object-cover bg-gray-100"
                    ></div>
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">

                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden h-64">
                        <div className="w-full h-full object-center object-cover bg-gray-100"
                        ></div>
                        <div className="w-full h-full object-center object-cover bg-gray-100"
                        ></div>
                    </div>

                </div>
                <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                    <div className="w-full h-full object-center object-cover bg-gray-100"
                    ></div>
                </div>
            </div>
        </>
    )
}

export default LoadingGallery