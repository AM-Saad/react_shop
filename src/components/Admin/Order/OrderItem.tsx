
import { Link } from 'react-router-dom'
import Order, { getOrderStatusColor, ORDER_STATUS_LABELS } from '../../../modals/Order';
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid'

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {

    return (
        <>
            <li key={order._id}>
                <Link to={`/admin/orders/${order._id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">#{order.serialNo}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getOrderStatusColor(order.status)}-200`}>
                                    {ORDER_STATUS_LABELS.get(order.status)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                    <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    {order.leadSource}
                                </p>

                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <p>
                                    Created At <time dateTime={order.date}>{order.date}</time>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </li>
        </>
    )
}

export default OrderItem