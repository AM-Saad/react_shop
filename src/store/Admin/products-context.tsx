import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom"

import ProductsType from '../../modals/ProductsContext';
import ProductResponse, { ProductsMeta } from '../../modals/ProductResponse';
import Pagination from '../../modals/Pagination';
import Meta from '../../modals/Meta';
import serialize from '../../utils/serialize';
import Response, { State } from '../../modals/Respone';
import { toast } from "react-toastify";

import { ProductRepository } from '../../repositories/ProductRepository'
const ProductRepo = new ProductRepository();

const initialPagination = {
    itemsPerPage: 4,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    lastPage: 1,
    nextPage: 2,
    prevPage: 0,
    total: 0,
    skip: 0,
}
const ProductsContext = React.createContext<ProductsType>({
    products: [],
    productsMeta: { loading: true, error: null, filters: {} },
    pagination: initialPagination,
    currentProduct: null,
    create_product: (form: FormData) => { },
    fetch_products: () => { },
    fetch_product: (id: string) => { },
    delete_product: (id: string) => { },
    update_partial_product: (json_patch: any) => { },
    upload_image: (id: string, files: any, tag: string) => Promise.resolve() as any,
    delete_image: (id: string, image: string, tag: string) => Promise.resolve() as any,
    updatingMeta: { loading: true, error: null },
    update_meta: (data: any) => { },
    update_pagination: (data: Pagination) => { }
})

export const ProductsContextProvider: React.FC<{ children?: React.ReactNode; }> = (props) => {
    let history = useHistory()


    const [productsMeta, setProductsMeta] = useState<ProductsMeta>({ loading: false, error: null, filters: {} })
    const [pagination, setPagination] = useState(initialPagination)
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState<ProductResponse | null>(null)

    const [updatingMeta, setUpdatingMeta] = useState<Meta>({ loading: false, error: null })

    const [searchMeta, setSearchMeta] = useState<Meta>({ loading: false, error: null })



    const create_product = async (form: FormData) => {
        setUpdatingMeta((prevState => { return { ...prevState, loading: true, error: null } }))

        const { state, message, items }: Response = await ProductRepo.create_product(form)

        setUpdatingMeta((prevState => { return { ...prevState, loading: false } }))
        toast[state](message)

        if (state === State.SUCCESS) {
            return history.push(`/admin/products/${items.slug}`)
        }

        setUpdatingMeta((prevState => { return { ...prevState, loading: false, error: message } }))

    }

    const fetch_products = async () => {

        setProductsMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { name, featured, popular, id, slug, min, max, minQty, maxQty, category } = productsMeta.filters
        const params = new Map<string, string | string[]>();
        if (name) params.set("name", name);
        if (featured !== null && featured !== undefined) params.set("featured", featured);
        if (popular !== null && popular !== undefined) params.set("popular", popular);
        if (id) params.set("_id", id);
        if (slug) params.set("slug", slug);
        if (min) params.set("min", min);
        if (max) params.set("max", max);
        if (minQty) params.set("minQty", minQty);
        if (maxQty) params.set("maxQty", maxQty);
        if (category && category?.length > 0) {
            params.set("category", category.map((s) => s.toString()));
        }
        const paramsUrl = serialize(params)

        const { state, message, items }: Response = await ProductRepo.fetch_products(pagination, paramsUrl)

        setProductsMeta((prevState => { return { ...prevState, loading: false, error: null } }))
        if (state === State.SUCCESS) {
            setPagination(items.pagination)
            return setProducts(items.items)
        }
        setProductsMeta((prevState => { return { ...prevState, error: message } }))


    }
    const fetch_product = async (id: string) => {
        setProductsMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { state, message, items }: Response = await ProductRepo.fetch_product(id)

        setProductsMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            return setCurrentProduct(items)
        }
        setProductsMeta((prevState => { return { ...prevState, error: message } }))

    }
    const update_partial_product = async (json_patch: any) => {
        setUpdatingMeta({ loading: true, error: null })

        const { state, message, items }: Response = await ProductRepo.update_partial_product(currentProduct?._id!, json_patch)

        setUpdatingMeta({ loading: false, error: null })
        if (state === State.SUCCESS) {
            toast.success(message)
            window.history.pushState({}, '', `/admin/products/${items.slug}`);
            return setCurrentProduct(items)
        }
        toast.error(message)
        return setUpdatingMeta({ loading: false, error: message })


    }
    const delete_product = async (id: string) => {
        setProductsMeta((prevState => {
            return { ...prevState, loading: true, error: null }
        }))

        const { state, message, items }: Response = await ProductRepo.delete_product(currentProduct?._id!)


        setProductsMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            toast.success(message)
            return history.push('/admin/products')

        }
        toast.error(message)
        setProductsMeta((prevState => { return { ...prevState, loading: false, error: message } }))

    }
    const upload_image = async (id: string, files: any, tag: string): Promise<any> => {
        setUpdatingMeta({ loading: true, error: null })

        const newForm = new FormData()
        for (const img of files) newForm.append('image', img)

        const { state, message, items }: Response = await ProductRepo.upload_image(id, tag, newForm)

        setUpdatingMeta({ loading: false, error: null })

        if (state === State.SUCCESS) {
            setCurrentProduct(items)
            return items
        }
        toast.error(message)
        return setUpdatingMeta({ loading: false, error: message })


    }
    const delete_image = async (id: string, image: string, tag: string): Promise<any> => {
        setUpdatingMeta({ loading: true, error: null })

        const { state, message, items }: Response = await ProductRepo.delete_image(id, tag, image)
        setUpdatingMeta({ loading: false, error: null })
        if (state === State.SUCCESS) {
            setCurrentProduct(items)
            return items
        }
        toast.error(message)
        return setUpdatingMeta({ loading: false, error: message })

    }



    const search_products = async (query: string): Promise<ProductResponse[]> => {
        setSearchMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        const { items, message, state }: Response = await ProductRepo.search_products(query)
        if (state === State.SUCCESS) {
            return items
        }
        setSearchMeta((prevState) => { return { ...prevState, loading: false, error: message } })
        return []
    }

    const update_meta = async (data: any) => {
        setPagination(prevState => { return { ...prevState, currentPage: 1 } })
        setProductsMeta(prevState => { return { ...prevState, ...data } })
    }

    const update_pagination = async (data: Pagination) => setPagination(data)


    const logout = () => localStorage.removeItem('uid')


    useEffect(() => {
        update_pagination(initialPagination)
    }, [])
    const ctx = {
        create_product,
        fetch_products,
        fetch_product,
        update_partial_product,
        delete_product,
        productsMeta,
        pagination,
        products,
        currentProduct,
        upload_image,
        delete_image,
        updatingMeta,
        onLogout: logout,
        update_pagination,
        search_products,
        searchMeta,
        update_meta
    }


    return <ProductsContext.Provider value={ctx}>
        {props.children}
    </ProductsContext.Provider>
}


export default ProductsContext