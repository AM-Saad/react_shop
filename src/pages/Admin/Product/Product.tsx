import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminContext from '@/store/Admin/admin-context'
import ProductsContext from '@/store/Admin/products-context'
import SingleProduct from '@/components/Admin/Products/SingleProduct'
import FetchError from '@/components/Common/FetchError'
import Modal from '@/components/UI/Modal'
import ConfirmDeleteItem from '@/components/Common/ConfirmDeleteItem'
const Product = () => {
    const params = useParams()
    const { slug }: any = params
    const adminCtx = useContext(AdminContext)
    const productsCtx = useContext(ProductsContext)
    const { currentProduct, productsMeta, fetch_product, delete_product } = productsCtx
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false)


    const cofirmDeleteProduct = () => {
        if (currentProduct) delete_product(currentProduct?._id!)
    }

    useEffect(() => {
        fetch_product(slug)
    }, [slug])

    if (productsMeta.loading) {
        return <p>Loading...</p>
    }

    if (!productsMeta.loading && productsMeta.error) {
        return <FetchError error={productsMeta.error} reload={() => fetch_product(slug)} />
    }
    if (currentProduct) {
        return (
            <div className="p-4 sm:p-6">
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold mb-4 text-left my-5'>Your Product.</h1>
                    {currentProduct && !adminCtx.updatingMeta.loading && <button onClick={() => { setOpenConfirmDeleteModal(true) }} className=' py-2 px-4 text-sm bg-red-400 rounded hover:opacity-70 text-white' > Delete </button>}
                    {adminCtx.updatingMeta.loading && <button className=' py-2 px-4 text-sm bg-red-400 rounded hover:opacity-70 text-white opacity-50' > Delete </button>}
                </div>
                <Modal styles={'w-full sm:w-4/12 max-h-full overflow-scroll '} open={openConfirmDeleteModal} close={() => setOpenConfirmDeleteModal(false)}>
                    <ConfirmDeleteItem label='Product' cancel={() => setOpenConfirmDeleteModal(false)} confirmDelete={cofirmDeleteProduct} />
                </Modal>
                <SingleProduct />
            </div>
        )
    }
    return <></>

}

export default Product