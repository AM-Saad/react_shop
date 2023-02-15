import React from 'react'

type Props = {
    children?: React.ReactNode
    className?: string
    active: boolean
};
const Tooltip: React.FC<Props> = ({ children, className, active }) => {
    return (
        <div className={`absolute bg-white p-4 rounded z-40 shadow-lg ${className} ${active ? 'block' : 'hidden'}`}>
            {children}
        </div>
    )
}

export default Tooltip