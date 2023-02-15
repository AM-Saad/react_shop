import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useHttp from '@/hooks/use-http'
import Category from '@/modals/Category'
import FetchError from '@/components/Common/FetchError'
import Loading from '@/components/Shop/Category/Loading'
import HookResponse from '@/modals/HookResponse'
import CategoryItem from '@/components/Shop/Category/CategoryItem'
const Categories: React.FC = () => {
    const { sendRequest: fetch_category, isLoading, error } = useHttp()
    const [categories, setCategories] = useState<Category[]>([])
    const update_category = (data: HookResponse<Category[]>) => {
        setCategories(data.items)
    }
    const fetchCategory = () => {
        fetch_category({ url: `${import.meta.env.REACT_APP_REST_API_URL}/categories` }, update_category)
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div data-testid="categorytest" className=" mx-auto py-8 lg:max-w-none">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Collections</h2>

                    {!isLoading && error && <FetchError reload={fetchCategory} error={error} />}

                    <div >
                        {isLoading && <Loading />}
                        <ul className=" lg:space-y-0 grid sm:grid-cols-3 gap-6">
                            {!isLoading && !error &&
                                categories.map((ctg) => (<CategoryItem key={ctg._id} category={ctg} />))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories