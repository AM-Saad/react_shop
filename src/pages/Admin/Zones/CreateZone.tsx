import React, { useContext, useReducer, useEffect, useState } from 'react'

import ZoneContext from '../../../store/Admin/zones-context'


enum ActionKind {
    USER_INPUT = 'USER_INPUT',
    INPUT_BLUR = 'INPUT_BLUR',
}

type Action = {
    type: ActionKind,
    value: string
}

interface InputState {
    value: string;
    isValid: boolean;
}

const inputReducer = (state: InputState, action: Action) => {
    if (action.type === ActionKind.USER_INPUT) {
        return { value: action.value, isValid: action.value.length > 0 }
    }
    if (action.type === ActionKind.INPUT_BLUR) {
        return { value: state.value, isValid: state.value.length > 0 }

    }
    return state
}


const CreateZone: React.FC = () => {
    const zonesCtx = useContext(ZoneContext)

    const [nameState, dispatchNameState] = useReducer(inputReducer, { value: '', isValid: false })
    const [priceState, dispatchPriceState] = useReducer(inputReducer, { value: '', isValid: false })
    const [zoneNoState, dispatchZoneNoState] = useReducer(inputReducer, { value: '', isValid: false })
    const [governorateState, dispatchGovernorateState] = useReducer(inputReducer, { value: '', isValid: false })
    const [notesState, dispatchNoteState] = useReducer(inputReducer, { value: '', isValid: false })
    const [formIsValid, setFormIsValid] = useState<boolean>(false);


    const nameChangeHandler = (e: any) => {
        dispatchNameState({ type: ActionKind.USER_INPUT, value: e.target.value })
    }
    const checkNameValidity = (e: any) => {
        dispatchNameState({ type: ActionKind.INPUT_BLUR, value: '' })

    }
    const priceChangeHandler = (e: any) => {
        dispatchPriceState({ type: ActionKind.USER_INPUT, value: e.target.value })
    }
    const checkPriceValidity = (e: any) => {
        dispatchPriceState({ type: ActionKind.INPUT_BLUR, value: '' })
    }
    const zoneNoChangeHandler = (e: any) => {
        dispatchZoneNoState({ type: ActionKind.USER_INPUT, value: e.target.value })
    }
    const checkzoneNoValidity = (e: any) => {
        dispatchZoneNoState({ type: ActionKind.INPUT_BLUR, value: '' })
    }
    const governorateChangeHandler = (e: any) => {
        dispatchGovernorateState({ type: ActionKind.USER_INPUT, value: e.target.value })
    }
    const checkGovernorateValidity = (e: any) => {
        dispatchGovernorateState({ type: ActionKind.INPUT_BLUR, value: '' })
    }

    const noteChangeHandler = (e: any) => {
        dispatchNoteState({ type: ActionKind.USER_INPUT, value: e.target.value })
    }
    const checkNoteValidity = (e: any) => {
        dispatchNoteState({ type: ActionKind.INPUT_BLUR, value: '' })
    }


    const saveNewZone = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = new FormData()
        form.append('name', nameState.value)
        form.append('shipping', priceState.value)
        form.append('governorate', governorateState.value)
        form.append('notes', notesState.value)
        form.append('id', zoneNoState.value)
        zonesCtx.create_zone(form)

    }
    const { isValid: nameValid } = nameState
    const { isValid: priceValid } = priceState
    const { isValid: zoneNoValid } = zoneNoState
    const { isValid: governorateValid } = governorateState


    useEffect(() => {
        setFormIsValid(nameValid && priceValid && zoneNoValid && governorateValid)

    }, [nameValid, priceValid, zoneNoState, governorateValid])
    return (
        <section className='mt-10 p-4 sm:p-6 '>
            <h1 className='text-2xl font-bold mb-4'>New Zone</h1>

            <form action="" onSubmit={saveNewZone}>
                <div>

                    <div className='p-4 mb-3 text-left'>
                        <label htmlFor="name" >Name</label>
                        <input className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full' onChange={nameChangeHandler} onBlur={checkNameValidity} type="text" name="name" placeholder='(eg. new cairo)' />
                    </div>
                    <div className='p-4 mb-3 text-left'>
                        <label htmlFor="price" >Zone No</label>
                        <input className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full' onChange={zoneNoChangeHandler} onBlur={checkzoneNoValidity} type="number" name="price" min="0" placeholder='(eg .1000)' />
                    </div>
                    <div className='p-4 mb-3 text-left'>
                        <label htmlFor="price" >Shipping Price</label>
                        <input className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full' onChange={priceChangeHandler} onBlur={checkPriceValidity} type="number" name="price" min="0" placeholder='(eg. 1.99)' />
                    </div>

                    <div className='p-4 mb-3 text-left'>
                        <label htmlFor="governorate" >Governorate</label>
                        <select defaultValue={'القاهرة'} onChange={governorateChangeHandler} onBlur={checkGovernorateValidity} name="" id="governorate" className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full'>

                            <option >الغربية</option>
                            <option value="الإسكندرية">الإسكندرية</option>
                            <option value="الإسماعيلية">الإسماعيلية</option>
                            <option value="كفر الشيخ">كفر الشيخ</option>
                            <option value="أسوان">أسوان</option>
                            <option value="أسيوط">أسيوط</option>
                            <option value="الأقصر">الأقصر</option>
                            <option value="الوادي الجديد">الوادي الجديد</option>
                            <option value="شمال سيناء">شمال سيناء</option>
                            <option value="البحيرة">البحيرة</option>
                            <option value="بني سويف">بني سويف</option>
                            <option value="بورسعيد">بورسعيد</option>
                            <option value="البحر الأحمر">البحر الأحمر</option>
                            <option value="الجيزة">الجيزة</option>
                            <option value="الدقهلية">الدقهلية</option>
                            <option value="جنوب سيناء">جنوب سيناء</option>
                            <option value="دمياط">دمياط</option>
                            <option value="سوهاج">سوهاج</option>
                            <option value="السويس">السويس</option>
                            <option value="الشرقية">الشرقية</option>
                            <option value="الغربية">الغربية</option>
                            <option value="الفيوم">الفيوم</option>
                            <option value="القاهرة">القاهرة</option>
                            <option value="القليوبية">القليوبية</option>
                            <option value="قنا">قنا</option>
                            <option value="مطروح">مطروح</option>
                            <option value="المنوفية">المنوفية</option>
                            <option value="المنيا">المنيا</option>
                        </select>
                    </div>
                    <div className='p-4 mb-3 text-left'>
                        <label htmlFor="notes" >Notes:</label>
                        <textarea className='block border-1 border-b-2 border-gray my-2 outline-white py-2 w-full' onChange={noteChangeHandler} onBlur={checkNoteValidity} name="notes" placeholder='Describe you product'></textarea>
                    </div>




                </div>

                {formIsValid && <button type="submit" className='w-36 p-3 bg-green-400 rounded hover:opacity-50'>Add</button>}
                {!formIsValid && <button type="button" className='w-36 p-3 bg-green-400 rounded opacity-50 '>Add</button>}
            </form>
        </section>

    )
}

export default CreateZone