
const LoadingItems: React.FC = () => {
    return (
        <>
            <div className="px-4 py-4 rounded-md shadow-lg sm:px-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                    <div
                    key={i}
                        className="grid grid-rows-6 sm:grid-rows-1 sm:grid-cols-6 gap-12 pt-6 pb-4 ph-item border-b"
                    >
                        <div className="w-full">
                            <div className="h-6 bg-gray-300 mb-2"></div>
                            <div className="h-2 bg-gray-300 mb-2"></div>
                        </div>
                        <div className="w-full">
                            <div className="h-2 bg-gray-300 mb-2"></div>
                            <div className="h-2 bg-white mb-2"></div>
                            <div className="h-2 bg-gray-300 mb-2"></div>
                        </div>
                        <div className="w-full">
                            <div className="h-2 bg-gray-300 mb-2"></div>
                            <div className="h-6 bg-gray-300 mb-2"></div>
                        </div>
                        <div className="w-full"></div>
                        <div className="w-full"></div>
                        <div className="w-full">
                            <div className="h-2 bg-gray-300 mb-2"></div>
                            <div className="h-2 bg-white mb-2"></div>
                            <div className="h-2 bg-gray-300 mb-2"></div>
                        </div>
                    </div>)}

            </div>
        </>
    )
}

export default LoadingItems