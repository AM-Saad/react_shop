import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OrdersContext from '../../../store/Admin/orders-context'
import SingleOrder from '../../../components/Admin/Order/SingleOrder'
import OrderStatus from '../../../components/Admin/Order/OrderStatus'
import Modal from '../../../components/UI/Modal'
import FetchError from '../../../components/Common/FetchError'
import ConfirmDeleteItem from '../../../components/Common/ConfirmDeleteItem'

const Order = () => {
    const params = useParams()
    const { currentOrder, ordersMeta, fetch_order, delete_order, updatingMeta } = useContext(OrdersContext)
    const { id }: any = params


    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false)

    const confirmDeleteOrder = () => {
        if (currentOrder) delete_order(currentOrder?._id)
    }
    useEffect(() => {
        console.log('fetching order')
        fetch_order(id)
    }, [id])


    if (ordersMeta.loading) return <p>Loading...</p>

    if (!ordersMeta.loading && ordersMeta.error) {
        return <FetchError error={ordersMeta.error} reload={() => fetch_order(id)} />
    }
    return (
        <div className='p-4 sm:p-6' >
            <div className='flex items-center justify-between ' >
                <div className='flex items-center gap-2 mb-4 my-5'>
                    <h1 className='text-2xl font-bold text-left' ># {currentOrder?.serialNo}</h1>
                    <OrderStatus />
                </div>
                <button onClick={() => { setOpenConfirmDeleteModal(true) }} className=' py-2 px-4 text-sm bg-red-400 rounded hover:opacity-70 text-white' > Delete </button>
            </div>
            {currentOrder?.canceled?.status && <p className='text-sm text-gray-600 underline'>{currentOrder.canceled.reason}</p>}
            <Modal styles={'w-full sm:w-5/12 max-h-full overflow-scroll '} open={openConfirmDeleteModal} close={() => setOpenConfirmDeleteModal(false)}>
                <ConfirmDeleteItem label={'Order No: ' + currentOrder?.serialNo} cancel={() => setOpenConfirmDeleteModal(false)} confirmDelete={confirmDeleteOrder} loading={updatingMeta.loading} />
            </Modal>
            {currentOrder && <SingleOrder order={currentOrder} />}
        </div>
    )
}

export default Order