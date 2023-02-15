import React, { useEffect, useReducer, useState } from 'react'

import UploadImage from '../../UI/UploadImageInput'
import BadgeWithDelete from '../../UI/BadgeWithDelete'
import Category from '../../../modals/Category'
import ToggleBtn from '../../UI/ToggleBtn'
import AttributesContainer from '../Products/AttributesContainer'
import Attribute from '../../../modals/Attribute'

enum ActionKind {
    USER_INPUT = 'USER_INPUT',
    INPUT_BLUR = 'INPUT_BLUR',
    ADD_SUB_CATEGORY = 'ADD_SUB_CATEGORY',
}

type Action = {
    type: ActionKind,
    value: string
}

interface InputState {
    value: string;
    isValid: boolean;
}

const nameReducer = (state: InputState, action: Action) => {
    if (action.type === ActionKind.USER_INPUT) {
        return { value: action.value, isValid: action.value.length > 0 }
    }
    if (action.type === ActionKind.INPUT_BLUR) {
        return { value: state.value, isValid: state.value.length > 0 }

    }
    return state
}

const CategoryForm: React.FC<{ onNewCategory: (newCategory: Category) => void }> = (props) => {

    const [nameState, dispatchNameState] = useReducer(nameReducer, { value: '', isValid: false })
    const [subCategories, setSubCategories] = useState<string[]>([])
    const [subCategoryInput, setSubCategoryInput] = useState<string>('')
    const [featured, setFeatured] = useState<boolean>(true);
    const [active, setActive] = useState<boolean>(true);
    const [imageFile, setImageFile] = useState<any[]>([])
    const [imageWarning, setImageWarning] = useState<string | null>(null)
    const [formIsValid, setFormIsValid] = useState(false);

    const childFunc = React.useRef<any>(null)

    const nameChangeHandler = (e: any) => {
        dispatchNameState({ type: ActionKind.USER_INPUT, value: e.target.value })
    }
    const checkNameValidity = (e: any) => {
        dispatchNameState({ type: ActionKind.INPUT_BLUR, value: '' })
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            if (!subCategories.includes(subCategoryInput) && subCategoryInput.length !== 0) {
                setSubCategoryInput('')
                setSubCategories((prevState) => {
                    return prevState.concat(subCategoryInput)
                })
            }
        }
    }
    const deleteSubCategoryHandler = (item: string) => {
        setSubCategories((prevState) => {
            return prevState.filter(i => i !== item)
        })
    }
    const imageSelectHandler = (files: any[]) => {

        if ((imageFile.length + files.length) <= 5) {
            let allFiles = [...files]
            const returnedFiles: any[] = []
            for (const file of allFiles) {
                const uid = Math.random()
                returnedFiles.push({ image: file, id: uid })
            }

            setImageFile((prevState: any[]) => {
                return prevState.concat(returnedFiles)
            })
            return setImageWarning(null)

        }

        setImageWarning('Maximum images is (5)')

    }



    const submitHandler = (event: React.FormEvent) => {
        // This submiting on enter storke
        event.preventDefault();
        const newitem = {
            name: nameState.value,
            image: imageFile[0] ? imageFile[0].image : '',
            attributes: [],
            subCategory: subCategories,
            active:active,
            featured:featured
        }
        props.onNewCategory(newitem);
    };

    const { isValid: nameValid } = nameState

    useEffect(() => {
        setFormIsValid(nameValid === true)

    }, [nameValid, imageFile])
    return (
        <>
            <form>
                <div>
                    {/* <UploadImage childFunc={childFunc} onSelectImage={imageSelectHandler} /> */}
                    {imageWarning && <p className='text-yellow-600'>{imageWarning}</p>}

                </div>
                <div className="flex items-center justify-between p-4 mb-3 text-left border-1 border-b-2 border-gray">

                    <div className=''>
                        <label htmlFor="desc" className='block mb-2'>Featured</label>
                        <ToggleBtn value={featured} onChange={setFeatured}></ToggleBtn>
                    </div>
                    <div className=''>
                        <label htmlFor="desc" className='block mb-2'>Active</label>
                        <ToggleBtn value={active} onChange={setActive}></ToggleBtn>
                    </div>
                </div>
                <div className='p-4 mb-3 text-left'>
                    <label htmlFor="name" >Name</label>
                    <input id="name" className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full' onChange={nameChangeHandler} onBlur={checkNameValidity} type="text" name="name" placeholder='Mens..' />
                </div>

                <div className='p-4 mb-3 text-left'>
                    <label htmlFor="name" >Sub Categories</label>
                    <input value={subCategoryInput} id="name" className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full' onChange={(e) => setSubCategoryInput(e.target.value)} onKeyDown={handleKeyDown} type="text" name="subCategory" placeholder='T-Shirts ...' />
                    {subCategories.map(subCategory => <BadgeWithDelete id={subCategory} label={subCategory} onDelete={deleteSubCategoryHandler} />)}
                </div>


                {formIsValid && <button onClick={submitHandler} type="button" className='w-36 p-3 bg-green-400 rounded hover:opacity-50'>Add</button>}
                {!formIsValid && <button type="button" className='w-36 p-3 bg-green-400 rounded opacity-50 '>Add</button>}

            </form>
        </>
    )
}

export default CategoryForm