import React from 'react'

const Badge: React.FC<{ label: string | undefined, className: string }> = ({ label, className }) => {
    return (
        <>
            <span className={`inline-flex rounded-full items-center py-0.5 px-2 text-sm font-medium ${className}`}>
                {label || 'Badge'}
            </span>
        </>
    )
}

export default Badge