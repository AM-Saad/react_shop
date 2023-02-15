import React, { useState, useEffect } from 'react'
import BadgeWithDelete from '../../UI/BadgeWithDelete'
import {
    TrashIcon,
} from '@heroicons/react/outline'

import Attribute, { Option } from '../../../modals/Attribute'

const AttributeLine: React.FC<{ attribute: Attribute, updateAttributes: (attribute: Attribute) => void, onDelete: (id: string | number) => void }> = (props) => {
    const [name, setName] = useState<string>(props.attribute.name);
    const [optionName, setOptionName] = useState<string>('');
    const [optionPrice, setOptionPrice] = useState<string>('');
    const [optionQty, setOptionQty] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);
    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    const addOptionHandler = () => {
        setOptions(prevState => {
            let options: Option[] = prevState.concat({ optNo: (prevState.length + 1).toString(), name: optionName, price: optionPrice, quantity: optionQty })
            props.updateAttributes({ attrNo: props.attribute.attrNo, name: name, options: options })
            return options
        })
        clearInputs()
    }
    const clearInputs = () => {
        setOptionName('')
        setOptionPrice('')
        setOptionQty('')
    }
    const deleteOption = (item: string | number) => {

        setOptions(prevState => {
            const updatedOptions: Option[] = prevState.filter(option => option.optNo !== item)
            props.updateAttributes({ attrNo: props.attribute.attrNo, name: name, options: updatedOptions })
            console.log(updatedOptions)
            return updatedOptions
        })
    }
    useEffect(() => {
        setFormIsValid(optionName.length > 0 && optionPrice.length > 0 && optionQty.length > 0)
        setOptions(props.attribute.options)
    }, [formIsValid, optionName, optionPrice, optionQty, props.attribute])
    return (
        <div key={props.attribute._id}>
            <div className="p-4 my-3 text-left shadow rounded">
                <div className='mb-2'>
                    <div className='flex items-center justify-between'>

                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <TrashIcon onClick={() => props.onDelete(props.attribute.attrNo)} className='cursor-pointer hover:text-red-400 h-5 w-5 text-red-600' />
                    </div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4 sm:text-sm border-gray-300 rounded-md"
                            placeholder="(e.g Colors)"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <div className="mt-1 relative rounded-md shadow-sm">

                            <input
                                type="text"
                                name="option-name"
                                id="option-name"
                                className="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="(e.g. Red, Green, Blue)"
                                onChange={(e) => setOptionName(e.target.value)}
                                value={optionName}

                            />
                        </div>
                    </div>
                    <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                name="option-price"
                                id="option-price"
                                className="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Amount sum with the original (e.g 2$)"
                                onChange={(e) => setOptionPrice(e.target.value)}
                                value={optionPrice}

                            />
                        </div>
                    </div>

                </div>
                <div className='grid grid-flow-col gap-3 mt-1 '>
                    <div>
                        <div className="relative rounded-md shadow-sm">

                            <input
                                type="number"
                                name="option-qty"
                                id="option-qty"
                                className="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Quantity (e.g 4)"
                                onChange={(e) => setOptionQty(e.target.value)}
                                value={optionQty}

                            />
                        </div>
                    </div>
                    {formIsValid && <button
                        onClick={addOptionHandler}
                        type="button"
                        className="text-center items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add
                    </button>}
                    {!formIsValid && <button
                        type="button"
                        className="opacity-50 text-center items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add
                    </button>}
                </div>
                <div className='mt-3'>
                    {options.length > 0 && options.map(item => <BadgeWithDelete key={item._id}    id={item.optNo} label={`${item.name} / ${item.price}$ / ${item.quantity}`} onDelete={(id: string) =>  deleteOption(id) } />)}
                </div>
            </div>
        </div>

    )
}

export default AttributeLine