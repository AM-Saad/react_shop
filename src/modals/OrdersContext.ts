
import Meta from './Meta';
import Order, { OrdersMeta } from './Order';
import PaginationType from './Pagination';

export interface OrdersContext {
    orders: Order[],
    ordersMeta: OrdersMeta,
    currentOrder: Order | null,
    pagination: PaginationType,

    fetch_orders: () => void,
    fetch_order: (id: string) => void,
    delete_order: (id: string) => void,
    change_order_status: (status: number, reason?:string) => void,
    cancel_order: (reason: string) => void,
    update_meta:(data: any) => void
    update_pagination:(data: any) => void
    updatingMeta: Meta
}

export default OrdersContext