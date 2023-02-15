import Product from './Product';
import Category, { CategoryMeta } from './Category';
import Meta from './Meta';

import PaginationType from './Pagination';

export interface AuthMeta extends Meta {
    user: any;
    token: string | null;

}


export interface AdminContext {

    categories: Category[];
    currentCategory: Category | null;
    categoryMeta: CategoryMeta;
    fetch_categories: () => void,
    create_category: (form: FormData) => void,
    fetch_category: (id: string) => void,
    delete_category: (id: string) => void,
    update_partial_category: (json_patch: any) => void,
    updatingMeta: Meta;
    categoryPagination: PaginationType
    update_category_pagination: (data: PaginationType) => void
    upload_category_image: (id: string, files: any, tag: string) => Promise<any>,
    delete_category_image: (id: string, image: string, tag: string) => Promise<any>,
    update_category_meta: (data: any) => void
    update_partial_admin: (json_patch: any) => void,
    isLoggedIn:boolean
    authMeta:AuthMeta
    onLogout:()=> void,
    onLogin: (email: string, password: string) => void,
    getMe: () => void,


}

export default AdminContext