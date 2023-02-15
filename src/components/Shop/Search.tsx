import React, { useEffect, useRef, useState, useContext } from 'react'
import Product from '../../modals/ProductResponse'
import UserContext from '../../store/User/user_context'
import { SearchIcon } from '@heroicons/react/solid'
import { useDetectOutsideClick } from "../../hooks/use-detect-outside-click";
import useWindowsResize from "../../hooks/use-windows-resize";

import SearchList from './SearchList'


const Search: React.FC = () => {


    const inputRef: any = useRef()

    const [inputVal, setInputVal] = useState<string>('')
    const [searchList, setSearchList] = useState<Product[]>([])
    const { search_products } = useContext(UserContext)
    const width: number = useWindowsResize()
    const dropdownRef = useRef(null);

    const [toggleSearchMobil, setToggleSearchMobile] = useState<boolean>(false)

    const [isSearchListVisible, setIsSearchListVisible]: any = useDetectOutsideClick(dropdownRef, false);

    const searchHandler = () => {
        setInputVal(inputRef?.current?.value)
        if (inputRef?.current?.value.length > 0) {
            setIsSearchListVisible(true)
        } else {
            setIsSearchListVisible(false)
            setSearchList([])
        }
    }

    const setSearch = async (query: string) => {
        const items = await search_products!(query)
        setSearchList(items!)
    }
    useEffect(() => {

        const timer = setTimeout(() => {
            setSearch(inputVal)
        }, 500)

        return () => clearTimeout(timer)
    }, [inputVal, width])
    return (
        <>
            {width < 800 && <SearchIcon className="h-6 w-6 cursor-pointer text-gray-400" aria-hidden="true" onClick={() => setToggleSearchMobile(!toggleSearchMobil)} />}

            <div className={`${width < 800 && 'absolute top-16 left-0 w-full transform duration-500'} ${width < 800 && !toggleSearchMobil ? '-translate-y-80 opacity-0' : 'opacity-100'} flex-1 flex items-center justify-center sm:px-2 lg:ml-6 lg:justify-end z-10`}>
                <div className="max-w-lg w-full">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>

                    <div className="relative">

                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>

                        <input
                            id="search"
                            name="search"
                            className="h-16 sm:h-auto text-xl sm:text-lg block w-full pl-10 pr-3 py-2 border border-gray-300 sm:rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            ref={inputRef}
                            onChange={searchHandler}

                        />

                        <div ref={dropdownRef}>
                            {isSearchListVisible && <SearchList products={searchList} />}
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Search