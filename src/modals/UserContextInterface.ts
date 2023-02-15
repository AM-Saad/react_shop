import { Cart } from './Cart'
import Meta from './Meta'
import Product, { ProductsMeta } from './ProductResponse'
import Pagination from './Pagination'
import Checkout from './Checkout'
import Zone from './Zone';

export type User = {
    cart: string;
    email: string;
    name: string
    orders: []
    password: string
    signUpToken: string | null
    _id: string
}

export interface AuthMeta extends Meta {
    user: User | null;
    token: string | null;

}
export interface SearchMeta extends Meta {
    from?: string
    to?: string
    price?: number
    pagination?: Pagination
}

export interface UserContextInterface {
    isLoggedIn: boolean;
    authMeta: AuthMeta;
    products:Product[]
    products_pagination: Pagination
    update_products_pagination: (query: Pagination) => void
    productsMeta: ProductsMeta
    update_products_meta: (data: any) => void;
    fetch_products: () => void,
    fetch_product: (slug:string) => Promise<Product>,
    fetch_categories: () => void,
    categories: any[];
    cart?: Cart | null;
    onLogin: (email: string, password: string) => void,
    onLogout: () => void,
    getMe: (token: string) => void,
    get_cart?: () => void
    cartMeta?: Meta,
    add_to_cart?: (payload: any) => void
    update_cart_item?: (productId: string, quantity: number) => void
    toggle_cart?: (state: boolean) => void
    delete_cart_item?: (productId: string) => void
    cartIsOpen?: boolean
    search_products?: (query: string) => Promise<Product[]> | null
    searchMeta?: SearchMeta,
    checkout?: (payload: Checkout) => void
    checkoutMeta?: Meta
    zonesMeta?: Meta,
    zones?: Zone[],
    fetch_zones?: () => void,


}

export default UserContextInterface