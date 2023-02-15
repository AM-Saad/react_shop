import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductResponse from '../../modals/ProductResponse'
import UserContext from '../../store/User/user_context'


const SearchList: React.FC<{ products: ProductResponse[] }> = ({ products }) => {
    const { searchMeta } = useContext(UserContext)

    return (

        <div className="absolute left-0 w-full mt-5 bg-white p-3 rounded shadow z-10">
            <div className="flow-root mt-6">
                {products.length > 0 && <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {products.map((product) => (
                        <li key={product._id} className="py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="h-8 w-8 rounded-full" src={import.meta.env.REACT_APP_REST_API_URL + product.images[0]} alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                </div>
                                <div>
                                    <Link to={`/products/${product.slug}`}
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>}
                {searchMeta?.loading && !searchMeta?.error && <p>Loading..</p>}
                {!searchMeta?.loading && searchMeta?.error && <p>{searchMeta.error}</p>}
                {!searchMeta?.loading && !searchMeta?.error && products.length === 0 && 
                <div>
                    <h2 className="font-semibold text-slate-900">No results found</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">We can’t find anything with that term at the moment, try searching something else.</p>
                </div>
                }
            </div>
            <div className="mt-6">
                <a
                    href="/my-shop"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    View all
                </a>
            </div>
        </div>
    )
}

export default SearchList