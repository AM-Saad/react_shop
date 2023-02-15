import React from 'react'


interface Props {
    reload: () => void;
    error?: string
}
const FetchError: React.FC<Props> = ({ reload, error }) => {
    return (
        <>
            <div role='alert' className='border border-gray-200 flex flex-col items-center gap-3 p-4 rounded'>
                {error && <p className='mb-2 text-red-500 font-bold text-center'>{error} 👀</p>}
                <p className='mb-2 text-gray-500 font-bold text-center'>Please check your connection or try again.</p>
                <button onClick={reload} className='bg-gray-400 hover:opacity-70 px-4 py-2 rounded text-sm text-white w-2/6'>Reload</button>
            </div>
        </>
    )
}

export default FetchError