import ProductResponse, { ProductsMeta } from './ProductResponse'
import Meta from './Meta';
import PaginationType from './Pagination';

export interface ProjectContext {
    products: ProductResponse[];
    currentProduct: ProductResponse | null;
    productsMeta: ProductsMeta;
    pagination: PaginationType
    create_product: (form: FormData) => void,
    fetch_products: () => void,
    fetch_product: (id: string) => void,
    delete_product: (id: string) => void,
    update_partial_product: (json_patch: any) => void,
    upload_image: (id: string, files: any, tag: string) => Promise<any>,
    delete_image: (id: string, image: string, tag: string) => Promise<any>,
    updatingMeta: Meta,
    update_meta: (data: any) => void
    update_pagination: (data: any) => void
}

export default ProjectContext