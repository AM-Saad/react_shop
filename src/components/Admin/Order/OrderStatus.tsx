import { useRef, useContext, useState, useEffect, useMemo } from 'react'
import Badge from '@/components/UI/Badge'
import Tooltip from '@/components/UI/Tooltip'
import { useDetectOutsideClick } from "@/hooks/use-detect-outside-click";
import { getOrderStatusColor, ORDER_STATUS_LABELS, OrderStatus } from '@/modals/Order';
import OrdersContext from '@/store/Admin/orders-context'

const statuses = Array.from(ORDER_STATUS_LABELS.values());

const OrderStatusButton = () => {
    const dropdownRef = useRef(null);

    const { currentOrder, change_order_status, updatingMeta } = useContext(OrdersContext)
    const [isTooltipActive, setTooltipActive]: any = useDetectOutsideClick(dropdownRef, false);
    const [status, setStatus] = useState<number>(0)
    const [reason, setReason] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [statueColor, setStatueColor] = useState('');

    useEffect(() => {
      setStatueColor(`bg-${getOrderStatusColor(status)}-300`);
    }, [status]);
        
    const changeStatus = (e: any) => {
        const value = +e.target.value
        setStatus(value)
    }
    const update = () => {
        if (status === OrderStatus.Canceled && currentOrder?.status !== OrderStatus.Canceled) {
            if (!reason) {
                return setError('Reason is required')
            }
            return change_order_status(status, reason)
        }
        change_order_status(status)
    }
    useEffect(() => {
        if (currentOrder) {
            setStatus(currentOrder?.status)
        }

    }, [currentOrder])

    useEffect(() => {
        setError(null)
        setReason   (null)
    }, [isTooltipActive])
    return (
        <>
            {currentOrder && <div className='relative' ref={dropdownRef}>

                <div onClick={setTooltipActive}>
                    <Badge label={ORDER_STATUS_LABELS.get(currentOrder?.status!)} className={`${statueColor} cursor-pointer-hover`} />
                </div>

                <Tooltip className='w-56 mt-5' active={isTooltipActive}>
                    <div>

                        <select className='w-full p-1 border rounded ' onChange={changeStatus}>
                            {statuses.map((item, idx) => <option value={idx} selected={item === ORDER_STATUS_LABELS.get(status!)}>{item}</option>)}
                        </select>

                        {status === OrderStatus.Canceled && currentOrder.status !== OrderStatus.Canceled && <div>
                            <div className='mt-4 text-xs'>
                                <label htmlFor="reason" className='mb-1 block'>Reason</label>
                                <textarea
                                    id='reason'
                                    className='w-full p-2 border border-gray-300 rounded'
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder='Enter reason'> </textarea>
                                {error && <p className='text-red-400'>{error}</p>}
                            </div>

                        </div>}

                        <div className='flex mt-2 justify-end'>
                            <button onClick={update} disabled={updatingMeta.loading} className={`py-2 px-3 text-sm bg-green-400 rounded hover:opacity-70 text-white ${updatingMeta.loading ? 'opacity-70' : ''}`}>
                                {updatingMeta.loading ? 'Update...' : 'Update'}
                            </button>
                        </div>

                    </div>
                </Tooltip>


            </div>}
        </>

    )
}   

export default OrderStatusButton