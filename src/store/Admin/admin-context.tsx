import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"

import AdminContextType from '@/modals/AdminContext';
import ProductResponse from '@/modals/ProductResponse';
import Pagination from '@/modals/Pagination';
import Category, { CategoryMeta } from '@/modals/Category';
import Meta from '@/modals/Meta';
import { AuthMeta } from '@/modals/UserContextInterface'
import serialize from '@/utils/serialize';
import { toast } from "react-toastify";
import Response, { State } from '@/modals/Respone';
import { AdminRepository } from '@/repositories/AdminRepository'

const AdminRepo = new AdminRepository();

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
const AdminContext = React.createContext<AdminContextType>({
    categories: [],
    categoryMeta: { loading: true, error: null, filters: {} },
    categoryPagination: initialPagination,
    currentCategory: null,
    fetch_categories: (page?: number) => { },
    fetch_category: (id: string) => { },
    create_category: (form: FormData) => { },
    delete_category: (id: string) => { },
    update_partial_category: (json_patch: any) => { },
    updatingMeta: { loading: true, error: null },
    upload_category_image: (id: string, files: any, tag: string) => Promise.resolve() as any,
    delete_category_image: (id: string, image: string, tag: string) => Promise.resolve() as any,
    isLoggedIn: false,
    authMeta: { user: null, token: null, loading: false, error: null },
    onLogout: () => { },
    onLogin: (email: string, password: string) => { },
    getMe: () => { },
    update_category_pagination: (data: Pagination) => { },
    update_category_meta: (data: any) => { },
    update_partial_admin: (json_patch: any) => { },
})

