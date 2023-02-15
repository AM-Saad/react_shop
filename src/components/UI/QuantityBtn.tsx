import React, { useState, useEffect } from 'react'

const QuantityBtn: React.FC<{ quantity: number, onChange: (quantity: number) => void }> = (props) => {
    // why this is not working
    // const quantity = useState<string>('')

    const [quantity, setQuantity] = useState<number>(props.quantity)

    const increaseVal = () => onChange(quantity + 1)
    const decreaseVal = () => onChange(quantity - 1)

    const onChange = (value: number) => {
        if (value >= 0 && value <= 10) {
            setQuantity(value);
            props.onChange(value)
        }
    };
    useEffect(() => {
        setQuantity(props.quantity);
    }, [props.quantity])

    return (
        <>
            <div className='bg-gray-100 flex items-center p-2 rounded w-2/4'>
                <span className="rounded bg-gray-200 cursor-pointer hover:bg-gray-100 mx-2 p-1" onClick={decreaseVal}>-</span>
                <input className="quantity-input bg-gray-100 p-1 w-10/12 text-center focus:outline-none" type="number" step="1" onChange={(e) => onChange(parseInt(e.target.value))} value={quantity} />
                <span className="rounded bg-gray-200 cursor-pointer hover:bg-gray-100 mx-2 p-1" onClick={increaseVal}>+</span>

            </div>
        </>
    )
}

export default QuantityBtn