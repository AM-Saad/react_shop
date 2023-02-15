import React, { useState, useEffect } from 'react'
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'
import AttributeLine from './AttributeLine'
import Attribute, { Option } from '../../../modals/Attribute'
const AttributesContainer: React.FC<{ updateAttributes: (attributes: Attribute[]) => void }> = (props) => {
    const [attributes, setAttributes] = useState<Attribute[]>([])


    const addNewAttributeLine = () => {
        setAttributes((prevState) => {
            return prevState.concat({ attrNo: (attributes.length + 1).toString(), name: '', options: [] })
        })
    }

    const deleteAttributeLine = (id: string | number) => {
        setAttributes((prevState) => {
            return prevState.filter(i => i.attrNo !== id)
        })
    }

    const updateAttributes = (attribute: Attribute) => {
        const attributeIdx = attributes.findIndex(i => i.attrNo === attribute.attrNo)
        attributes[attributeIdx] = attribute

        // spread attributes to new array to get a new reference
        const newAttributes = [...attributes]
        setAttributes(newAttributes)
    }

    useEffect(() => {
        props.updateAttributes(attributes)

    }, [attributes])
    return (
        <div className='p-4 mb-3 text-left'>
            <div className='flex justify-between'>
                <label htmlFor="desc" >Attributes</label>
                <button
                    onClick={addNewAttributeLine}
                    type="button"
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            {attributes.length > 0 && attributes.map((attribute) => <AttributeLine key={attribute._id} attribute={attribute} updateAttributes={(attribute: Attribute) => updateAttributes(attribute)} onDelete={(id: string | number) => deleteAttributeLine(id)} />)}

        </div>
    )
}

export default AttributesContainer