export const AdminContextProvider: React.FC<{ children?: React.ReactNode; }> = (props) => {
    let history = useHistory()

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [authMeta, setAuthMeta] = useState<AuthMeta>({ user: null, token: null, loading: false, error: null })
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
    const [categoryMeta, setCategoryMeta] = useState<CategoryMeta>({ loading: false, error: null, filters: {} })
    const [updatingMeta, setUpdatingMeta] = useState<Meta>({ loading: false, error: null })
    const [categories, setCategories] = useState([])
    const [categoryPagination, setCategoryPagination] = useState(initialPagination)

    const [searchMeta, setSearchMeta] = useState<Meta>({ loading: false, error: null })


    const create_category = async (form: FormData) => {
        setCategoryMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { state, message, items }: Response = await AdminRepo.create_category(form)

        setCategoryMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            toast.success(message)
            return history.push(`/admin/category/${items._id}`)

        }
        toast.error(message)
        return setCategoryMeta((prevState => { return { ...prevState, error: message } }))

    }

    const fetch_categories = async () => {
        const { active, featured } = categoryMeta.filters

        const params = new Map<string, string | string[]>();
        if (featured !== null && featured !== undefined) params.set("featured", featured);
        if (active !== null && active !== undefined) params.set("active", active);
        const paramsUrl = serialize(params)

        setCategoryMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { state, message, items }: Response = await AdminRepo.fetch_categories(categoryPagination, paramsUrl)
        setCategoryMeta((prevState => { return { ...prevState, loading: false } }))

        if (state === State.SUCCESS) {
            update_category_pagination(items.pagination)
            return setCategories(items.items)
        }
        setCategoryMeta((prevState => { return { ...prevState, loading: false, error: message } }))

    }
    const fetch_category = async (id: string) => {


        setCategoryMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { state, message, items }: Response = await AdminRepo.fetch_category(id)

        setCategoryMeta((prevState => { return { ...prevState, loading: false } }))

        if (state === State.SUCCESS) {
            return setCurrentCategory(items)
        }
        setCategoryMeta((prevState => { return { ...prevState, loading: false, error: message } }))


    }

    const delete_category = async (id: string) => {

        setCategoryMeta((prevState => { return { ...prevState, loading: true, error: null } }))

        const { state, message }: Response = await AdminRepo.delete_category(id)

        setCategoryMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            toast.success(message)
            return history.push('/admin/category')
        }

        toast.error(message)
        return setCategoryMeta((prevState => { return { ...prevState, error: null } }))

    }



    const upload_category_image = async (id: string, files: any, tag: string): Promise<any> => {
        setUpdatingMeta({ loading: true, error: null })

        const newForm = new FormData()
        for (const img of files) {
            newForm.append('image', img.image)
        }

        const { state, message, items }: Response = await AdminRepo.upload_category_image(id, tag, newForm)

        setUpdatingMeta({ loading: false, error: null })

        toast[state](message)
        if (state === State.SUCCESS) {
            setCurrentCategory(items)
            return true
        }
        setUpdatingMeta({ loading: false, error: message })
        return false

    }
    const delete_category_image = async (id: string, image: string, tag: string): Promise<any> => {

        setUpdatingMeta({ loading: true, error: null })

        const { state, message, items }: Response = await AdminRepo.delete_category_image(id, tag, image)

        setUpdatingMeta({ loading: false, error: null })
        toast[state](message)

        if (state === State.SUCCESS) {
            setCurrentCategory(items)
            return true

        }
        setUpdatingMeta({ loading: false, error: message })
        return false


    }


    const update_partial_category = async (json_patch: any) => {

        setUpdatingMeta({ loading: true, error: null })

        const { items, message, state }: Response = await AdminRepo.update_partial_category(currentCategory?._id!, json_patch)

        setUpdatingMeta({ loading: false, error: null })

        if (state === State.SUCCESS) {
            return setCurrentCategory(items)
        }
        toast.error(message)
        return setUpdatingMeta({ loading: false, error: message })

    }


    const login = async (email: string, password: string) => {

        setAuthMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        const { items, state, message }: Response = await AdminRepo.login(email, password)

        if (state === State.SUCCESS) {
            setAuthMeta({ user: items.user, token: items.token, loading: false, error: null })
            setIsLoggedIn(true)
            localStorage.setItem('uid', items.token)
            return window.location.href = '/admin/products'
        }
        return setAuthMeta({ ...authMeta, loading: false, error: message })

    }

    const update_partial_admin = async (json_patch: any) => {
        setAuthMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        const { items, message, state }: Response = await AdminRepo.update_partial_admin(authMeta.user?._id!, json_patch)
        if (state === State.SUCCESS) {
            toast.success(message)
            return setAuthMeta((prevState) => { return { ...prevState, loading: false, user: items } })
        }
        toast.error(message)
        return setAuthMeta((prevState) => { return { ...prevState, loading: false, error: message } })

    }

    const getMe = async () => {

        setAuthMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        const { items, message, state }: Response = await AdminRepo.me()

        setAuthMeta((prevState) => { return { ...prevState, user: items, loading: false } })
        if (state === State.SUCCESS) {
            return setIsLoggedIn(true)
        }
        setIsLoggedIn(false)
        return setAuthMeta((prevState) => { return { ...prevState, error: message } })


    }

    const search_products = async (query: string): Promise<ProductResponse[]> => {
        setSearchMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        const { items, message, state }: Response = await AdminRepo.search_products(query)
        if (state === State.SUCCESS) {
            return items
        }
        setSearchMeta((prevState) => { return { ...prevState, loading: false, error: message } })
        return []

    }
    const update_category_pagination = async (data: Pagination) => {
        return setCategoryPagination(data)
    }


    const update_category_meta = async (data: any) => {
        setCategoryPagination(prevState => { return { ...prevState, currentPage: 1 } })
        setCategoryMeta(prevState => { return { ...prevState, ...data } })
    }
    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('uid')
    }


    useEffect(() => {
        const uid = localStorage.getItem('uid')
        if (uid) {
            setIsLoggedIn(true)
            setAuthMeta((prevState => { return { ...prevState, token: uid.toString(), loading: true } }))
            getMe()
        } else {
            setIsLoggedIn(false)
        }
        update_category_pagination(initialPagination)
    }, [])
    const adminContext = {


        categoryMeta,
        categories,
        currentCategory,
        fetch_categories,
        fetch_category,
        delete_category,
        create_category,
        update_partial_category,
        categoryPagination,
        upload_category_image,
        delete_category_image,
        updatingMeta,
        onLogin: login,
        onLogout: logout,
        getMe,
        isLoggedIn: isLoggedIn,
        authMeta,
        update_category_pagination,
        search_products,
        searchMeta,
        update_category_meta,
        update_partial_admin,
    }


    return <AdminContext.Provider value={adminContext}>
        {props.children}
    </AdminContext.Provider>
}


export default AdminContext