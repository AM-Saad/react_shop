import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userContext from '@/store/User/user_context';
import ProductItem from '@/components/Shop/MainProducts/ProductItem'
import RequestStatus from '@/components/Admin/RequestStatus'
import Pagination from '@/components/Common/Pagination'
import Filters from '@/components/Shop/Filters';
const Products = () => {
    const userCtx = useContext(userContext)
    const { productsMeta, products, fetch_products, products_pagination, update_products_pagination } = userCtx
    const { loading, error, filters } = productsMeta
    const { currentPage } = products_pagination


    const updatePagination = (page: number) => {
        update_products_pagination({ ...products_pagination, currentPage: page })
    }

    useEffect(() => {
        fetch_products()
    }, [filters, currentPage])


    return (

            <div className='bg-gray-50 gap-5 sm:grid grid-cols-4 h-[calc(100vh - 64px)] pt-4 relative'>
                <div className='sm:sticky top-0'>
                    <Filters />
                </div>
                <div className='col-span-3'>
                    {!loading && !error &&
                        <div className="flex flex-col justify-between min-h-full overflow-hidden p-3 sm:rounded-md sm:mr-10">
                            {products.length > 0 &&
                                <>
                                    <ul className=" grid gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                        {products.map(product => <ProductItem key={product._id} product={product} />)}
                                    </ul>
                                    {products_pagination && <Pagination pagination={products_pagination} update={updatePagination} />}
                                </>

                            }
                            {products.length === 0 && <p className='logo-font my-12 text-4xl text-center'>Nothing Here Yet, Stay Tuned 🤌</p>}
                        </div>
                    }
                </div>

            </div>

    )
}

export default Products