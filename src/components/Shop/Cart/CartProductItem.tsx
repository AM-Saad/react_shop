import React, { useContext } from 'react'
import QuantityBtn from '../../UI/QuantityBtn'
import UserContext from '../../../store/User/user_context'
import { Link } from 'react-router-dom'
import { CartItem } from '../../../modals/Cart'



const CartProductItem: React.FC<{ product: CartItem }> = ({ product }) => {
    const { delete_cart_item, update_cart_item } = useContext(UserContext)
    const updateQuantity = (val: number) => {
        update_cart_item?.(product._id, val)
    }

    return (
        <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={import.meta.env.REACT_APP_REST_API_URL + product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link to={`products/${product.name.replace(' ', '-')}`}> {product.name} </Link>
                        </h3>
                        <p className="ml-4">{product.price}$ / item</p>
                    </div>
                    {product.attributes.length > 0 && <div className='flex my-1 gap-3'>

                        {product.attributes.map((attribute) => <p key={product._id + attribute.option + attribute.name} className="text-sm text-gray-500">{attribute.option}</p>)}
                    </div>}
                </div>

                <div className="flex flex-1 items-center justify-between text-sm">
                    {/* <p className="text-gray-500">Qty {product.quantity}</p> */}
                    <QuantityBtn quantity={product.quantity} onChange={updateQuantity} />

                    <div className="flex">
                        <button
                            onClick={() => delete_cart_item?.(product._id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartProductItem