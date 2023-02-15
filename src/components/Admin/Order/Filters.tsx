import React, { useRef, useState, useEffect } from 'react'
import { useContext } from 'react'
import ordersContext from '../../../store/Admin/orders-context';
import MultiSelect from '../../UI/MultiSelect';
import MultiRangeSlider from '../../UI/MultiRangeSlider';
import { ORDER_STATUS_LABELS } from '../../../modals/Order';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns'
import { RefreshIcon } from '@heroicons/react/solid'

interface Multiselect {
    value: string,
    label: string
}
const Filters: React.FC = () => {
    const orderCtx = useContext(ordersContext)
    const { update_meta, ordersMeta } = orderCtx

    const [isDatePickerOpened, setIsDatePickerOpened] = useState<boolean>(false)
    const [ranges, setRanges] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }])
    const [refresh, doRefresh] = useState(0);
    const [range, setRange] = useState<string>('Select date range');
    const datePickerRef: any = useRef(null)



    const statuses = ORDER_STATUS_LABELS
    let tranformedStatus = []
    for (const [key, value] of statuses) {
        tranformedStatus.push({ value: key, label: value })
    }

    const changeStatus = (value: Multiselect[]) => {
        console.log(value)
        if (value !== null) {
            update_meta({ ...ordersMeta, filters: { ...ordersMeta.filters, status: value.map(i => i.value) } })
        }

    }

    const changePrice = (min: number, max: number) => {
        update_meta({ ...ordersMeta, filters: { ...ordersMeta.filters, min: min.toString(), max: max.toString() } })
    }
    const changeQuantity = (min: number, max: number) => {
        update_meta({ ...ordersMeta, filters: { ...ordersMeta.filters, minQty: min.toString(), maxQty: max.toString() } })
    }

    const changeDate = (items: any) => {
        setRanges([items.selection]);
        setRange(`${format(items.selection.startDate, 'MM/dd/yyyy') + " To " + format(items.selection.endDate, 'MM/dd/yyyy')}`)
        update_meta({ ...ordersMeta, filters: { ...ordersMeta.filters, from: items.selection.startDate, to: items.selection.endDate } })
    }

    const hideOnClickOutSide = (e: any) => {
        if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
            if (isDatePickerOpened) {
                setIsDatePickerOpened(false)
            }
        }
    }

    const resetFilters = () => {
        update_meta({ ...ordersMeta, filters: {} })
        setRange("Select date range")
        doRefresh((prev) => prev + 1)
    }

    useEffect(() => {
        document.addEventListener('click', hideOnClickOutSide)
        return () => {
            document.removeEventListener('click', hideOnClickOutSide)
        }
    }, [isDatePickerOpened])



    return (
        <>
            <div className='flex flex-wrap'>
                <div className='p-1 mb-2 text-left'>
                    <label htmlFor="status" className='block text-xs mb-1'>Status</label>
                    <MultiSelect
                        options={tranformedStatus}
                        trackBy="value"
                        label="label"
                        closeOnSelect={true}
                        multiple={true}
                        input={changeStatus}
                        placeholder="Status.."
                        id='status'
                        disabled={false}
                        refresh={refresh}
                    />
                </div>

                <div className='p-1 mb-2 text-left relative'>
                    <label htmlFor="status" className='block text-xs mb-1' >Date Range</label>
                    <input
                        className={`block border border-gray-200 p-2 rounded-md w-64 cursor-pointer text-xs ${range === 'Select date range' ? 'text-gray-400' : ''}`}
                        readOnly
                        type="text"
                        onClick={() => setIsDatePickerOpened(true)}
                        value={range} />

                    <div ref={datePickerRef}>
                        {isDatePickerOpened &&
                            <DateRangePicker
                                ranges={ranges}
                                onChange={changeDate}
                                editableDateInputs={false}
                                moveRangeOnFirstSelection={false}
                                direction={"vertical"}
                                showMonthAndYearPickers={true}
                                className='absolute bg-white overflow-hidden rounded-md shadow-md z-10'
                            />}
                    </div>
                </div>

                <div className='p-2 mb-2 text-left'>
                    <label htmlFor="price" className='block text-xs mb-1'>Price Range</label>
                    <MultiRangeSlider
                        min={0}
                        max={3000}
                        onChange={({ min, max }) => changePrice(min, max)}
                        refresh={refresh}
                    />
                </div>

                <div className='p-2 mb-2 text-left'>
                    <label htmlFor="price" className='block text-xs mb-1'>Quantity</label>
                    <MultiRangeSlider
                        min={0}
                        max={10000}
                        onChange={({ min, max }) => changeQuantity(min, max)}
                        refresh={refresh}
                    />
                </div>

            </div>
            <button className='flex items-center gap-2 ml-auto mt-3 mb-3 mr-3' onClick={resetFilters}>Reset Filters<RefreshIcon className='main-text-color' height="20" width="20" /></button>
        </>

    )
}

export default Filters