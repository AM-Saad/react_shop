import { useContext } from 'react'
import AdminContext from '../../../store/Admin/admin-context';
import { Link } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/solid'

import Product from '../../../modals/ProductResponse';
const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
    const adminCtx = useContext(AdminContext)
    return (
        <>
            <li>
                <Link to={`/admin/products/${product.slug}`} className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                            <div className="flex-shrink-0">
                                <img className="h-12 w-12 rounded-full object-cover" src={import.meta.env.REACT_APP_REST_API_URL + product.images[0]} alt="" />
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                <div>
                                    <p className="text-sm text-left font-medium text-indigo-600 truncate">{product.name}</p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                        <span className="truncate">{product.description}</span>
                                    </p>
                                </div>
                                <div className="hidden md:block">
                                    <div>

                                        {product.info.quantity > 0 && <p className="mt-2 flex items-center text-sm text-gray-500">
                                            <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                            In Stock
                                        </p>
                                        }
                                        {product.info.quantity === 0 && <p className="mt-2 flex items-center text-sm text-gray-500">
                                            <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            Out of Stock
                                        </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </li>
        </>
    )
}

export default ProductItem