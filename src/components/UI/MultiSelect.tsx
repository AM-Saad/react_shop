import React, { useState, useEffect, useRef } from 'react'
import BadgeWithDelete from './BadgeWithDelete';

function checkName(name: string, str: string) {
    const pattern = str.split("").map((x) => `(?=.*${x})`).join("");
    return name.match(new RegExp(`${pattern}`, "i"));
}


interface Props {
    options: any[];
    multiple: boolean;
    closeOnSelect?: boolean;
    placeholder: string;
    id: string,
    label: string
    trackBy: string
    disabled: boolean
    input: (items: any) => void,
    preSelected?: any[]
    refresh?: any
}


const MultiSelect: React.FC<Props> = ({ options, multiple, closeOnSelect, placeholder, id, label, trackBy, disabled, input, preSelected = [], refresh }) => {
    const [selected, setSelected] = useState<any[]>(preSelected)
    const [filtered, setFiltered] = useState<any[]>(options)
    const [listIsOpen, setListIsOpen] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const itemsMenu: any = useRef(null)
    const searchinput: any = useRef(null)

    const search = (e: any) => {
        const val = e.target.value
        if (val === '' || !val) return setFiltered(options)
        const matchedItems = options.filter((opt) => checkName(opt[label], val));
        setFiltered(matchedItems)
    }
    const selectItem = (val: string) => {

        const exist = selected.find((i: any) => i[trackBy] === val)
        if (exist) {
            const items = selected.filter((opt: any) => opt[trackBy] !== val)
            return setSelected(items)
        }

        const item = options.find(i => i[trackBy] === val)
        if (item) {

            if (multiple) {
                setSelected((prev: any) => { return [...prev, item] });
            } else {
                setSelected([item])
            }

            if (closeOnSelect) setListIsOpen(false)
        }

    }
    const remove = (val: string) => {
        const items = selected.filter((opt: any) => opt[trackBy] !== val)
        setSelected(items)
        setListIsOpen(true)
    }
    const checkIfSelected = (val: string) => selected.findIndex((opt: any) => opt[trackBy] === val) !== -1
    const closeOpenMenus = (e: any) => {
        if (itemsMenu.current && listIsOpen && !itemsMenu.current.contains(e.target)) {
            setListIsOpen(false)
        }
    }
    useEffect(() => {
        if (!isFirstRender) {

            input(selected)
        }
        setIsFirstRender(false)

        document.addEventListener('mousedown', closeOpenMenus)
        return () => document.removeEventListener('mousedown', closeOpenMenus)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    useEffect(() => {
        setSelected([])

    }, [refresh]);
    return (
        <>
            <div onClick={() => setListIsOpen(true)}
                id={id}
                className="multiple-select bg-white border border-gray-200 p-1 rounded-md w-64 max-w-full"
            >
                <div ref={itemsMenu}>

                    <div className={`selected-list flex items-center flex-wrap gap-1 ${(!multiple && selected.length === 1) && 'p-1'}`}>
                        {(selected !== null && selected.length > 0) && selected.map((option: any, idx: number) => {
                            return <>
                                {multiple && <BadgeWithDelete key={idx - 1} id={option[trackBy]} onDelete={remove} label={option[label]} />}
                                {!multiple && <p key={option[trackBy]} className='text-xs'>{option[label]}</p>}
                            </>
                        })}
                    </div>

                    {(listIsOpen || (!listIsOpen && multiple) || (!multiple && selected.length === 0)) &&
                        <input
                            className='multiple-select_input my-1 focus:outline-none w-full pl-1 text-xs'
                            type="text"
                            placeholder={placeholder}
                            ref={searchinput}
                            onChange={search}
                        />}


                    {listIsOpen && <ul className='multiple-select_list'>
                        {filtered.length > 0 && filtered.map((option, idx) =>
                            <li
                                className={`p-2 text-xs my-1 rounded-md cursor-pointer hover:bg-gray-200  ${checkIfSelected(option[trackBy]) ? 'font-medium bg-gray-50' : ''}`}
                                key={option[label] + idx}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    selectItem(option[trackBy])
                                }}
                            >
                                {option[label]}
                            </li>
                        )}
                        {filtered.length === 0 && <p className='text-xs text-gray-600 my-2'>Nothing here</p>}
                    </ul>}
                </div>

            </div>
        </>
    )
}

export default MultiSelect

