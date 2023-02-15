import React, { useContext, useEffect } from 'react'
import OrderItem from '../../../components/Admin/Order/OrderItem'
import RequestStatus from '../../../components/Admin/RequestStatus'
import Pagination from '../../../components/Common/Pagination'
import OrdersContext from '../../../store/Admin/orders-context'
import Filters from '../../../components/Admin/Order/Filters';

const Orders: React.FC = () => {
    const ordersCtx = useContext(OrdersContext)

    const { orders, fetch_orders, ordersMeta, update_pagination, pagination } = ordersCtx
    const { loading, error, filters } = ordersMeta
    const { currentPage } = pagination

    const updatePagination = (page: number) => {
        update_pagination({ ...pagination, currentPage: page })
    }

    useEffect(() => {
        fetch_orders()
    }, [filters, currentPage])



    return (

        <div className="p-4 sm:p-6">

            <div className=' mb-5  flex items-center justify-between'>
                <h1 className="font-bold text-2xl text-left">Orders</h1>
            </div>
            <Filters />

            <RequestStatus loading={loading} error={error} items={orders} label="orders" createNew={false} />
            {!loading && !error && orders.length > 0 && <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {orders.length > 0 && orders.map(order => <OrderItem key={order._id} order={order} />)}
                </ul>
            </div>}
            {!error && pagination && <Pagination pagination={pagination} update={updatePagination} />}

        </div>


    )
}

export default Orders