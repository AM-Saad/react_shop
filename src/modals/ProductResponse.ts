import Meta from './Meta';
import PaginationType from './Pagination';

interface ProductResponse {
    attributes: [];
    category: { name: string, subCategory: string | null }
    createdAt: string;
    description: string;
    details: string;
    discount: string | number;
    images: string[];
    info: {
        initialQuanitity: number;
        price: number;
        purchasingPrice: number;
        quantity: number;
        refunded: number;
    }
    name: string;
    ratings: []
    reviews: []
    serial: number;
    sku: string;
    slug: string;
    units: [];
    updatedAt: string;
    _id: string;
    featured: boolean;
    popular: boolean;
}


export interface ProductsMeta extends Meta {
    filters: {
        name?: string | null;
        id?: string | null;
        min?: string | null;
        max?: string | null;
        minQty?:string | null;
        maxQty?:string | null;
        slug?: string | null;
        category?: string[],
        popular?: string | null 
        featured?: string | null 
    }

}
export default ProductResponse