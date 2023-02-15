import { Link } from "react-router-dom"
import Category from '@/modals/Category'

interface Props {
    category: Category
}
const CategoryItem: React.FC<Props> = ({ category }) => {
    return (
        <li key={category.name} className="relative">
            <Link key={category._id} to={'/category/' + category.name} className="block h-full overflow-hidden rounded-2xl w-full">
                <img
                    src={import.meta.env.REACT_APP_REST_API_URL + category.image}
                    alt={category.name}
                    className="w-full h-full object-center object-cover"
                />
                <div style={{ backdropFilter: "blur(5px)" }} className='w-full absolute bottom-10 left-0 p-4 h-20 bg-black bg-opacity-50'>
                    <h3 className="mt-2 font-black lg:text-2xl text-white capitalize">
                        {category.name}
                    </h3>
                </div>
            </Link>
        </li>
    )
}
export default CategoryItem