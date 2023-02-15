import Meta from './Meta';
import PaginationType from './Pagination';

export default interface CategoryInterface {
    active: boolean;
    featured: boolean;
    attributes: any[]
    name: string
    image: string
    subCategory: string[];
    _id?: string
}

export interface CategoryMeta extends Meta {
    pagination?: PaginationType
    filters: {
        active?: string | null 
        featured?: string | null 
    },

}