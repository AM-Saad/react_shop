import React, { useEffect } from 'react'

import classes from './Modal.module.css'

interface Props {
    open: boolean,
    close: () => void,
    children: React.ReactNode,
    styles: string
}
const Modal: React.FC<Props> = ({ open, close, children, styles }) => {

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === "Escape") return close()
        })
        return () => document.removeEventListener('keydown', close)
    })
    return (
        <div onClick={close} className={`bg-black bg-opacity-40 p-3 sm:p-10 pt-2 ${open ? classes["modal--open"] : classes["modal--close"]}`}>
            <div onClick={(e) => e.stopPropagation()} className={`shadow-lg rounded-md p-1 sm:p-3 bg-white ${styles}`}>
                <span className="bg-white border cursor-pointer flex h-8 hover:bg-gray-100 items-center justify-around ml-2 my-1 rounded-full sticky top-0 w-8" onClick={close}>X</span>
                <span className="modalText">{children}</span>
            </div>
        </div>
    )
}

export default Modal