import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../../../modals/ProductResponse'


const FeatureProductItem: React.FC<{ product: Product, url: string }> = ({ product, url }) => {
    return (
        <Link key={product._id} to={'/products/' + product.slug} className="group h-5/6">
            <div className="w-full h-full aspect-w-1 aspect-h-1 bg-gray-200 border rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src={url + product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm ">{product.name}</h3>
            <p className="mt-1 text-lg font-medium ">{product.info.price}$</p>
        </Link>
    )
}

export default FeatureProductItem