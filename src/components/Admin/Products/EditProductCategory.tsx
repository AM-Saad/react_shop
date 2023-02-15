import React, { useContext, useState, useEffect } from 'react'
import EditIcon from '../../UI/EditIcon'
import AdminContext from '../../../store/Admin/admin-context'
import CategoryInterface from '../../../modals/Category'



const EditProductCategory: React.FC<{ defaultVal: { name: string, subCategory: string | null }, loading: boolean; onSave: (value: any) => void }> = ((props, ref) => {

    const adminCtx = useContext(AdminContext)
    const { categories } = adminCtx
    const { loading, onSave, defaultVal } = props

    const [isEditing, setIsEditing] = useState<boolean>(false)



    const [initialCategory, setInitialCategory] = useState<{ name: string | null, subCategory: string | null }>({ name: null, subCategory: null });

    const [subCategories, setSubCategories] = useState<string[] | undefined | null>([]);


    // By Default the Loading is false 
    // we need to track when the Loading became false Only after being true
    const [Finished, setFinished] = useState(0)

    const selectCategoryHandler = (event: any) => {
        const category = categories.find(category => category.name.toLowerCase() === event.target.value.toLowerCase())
        setInitialCategory({ name: event.target.value.toLowerCase(), subCategory: null })
        setSubCategories(category?.subCategory)
    }

    const selectSubCategoryHandler = (event: any) => {
        const { value } = event.target; // <-- moved outside asynchronous context
        setInitialCategory((prevState) => {
            return Object.assign({}, initialCategory, { subCategory: value })
        })
    }


    const cancelHandler = () => {
        setSubCategories([])
        setInitialCategory({ name: defaultVal.name, subCategory: defaultVal.subCategory })
        setIsEditing(false)

    }

    const submitHandler = () => {
        onSave(initialCategory)
    }

    const getSubCategory = (categories: CategoryInterface[], name: string) => {
        const category = categories.find(category => category.name.toLowerCase() === name)
        return category?.subCategory
    }

    const checkKeyboardEvent = (e: KeyboardEvent) => {
        if (e.key === "Escape") return cancelHandler()

    }



    useEffect(() => {

        document.addEventListener('keydown', checkKeyboardEvent)

        if (loading) setFinished(1)
        if (!loading && Finished === 1) setIsEditing(false)

        if (categories.length > 0) {
            const subCategory = getSubCategory(categories, defaultVal.name)
            setSubCategories(subCategory)
            setInitialCategory({ name: defaultVal.name, subCategory: defaultVal.subCategory })
        }
        return () => {
            document.removeEventListener('keydown', checkKeyboardEvent)

            setFinished(0)
        }
    }, [categories, props.loading, props.defaultVal, isEditing])
    return (
        <div>

            <div className="text-left border-b-1-g mb-6 pb-2 border-b-2">
                <div className="flex items-center mb-2 mt-3">
                    <span className="text-xs font-medium text-gray-600 mb-2 mr-2">Category</span>

                    <EditIcon isEdit={isEditing} startEdit={() => { setIsEditing(true) }} />
                </div>

                {!isEditing && <p className="mr-5 font-medium text-xs">{initialCategory.name}</p>}
                {isEditing && <div >
                    <div className='p-4 mb-3 text-left'>
                        <label htmlFor="desc" className='text-xs font-medium'>Category</label>
                        <select className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full text-xs font-medium' onChange={selectCategoryHandler}
                            name="category" id="category">
                            <option value='Default'>Default</option>

                            {categories.map((category) => <option key={category._id} selected={category.name === initialCategory.name} value={category.name}>{category.name}</option>)}
                        </select>
                    </div>
                    {subCategories && subCategories.length > 0 && <div className='p-4 mb-3 text-left'>
                        <label htmlFor="desc" className='text-xs font-medium'>Sub Category</label>
                        <select
                            className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full text-xs font-medium' onChange={selectSubCategoryHandler} name="" id="">
                            <option >Choose Sub Category</option>

                            {subCategories.map((category) => <option key={category} selected={category === initialCategory.subCategory} value={category}>{category}</option>)}
                        </select>
                    </div>}
                    <div className="flex justify-end gap-2">
                        <button type="button" className=" py-2 px-4 text-sm bg-gray-400 rounded hover:opacity-70 text-white" onClick={cancelHandler}>Cancel</button>
                        <button type="button" className=" py-2 px-4 text-sm bg-green-400 rounded hover:opacity-70 text-white" onClick={submitHandler}>{props.loading ? 'Update...' : 'Update'}</button>
                    </div>
                </div>}
            </div>
        </div>
    )
})

export default EditProductCategory