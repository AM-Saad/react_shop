import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import { UserContextInterface, AuthMeta } from '../../modals/UserContextInterface'
import Meta from '../../modals/Meta'
import { Cart } from '../../modals/Cart'
import ProductResponse, { ProductsMeta } from '../../modals/ProductResponse'
import Pagination from '../../modals/Pagination'
import Checkout from '../../modals/Checkout'
import serialize from '../../utils/serialize';
import { UserRepository } from '@/repositories/UserRepository'
import { State } from "@/modals/Respone";

const UserRepo = new UserRepository();
const initialPagination = {
    itemsPerPage: 10,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    lastPage: 1,
    nextPage: 2,
    prevPage: 0,
    total: 0,
    skip: 0,
}
const UserContext = React.createContext<UserContextInterface>({
    isLoggedIn: false,
    authMeta: { user: null, token: null, loading: false, error: null },
    products: [],
    fetch_products: () => { },
    fetch_product: (slug: string) => Promise.resolve({} as ProductResponse),
    update_products_pagination: (data: Pagination) => { },
    productsMeta: { loading: true, error: null, filters: {} },
    products_pagination: initialPagination,
    update_products_meta: (data: any) => { },
    fetch_categories: () => { },
    categories: [],
    cart: null,
    onLogin: (email: string, password: string) => { },
    onLogout: () => { },
    getMe: (token: string) => { },
    cartMeta: { loading: false, error: null },
    get_cart: () => { },
    add_to_cart: (payload: any) => { },
    toggle_cart: (state: boolean) => { },
    update_cart_item: (productId: string, quantity: number) => { },
    delete_cart_item: (productId: string) => { },
    checkout: (payload: Checkout) => { },
    checkoutMeta: { loading: false, error: null },
    search_products: (query: string) => null,
    searchMeta: { loading: false, error: null },
    zonesMeta: { loading: true, error: null },
    fetch_zones: () => { },
    zones: [],



})

