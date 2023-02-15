import React, { useContext } from 'react'
import AdminContext from '../../../store/Admin/admin-context'
import { Link } from 'react-router-dom'
import { OrderItem } from '../../../modals/Order'

const OrderItemRow: React.FC<{ item: OrderItem }> = ({ item }) => {

    const adminCtx = useContext(AdminContext)

    return (
        <li className="flex">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={import.meta.env.REACT_APP_REST_API_URL + item?.image || ''}
                    alt={item.name}
                    className="h-full w-full object-cover object-center bg-gray-100"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <Link to={`products/${item.name.replace(' ', '-')}`}> {item.name} </Link>
                            </h3>
                        <div>
                        <p className="ml-4">{item.price}$ / item</p>
                        <p className="ml-4">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    {item.attributes.length > 0 && <div className='flex my-1 gap-3'>

                        {item.attributes.map((attribute) => <p key={item._id + attribute.option + attribute.name} className="text-sm text-gray-500">{attribute.option}</p>)}
                    </div>}
                </div>


            </div>
        </li>
    )
}

export default OrderItemRow