import React, { useEffect, useRef, useState, useContext } from 'react'
import Product from '../../../modals/ProductResponse'
import AdminContext from '../../../store/Admin/admin-context'
import { SearchIcon } from '@heroicons/react/solid'
import { useDetectOutsideClick } from "../../../hooks/use-detect-outside-click";
import useWindowsResize from "../../../hooks/use-windows-resize";
import useHttp from '../../../hooks/use-http'
import HookResponse from '../../../modals/HookResponse'

import SearchList from './SearchList'
import CategoryInterface from '../../../modals/Category';
import Order from '../../../modals/Order';

const Search: React.FC = () => {
    const inputRef: any = useRef()
    const [inputVal, setInputVal] = useState<string>('')

    const [products, setProducts] = useState<Product[]>([])
    const [orders, setOrders] = useState<Order[]>([])
    const [categories, setCategories] = useState<CategoryInterface[]>([])

    const width: number = useWindowsResize()
    const dropdownRef = useRef(null);

    const { sendRequest: search_request, isLoading, error } = useHttp()

    const [toggleSearchMobile, setToggleSearchMobile] = useState<boolean>(false)

    const [isSearchListVisible, setIsSearchListVisible]: any = useState(false);

    const searchHandler = (e:any) => {
        setInputVal(e.target.value)
        if (e.target.value.length > 0) {
            setIsSearchListVisible(true)
        } else {
            setIsSearchListVisible(false)
            resetItems()
        }
    }


    const update_search = (data: any) => {
        setProducts(data.items)
        setCategories(data.categories)
        setOrders(data.orders)
    }
    const resetItems = () => {
        setProducts([])
        setCategories([])
        setOrders([])
    }

    const setSearch = async (query: string) => {
        if (query.length > 0) {
            search_request({ url: `${import.meta.env.REACT_APP_REST_API_URL}/admin/api/search?search=${query}` }, update_search)
        }

    }
    const close = () =>{
        setIsSearchListVisible(false)
    }
    const toggleSearch = () => {
        // if (!toggleSearchMobile) inputRef.current.focus();

        setInputVal('')
        setToggleSearchMobile(!toggleSearchMobile)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(inputVal)
        }, 500)

        document.addEventListener('keydown', (e: KeyboardEvent) => {
         
            if (e.key === "Escape" && isSearchListVisible) {
                resetItems()
                setIsSearchListVisible(false)
                return toggleSearch()
            }
        })
        // if (!isSearchListVisible) {
        //     inputRef.current.value = ''
        //     resetItems()

        // }
        return () => {
            clearTimeout(timer)
            document.removeEventListener('keydown', toggleSearch)
        }
    }, [inputVal, width, toggleSearchMobile, isSearchListVisible])
    return (
        <>
            {width < 800 && <SearchIcon className="h-6 w-6 cursor-pointer text-gray-400" aria-hidden="true" onClick={toggleSearch} />}

            <div className={`${width < 800 && 'absolute top-16 left-0 w-full transform duration-500'} ${width < 800 && !toggleSearchMobile ? '-translate-y-80 opacity-0' : 'opacity-100'} flex-1 flex items-center justify-center sm:px-2 lg:ml-6 lg:justify-end z-10`}>
                <div className="flex-1 flex">
                    <form className="w-full flex md:ml-0" action="#" method="GET">
                        <label htmlFor="search-field" className="sr-only">
                            Search all files
                        </label>
                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                                name="search-field"
                                id="search-field"
                                className="h-16 sm:h-auto text-xl sm:text-lg block w-full pl-10 pr-3 py-2 border sm:border-none border-gray-300 sm:rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 0 sm:text-sm"
                                // className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                                placeholder="Search"
                                type="search"
                                onChange={searchHandler}
                                autoComplete="off"
                                onFocus={() => setIsSearchListVisible(true)}

                            />
                        </div>
                    </form>

                    <div >
                        {isSearchListVisible && <SearchList products={products} categories={categories} orders={orders} loading={isLoading} error={error} onClose={close}/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search