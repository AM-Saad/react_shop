
const Loading = () => {
    return (
        <>
            {[0, 1, 2].map((item) => (
                <div className="group relative" key={item}>
                    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <div

                            className="w-full h-full object-center object-cover"
                        >
                        </div>
                    </div>
                    <h3 className="mt-6 text-sm bg-gray-100 h-8 rounded">

                    </h3>
                </div>
            ))}
        </>

    )
}

export default Loading