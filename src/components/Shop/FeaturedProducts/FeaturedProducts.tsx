import React, { useState, useEffect } from 'react'
import Product from '@/modals/ProductResponse'
import useHttp from '@/hooks/use-http'
import FeatureProductItem from './FeatureProductItem'
import Loading from '@/components/Shop/FeaturedProducts/Loading'
import FetchError from '@/components/Common/FetchError'
import HookResponse from '@/modals/HookResponse'
import ProductResponse from '@/modals/ProductResponse'

const FeaturedProducts = () => {
    const { sendRequest: fetch_products, isLoading, error } = useHttp()
    const [products, setProducts] = useState<Product[]>([])
    const set_products = (data: HookResponse<any>) => {
        setProducts(data.items.products as Product[])
    }
    const fetchProducts = () => {
        fetch_products({ url: `${import.meta.env.REACT_APP_REST_API_URL}/products?featured=true` }, set_products)

    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='my-20'>
            <h2 className='text-left  text-3xl font-bold mb-5'>Featured</h2>
            {!isLoading && error &&<FetchError reload={fetchProducts} error={error}/> }
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

                {isLoading && <Loading />}
                {!isLoading && !error && products.length > 0 && products.map(product => <FeatureProductItem key={product._id} product={product} url={import.meta.env.REACT_APP_REST_API_URL!} />)}
            </div>
        </div>
    )
}

export default FeaturedProducts