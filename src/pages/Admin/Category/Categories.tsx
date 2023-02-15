import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminContext from '../../../store/Admin/admin-context';
import CategoryItem from '../../../components/Admin/Category/CategoryItem'
import Pagination from '../../../components/Common/Pagination'
import RequestStatus from '../../../components/Admin/RequestStatus'
import Filters from '../../../components/Admin/Category/Filters';


const Categories = () => {
    const adminCtx = useContext(AdminContext)
    const { token } = adminCtx.authMeta
    const { categories, fetch_categories, categoryMeta, categoryPagination, update_category_pagination } = adminCtx
    const { loading, error, filters } = categoryMeta
    const { currentPage } = categoryPagination

    const updatePagination = (page: number) => {
        update_category_pagination({ ...categoryPagination, currentPage: page })
    }

    useEffect(() => {
        if (token) {
            fetch_categories(token)
        }
    }, [filters, token, currentPage])

    return (

        <div className="p-4 sm:p-6">

            <div className=' mb-5  flex items-center justify-between'>
                <h1 className="font-bold text-2xl text-left">Category</h1>
                <Link to={`/admin/category/create`} className=' py-2 px-4 text-sm bg-green-400 rounded hover:opacity-70 text-white'>New Category</Link>
            </div>
            <Filters />
            <RequestStatus loading={loading} error={error} items={categories} label="category" />

            {!loading && !error && categories.length > 0 && <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {categories.length > 0 && categories.map(category => <CategoryItem category={category} />)}

                </ul>
            </div>}
            {!loading && !error && categoryPagination && <Pagination pagination={categoryPagination} update={updatePagination} />}

        </div>


    )
}

export default Categories