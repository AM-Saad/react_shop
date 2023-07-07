import React, { useEffect, useState } from 'react'
import initialize from '@/components/Shop/Product/ShowAr'
import AddToCartBtn from '@/components/UI/AddToCartBtn'
import Button from '@/components/UI/Button'
import { useParams } from 'react-router-dom'


const ShowAr = () => {
    const { slug }: any = useParams()

    const [product, setProduct] = useState<any>()

    const fetch_product = async (slug: string) => {
        const res = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/products/${slug}`)
        const data = await res.json()
        setProduct(data.items)
        if (data) {
            const path = `${import.meta.env.REACT_APP_REST_API_URL}${data.items.images[0]}`
            console.log(path)
            initialize(path)
        }
    }


    useEffect(() => {
        if (slug) fetch_product(slug)

    }, [slug])
    return (

        <>
            <div className="min-h-full  mx-auto py-16 px-4  sm:px-6 lg:max-w-7xl lg:px-8">
                <h1>..</h1>
            </div>
        </>
    )
}

export default ShowAr