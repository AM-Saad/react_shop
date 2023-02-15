import React from 'react'
import { RadioGroup } from '@headlessui/react'
import Attribute, { SelectedAttribute } from '../../../modals/Attribute'


interface Props {
    selectedAttributes: SelectedAttribute[];
    productAttributes: Attribute[];
    productPrice: number;
    loading: boolean;
    onChange: (attributes: any, price: number) => void
}


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const ProductAttributes: React.FC<Props> = ({ selectedAttributes = [], productAttributes = [], productPrice, loading, onChange }) => {

    const changeAttr = (attribute: Attribute, val: { _id: string, name: string, price: string, quantity: number }) => {
        const attributes: SelectedAttribute[] = selectedAttributes
        const attrIdx = selectedAttributes.findIndex(i => i._id === attribute._id)
        attributes[attrIdx] = {
            name: attribute.name,
            _id: attribute._id,
            option: val.name,
            price: parseInt(val.price, 10),
        }
        const priceBasedOnChoice = attributes.reduce((acc: any, value: any) => acc + value.price, productPrice)

        onChange(attributes, priceBasedOnChoice)
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {!loading && <div>

                {selectedAttributes && selectedAttributes.length > 0 && productAttributes.map((attribute: Attribute, idx: number) => <div key={attribute.name} className="mt-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm text-gray-900 font-medium">{attribute.name}</h3>
                    </div>

                    <RadioGroup value={selectedAttributes && selectedAttributes[idx]?.name} onChange={(val) => { return }} className="mt-4">
                        <RadioGroup.Label className="sr-only">Choose a {attribute.name}</RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                            {attribute.options.map((item: any) => (
                                <RadioGroup.Option
                                    key={item.name}
                                    value={item}
                                    disabled={item.quantity === 0}
                                    onClick={() => changeAttr(attribute, item)}
                                    className={({ active }) =>
                                        classNames(
                                            item.quantity > 0
                                                ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                            selectedAttributes && selectedAttributes[idx]?.option === item.name ? 'ring-2 ring-indigo-500' : '',
                                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                        )
                                    }
                                >
                                    {({ active, checked }) => (
                                        <>
                                            <RadioGroup.Label as="span">{item.name} </RadioGroup.Label>


                                            {item.quantity > 0 ? (
                                                <span
                                                    className={classNames(
                                                        selectedAttributes && selectedAttributes[idx]?.option === item.name ? 'border' : 'border-2',
                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                        'absolute -inset-px rounded-md pointer-events-none'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                                >
                                                    <svg
                                                        className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                                        viewBox="0 0 100 100"
                                                        preserveAspectRatio="none"
                                                        stroke="currentColor"
                                                    >
                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                    </svg>
                                                </span>
                                            )}
                                        </>
                                    )}
                                </RadioGroup.Option>

                            ))}
                        </div>
                    </RadioGroup>
                </div>)}
            </div>}

        </>
    )
}

export default ProductAttributes