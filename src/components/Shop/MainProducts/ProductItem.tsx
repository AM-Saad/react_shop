import React from 'react'
import Product from '../../../modals/ProductResponse'


const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  
    return (
        <li data-testid="products" role="listitem" className="group p-2 relative rounded bg-white shadow">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                    src={import.meta.env.REACT_APP_REST_API_URL + product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm ">
                        <a href={'/products/' + product.slug} >
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </a>
                    </h3>
                </div>
                <p className="text-sm font-medium ">{product.info.price}$</p>
            </div>
        </li>
    )
}

export default ProductItem