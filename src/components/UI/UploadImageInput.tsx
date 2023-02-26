import { UploadIcon } from '@heroicons/react/solid'
import React, { useRef, ChangeEvent } from 'react'

interface Props {
    onSelectImage: (value: any) => void
}

const UploadImage: React.FC<Props> = ({ onSelectImage }) => {
    const input = useRef<HTMLInputElement>(null)

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        onSelectImage(e.target.files)
        input.current!.value = ''
    }

    return (
        <div
            className='border-2 border-dashed mb-7 text-center rounded-lg h-50 transition-all duration-300 ease-in-out
            text-gray-400 hover:text-gray-500 hover:border-gray-400'
        >
            <div className='h-full w-full'>
                <label
                    className="
                    block h-full w-full relative opacity-100 cursor-pointer "
                    htmlFor="product_images"
                >
                    <div className='h-full w-full m-auto p-5'>
                        <UploadIcon className='w-1/3 m-auto' />
                        <h3>Upload Images</h3>
                    </div>
                    <input
                        ref={input}
                        id="product_images"
                        type='file'
                        className='opacity-0 -mr-2 hidden'
                        onChange={onSelectFile}
                        multiple
                    />
                </label>
            </div>
        </div>
    )
}

export default UploadImage