import { useContext } from 'react'
import AdminCtx from '../../../store/Admin/admin-context';
import { Link } from 'react-router-dom'

import CategoryInterface from '../../../modals/Category';
const CategoryItem: React.FC<{ category: CategoryInterface }> = (props) => {
    const adminCtx = useContext(AdminCtx)
    const { category } = props
    return (
        <>
            <li key={category._id}>
                <Link to={`/admin/category/${category._id}`} className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                            <div className="flex-shrink-0">
                                <img className="h-12 w-12 rounded-full object-cover" src={import.meta.env.REACT_APP_REST_API_URL + category.image} alt="" />
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                <div>
                                    <p className="text-sm text-left font-medium text-indigo-600 truncate">{category.name}</p>

                                </div>

                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </Link>
            </li>
        </>
    )
}

export default CategoryItem