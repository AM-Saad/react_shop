import React, { useState } from 'react'
import Modal from '../../UI/Modal'
import LoadingGallery from './LoadingGallery'

interface Props {
    images: string[],
    productName: string,
    loading: boolean
}

const ProductGallery: React.FC<Props> = ({ images, productName, loading }) => {
    const [openImagesModal, setOpenImagesModal] = useState(false)


    return (
        <>
            {loading && <LoadingGallery />}

            {!loading && images.length > 0 && <div>
                <Modal styles={'w-full sm:w-8/12 max-h-full overflow-scroll '} open={openImagesModal} close={() => setOpenImagesModal(false)}>
                    <div className="gap-5 grid">
                        {images.map((image: string) => {
                            return <div key={image} className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden ">
                                <img
                                    src={import.meta.env.REACT_APP_REST_API_URL + image}
                                    alt={productName}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                        })}

                    </div>
                </Modal>

                <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8 cursor-pointer" onClick={() => setOpenImagesModal(true)}>
                    <div className=" aspect-w-3 aspect-h-4 rounded-lg overflow-hidden ">
                        <img
                            src={import.meta.env.REACT_APP_REST_API_URL + images[0]}
                            alt={productName}
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                    {images.length > 1 && <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        {images.map((image: string, index: number) => {

                            return index !== 0 && index !== 3 && <div key={image} className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden h-64">
                                <img
                                    src={import.meta.env.REACT_APP_REST_API_URL + image}
                                    alt={productName}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                        })}

                    </div>}
                    {images[3] && <div className="hidden lg:block aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                        <img
                            src={import.meta.env.REACT_APP_REST_API_URL + images[3]}
                            alt={productName}
                            className="w-full h-full object-center object-cover"
                        />
                    </div>}
                    {/* Mobile View */}

                    <div className="block lg:hidden">
                        <div className='flex items-center'>

                            {images.map((image: string, index: number) => {

                                return index !== 0 && <div key={image + index} className=" rounded-lg overflow-hidden  h-64">
                                    <img
                                        src={import.meta.env.REACT_APP_REST_API_URL + image}
                                        alt={productName}
                                        className="w-full h-full object-center object-cover  "
                                        style={{ aspectRatio: '1' }}
                                    />
                                </div>
                            })}
                        </div>

                    </div>
                </div>
            </div>}

        </>
    )
}

export default ProductGallery