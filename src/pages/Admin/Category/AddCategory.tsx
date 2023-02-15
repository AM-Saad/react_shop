import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import CategoryForm from '../../../components/Admin/Forms/CategoryForm'
import AdminContext from '../../../store/Admin/admin-context'
// import { NotificationModalContext } from '../../../store/Notification/notification-context'

import Category from '../../../modals/Category'
const AddProduct: React.FC = () => {
    const adminCtx = useContext(AdminContext)

    const history = useHistory()


    const saveNewCategory = async (category: Category) => {
        const form = new FormData()
        form.append('name', category.name)
        form.append('attributes', JSON.stringify(category.attributes))
        form.append('subCategories', JSON.stringify(category.subCategory))
        form.append('image', category.image)
        adminCtx.create_category(form)

    }
    return (
        <section className='mt-10 p-4 sm:p-6 '>

            <h1 className='text-2xl font-bold mb-4'>New Category</h1>

            <CategoryForm onNewCategory={saveNewCategory} />
        </section>

    )
}

export default AddProduct