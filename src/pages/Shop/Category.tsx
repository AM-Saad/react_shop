import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '@/store/User/user_context'
import FetchError from '@/components/Common/FetchError'
import Loading from '@/components/Shop/MainProducts/Loading'
import ProductItem from '@/components/Shop/MainProducts/ProductItem'
import Pagination from '@/components/Common/Pagination'
const Category = () => {
    const { name }: any = useParams()
    const { productsMeta, products, update_products_pagination, update_products_meta, fetch_products, products_pagination } = useContext(UserContext)
    const { filters, loading, error } = productsMeta

    const updatePagination = (page: number) => {
        update_products_pagination({ ...products_pagination, currentPage: page })
    }
    useEffect(() => {
        update_products_meta({ filters: { ...filters, category: [name] } })
    }, [name])

    useEffect(() => {
        if(filters.category){
            fetch_products()
        }
    }, [filters.category])

    return (
        <div className="min-h-full max-w-2xl mx-auto py-16 px-4  sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-left mb-5 capitalize">{name}</h2>
            {/* <Filters /> */}
            {!loading && error && <FetchError reload={() => fetch_products} error={error} />}
            {!loading && !error && products.length === 0 && <>
                <p className='logo-font my-12 text-4xl text-center'>Nothing Here Yet, Stay Tuned 🤌</p>
            </>}
            <ul className=" grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {loading && <Loading />}
                {!loading && !error && products.length > 0 && <> {products.map((product) => <ProductItem product={product} />)} </>}
            </ul>
            {(!error && products_pagination) && <Pagination pagination={products_pagination} update={updatePagination} />}
        </div>
    )
}

export default Category