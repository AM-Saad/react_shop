import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ProductResponse from '../../../modals/ProductResponse'
import AdminContext from '../../../store/Admin/admin-context'
import { useIsFirstRender } from '../../../hooks/use-is-first-render';
import CategoryInterface from '../../../modals/Category';
import Order from '../../../modals/Order';
import classes from './search.module.css'


interface Props {
    products: ProductResponse[],
    categories: CategoryInterface[],
    orders: Order[],
    loading: boolean,
    error: string | null;
    onClose: () => void;
}
const SearchList: React.FC<Props> = ({ products, categories, orders, loading, error, onClose }) => {
    const isEmptySearch = useMemo(() => products.length === 0 && categories.length === 0 && orders.length === 0, [categories, products, orders]);

    const isFirstRender = useIsFirstRender()
    const close = (e: any) => {
        e.stopPropagation();
        onClose()
    }
    return (
        <div
            onClick={close}
            className={classes['search-result']}
        >
            <div onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault()
            }} className="absolute bg-white flow-root sm:left-28 mt-20 mt-6 p-5 rounded-xl shadow-xl sm:w-10/12 transform w-full z-10 ">
                {!isEmptySearch && <div className='gap-3 hidden sm:grid grid-cols-3 mb-4 py-2 rounded  text-center'>
                    <div className='flex items-center justify-center gap-2'>Products <div className='h-5 w-5 rounded-full bg-gray-100 text-sm'>{products.length}</div></div>
                    <div className='flex items-center justify-center gap-2'>Categories <div className='h-5 w-5 rounded-full bg-gray-100 text-sm'>{categories.length}</div></div>
                    <div className='flex items-center justify-center gap-2'>Orders <div className='h-5 w-5 rounded-full bg-gray-100 text-sm'>{orders.length}</div></div>
                </div>}

                <div className='grid sm:grid-cols-3 gap-5'>
                    <ul role="list" className="-my-5 divide-y divide-gray-200 col-span-1">
                        {!loading && !isEmptySearch && <div className='flex sm:hidden items-center gap-2 my-5'>Products <div className='h-5 w-5 rounded-full bg-gray-100 text-center text-sm'>{products.length}</div></div>}

                        {products.length > 0 && !loading && products.map((product) => (
                            <li key={product._id} className="py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="h-8 w-8 rounded-full" src={import.meta.env.REACT_APP_REST_API_URL + product.images[0]} alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                    </div>
                                    <div>
                                        <Link to={`/admin/products/${product.slug}`}
                                            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul role="list" className="-my-5 divide-y divide-gray-200 col-span-1">
                        {!loading && !isEmptySearch && <div className='flex sm:hidden items-center gap-2 my-5'>Categories <div className='h-5 w-5 rounded-full bg-gray-100 text-center text-sm'>{categories.length}</div></div>}

                        {categories.length > 0 && !loading && categories.map((item) => (
                            <li key={item._id} className="py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="h-8 w-8 rounded-full" src={import.meta.env.REACT_APP_REST_API_URL + item.image} alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                    </div>
                                    <div>
                                        <Link to={`/admin/category/${item._id}`}
                                            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul role="list" className="-my-5 divide-y divide-gray-200 col-span-1">
                        {!loading && !isEmptySearch && <div className='flex sm:hidden items-center gap-2 my-5'>Orders <div className='h-5 w-5 rounded-full bg-gray-100 text-center text-sm'>{orders.length}</div></div>}

                        {orders.length > 0 && !loading && orders.map((item) => (
                            <li key={item._id} className="py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="h-8 w-8 rounded-full bg-gray-100" alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">#{item.serialNo}</p>
                                    </div>
                                    <div>
                                        <Link to={`/admin/orders/${item._id}`}
                                            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {loading && !error && <p>Loading..</p>}
                {!loading && error && <p>{error}</p>}
                {!isFirstRender && !loading && !error && products.length === 0 && categories.length === 0 && orders.length === 0 &&
                    <div>
                        <h2 className="font-semibold text-slate-900">No results found</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">We can’t find anything with that term at the moment, try searching something else.</p>
                    </div>
                }
                {isFirstRender &&
                    <div>
                        <h2 className="font-semibold text-slate-900">Search </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">Start searching for any thing( eg. Products, categories, zones, etc..)</p>
                    </div>
                }
            </div>

        </div>
    )
}

export default SearchList