export const UserContextProvider: React.FC<{ children?: React.ReactNode; }> = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [authMeta, setAuthMeta] = useState<AuthMeta>({ user: null, token: null, loading: false, error: null })
    const [cartMeta, setCartMeta] = useState<Meta>({ loading: false, error: null })
    const [categoryMeta, setCategoryMeta] = useState<Meta>({ loading: false, error: null })
    const [searchMeta, setSearchMeta] = useState<Meta>({ loading: false, error: null })
    const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
    const [cart, setCart] = useState<Cart | null>(null)
    const [checkoutMeta, setCheckoutMeta] = useState<Meta>({ loading: false, error: null })
    const [zonesMeta, setZonesMeta] = useState<Meta>({ loading: false, error: null })
    const [zones, setZones] = useState([])
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    const [productsMeta, setProductsMeta] = useState<ProductsMeta>({ loading: false, error: null, filters: {} })
    const [products_pagination, setProductsPagination] = useState(initialPagination)

    let history = useHistory()


    const signup = async (name: string, email: string, password: string, confirmPassword: string) => {
        setAuthMeta({ ...authMeta, loading: true, error: null })
        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/auth/signup`, {
                method: 'POST',
                body: JSON.stringify({ name, email, password: password, confirmPassword }), headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (response.status === 201) {
                setAuthMeta({ ...authMeta, loading: false, error: null })
                return history.push('/login')

            }

            return setAuthMeta({ ...authMeta, loading: false, error: json.message })

        } catch (error) {
            return setAuthMeta((prevState) => { return { ...prevState, loading: true, error: 'Something went wrong.' } })

        }
    }
    const login = async (email: string, password: string) => {
        setAuthMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/admin/login`, {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }), headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (response.status === 200) {

                setAuthMeta({ user: json.user, token: json.token, loading: false, error: null })
                setIsLoggedIn(true)
                localStorage.setItem('uid', json.token)
                getMe(json.token)
                return history.push('/')
            }
            return setAuthMeta({ ...authMeta, loading: false, error: 'Your information is incorrect.' })

        } catch (error) {
            return setAuthMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })


        }
    }

    const getMe = async (token: string) => {
        setAuthMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/auth/me`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,

                }
            })
            const json = await response.json()
            if (response.status === 200) {
                setAuthMeta((prevState) => { return { ...prevState, user: json.user, loading: false, error: null } })
                return setIsLoggedIn(true)
            }
            return setAuthMeta((prevState) => { return { ...prevState, loading: false, error: 'Your information is incorrect.' } })


        } catch (error) {
            return setAuthMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })

        }
    }
    const fetch_products = async () => {
        setProductsMeta((prevState => {
            return { ...prevState, loading: true, error: null }
        }))
        const { name, featured, popular, id, slug, min, max, category } = productsMeta.filters
        const params = new Map<string, string | string[]>();
        if (name) params.set("name", name);
        if (featured !== null && featured !== undefined) params.set("featured", featured);
        if (popular !== null && popular !== undefined) params.set("popular", popular);
        if (id) params.set("_id", id);
        if (slug) params.set("slug", slug);
        if (min) params.set("min", min);
        if (max) params.set("max", max);

        if (category && category?.length > 0) {
            console.log(category)
            params.set("category", category.map((s) => s.toString()));
        }
        const paramsUrl = serialize(params)

        const { items, message, state } = await UserRepo.fetch_products(products_pagination, paramsUrl)
        setProductsMeta((prevState => { return { ...prevState, loading: false, error: null } }))
        if (state === State.SUCCESS) {
            setProductsPagination(items.pagination)
            return setProducts(items.products)

        }
        setProductsMeta((prevState => { return { ...prevState, loading: false, error: message } }))


    }
    const fetch_product = async (slug: string): Promise<any> => {
        setProductsMeta((prevState => { return { ...prevState, loading: true, error: null } }))

        const { items, message, state } = await UserRepo.fetch_product(slug)
        setProductsMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            return items
        }
        if (state === State.ERROR) {
            setProductsMeta((prevState => { return { ...prevState, error: message } }))
        }
        return null
    }
    const get_cart = async () => {
        setCartMeta((prevState) => { return { ...prevState, loading: true, error: null } })
        const cardId = localStorage.getItem('cid')

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/cart?cart=${cardId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                }
            })
            const json = await response.json()
            if (response.status === 200) {
                setCartMeta((prevState) => { return { ...prevState, user: json.user, loading: false, error: null } })
                localStorage.setItem('cid', json.cart.sessionId)
                return setCart(json.cart)
            }
            return setCartMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong, we cannot find your cart...' } })

        } catch (error) {
            return setCartMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })

        }
    }
    const add_to_cart = async (payload: any) => {
        setCartMeta((prevState) => { return { ...prevState, loading: true, error: null } })
        const cid = localStorage.getItem('cid')

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/cart/${payload.productId}?cart=${cid}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ attributes: payload.attributes, quantity: payload.quantity })
            })
            const json = await response.json()
            if (response.status === 200) {
                setCartMeta((prevState) => { return { ...prevState, user: json.user, loading: false, error: null } })
                localStorage.setItem('cid', json.cart.sessionId)

                return setCart(json.cart)
            }
            return setCartMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong, we cannot find your cart...' } })

        } catch (error) {
            return setCartMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })

        }
    }
    const update_cart_item = async (productId: string, quantity: number) => {
        setCartMeta((prevState) => { return { ...prevState, loading: true, error: null } })
        const cid = localStorage.getItem('cid')

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/cart/${productId}?cart=${cid}&&qty=${quantity}`, {
                method: 'Put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
            })
            const json = await response.json()
            if (response.status === 200) {
                setCartMeta((prevState) => { return { ...prevState, user: json.user, loading: false, error: null } })
                localStorage.setItem('cid', json.cart.sessionId)
                setCart(json.cart)
                return setCartIsOpen(true)
            }
            return setCartMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong, we cannot find your cart...' } })

        } catch (error) {
            return setCartMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })

        }
    }
    const delete_cart_item = async (productId: string) => {
        setCartMeta((prevState) => { return { ...prevState, loading: true, error: null } })
        const cid = localStorage.getItem('cid')

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/cart/${productId}?cart=${cid}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
            })
            const json = await response.json()
            if (response.status === 200) {
                setCartMeta((prevState) => { return { ...prevState, user: json.user, loading: false, error: null } })
                return setCart(json.cart)
            }
            return setCartMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong, we cannot find your cart...' } })

        } catch (error) {
            return setCartMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })

        }
    }

    const checkout = async (payload: Checkout) => {
        setCheckoutMeta((prevState) => { return { ...prevState, loading: true, error: null } })
        const cid = localStorage.getItem('cid')

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/checkout?cart=${cid}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(payload)
            })
            const json = await response.json()

            if (response.status === 200) {
                setCart((prevState) => { return { ...prevState!, items: [] } })

                return history.push(`/order/${json.order.serialNo}`)

            }
            return setCheckoutMeta((prevState) => { return { ...prevState, loading: false, error: json.message } })

        } catch (error) {
            console.log(error)
            return setCheckoutMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })

        }
    }

    const search_products = async (query: string): Promise<ProductResponse[]> => {
        setSearchMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/search?q=${query}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json()
            if (response.status === 200) {
                setSearchMeta((prevState) => { return { ...prevState, user: json.user, loading: false, error: null } })
                const items: ProductResponse[] = json.items
                return items
            }
            setSearchMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong...' } })
            return []

        } catch (error) {
            setSearchMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })
            return []

        }
    }


    const fetch_zones = async () => {
        setZonesMeta({ loading: true, error: null })

        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/zones`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            setZonesMeta({ loading: false, error: null })
            if (response.status === 200) {
                return setZones(json.items)
            }
            return setZonesMeta({ loading: false, error: json.message })

        } catch (error) {
            return setZonesMeta({ loading: false, error: 'Something went wrong' })
        }
    }



    const fetch_categories = async () => {
        setCategoryMeta((prevState => {
            return { ...prevState, loading: true, error: null }
        }))
        // const { active, featured } = categoryMeta.filters

        // const params = new Map<string, string | string[]>();
        // if (featured !== null && featured !== undefined) params.set("featured", featured);
        // if (active !== null && active !== undefined) params.set("active", active);
        // const paramsUrl = serialize(params)
        try {
            const response = await fetch(`${import.meta.env.REACT_APP_REST_API_URL}/categories`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                }
            })
            const json = await response.json()
            setCategoryMeta((prevState => {
                return { ...prevState, loading: false, error: null }
            }))
            if (response.status === 200) {

                return setCategories(json.items)
            }

            return setCategoryMeta((prevState => {
                return { ...prevState, loading: false, error: json.message }
            }))
        } catch (error) {
            return setCategoryMeta((prevState => {
                return { ...prevState, loading: false, error: 'Something went wrong' }
            }))

        }
    }


    const update_products_meta = async (data: any) => {
        setProductsPagination(prevState => { return { ...prevState, currentPage: 1 } })
        setProductsMeta(prevState => { return { ...prevState, ...data } })
    }

    const update_products_pagination = async (data: Pagination) => {
        console.log(data)
        setProductsPagination(data)
    }
    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('uid')
    }
    const toggle_cart = (state: boolean) => {
        return setCartIsOpen(state)
    }



    const authContext = {
        onLogin: login,
        onLogout: logout,
        onSignup: signup,
        getMe,
        get_cart,
        add_to_cart,
        cart,
        cartMeta,
        toggle_cart,
        update_cart_item,
        delete_cart_item,
        cartIsOpen,
        search_products,
        searchMeta,
        isLoggedIn: isLoggedIn,
        authMeta,
        checkoutMeta,
        checkout,
        zones,
        fetch_zones,
        zonesMeta,
        productsMeta,
        update_products_pagination,
        update_products_meta,
        categories,
        fetch_categories,
        products,
        fetch_products,
        fetch_product,
        products_pagination
    }

    useEffect(() => {
        const uid = localStorage.getItem('uid')
        if (uid) {
            setIsLoggedIn(true)
            setAuthMeta((prevState => { return { ...prevState, token: uid.toString(), loading: true } }))
            // Why getMe() not able to get the new token
            getMe(uid)
        } else {
            setIsLoggedIn(false)
        }
        update_products_pagination(initialPagination)

        get_cart()

    }, [])
    return <UserContext.Provider value={authContext}>
        {props.children}
    </UserContext.Provider>
}


export default UserContext