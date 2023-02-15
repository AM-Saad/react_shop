import { SelectedAttribute } from './Attribute'
import PaginationType from './Pagination';

import Meta from './Meta';

export enum OrderStatus {
    Panding = 0,
    Confirmed = 1,
    Shipped = 2,
    Delivered = 3,
    Canceled = 4,
}

export const ORDER_STATUS_LABELS = new Map<OrderStatus, string>([
    [OrderStatus.Panding, "Panding"],
    [OrderStatus.Confirmed, "Confirmed"],
    [OrderStatus.Shipped, "Shipped"],
    [OrderStatus.Delivered, "Delivered"],
    [OrderStatus.Canceled, "Canceled"],
]);

export const getOrderStatusColor = (
    bundleStatus: OrderStatus
) => {
    if (bundleStatus === OrderStatus.Panding) {
        return "gray";
    } else if (bundleStatus === OrderStatus.Confirmed) {
        return "purple";
    } else if (bundleStatus === OrderStatus.Shipped) {
        return "yellow";
    } else if (bundleStatus === OrderStatus.Delivered) {
        return "green";
    } else {
        return "red";
    }
};



export default interface Order {
    createdAt: string
    date: string
    items: OrderItem[]
    leadSource: string
    order_info: OrderInfo
    serialNo: number
    sessionId: string
    status: OrderStatus
    totalPrice: number
    updatedAt: string
    _id: string
    canceled?: { status: boolean, reason: string },

}

export interface OrderInfo {
    billing_details: {
        email: string
        first_name: string
        last_name: string
        phone: string
    }
    shipping_details: {
        apartment: string
        area: { name: string, zoneId: number }
        floor: string
        price: number
        street: string
    }

}

export interface OrderItem {
    attributes: SelectedAttribute[]
    category: string
    id: string
    name: string
    price: number
    quantity: number
    total: number
    _id: string
    image: string

}

export interface OrdersMeta extends Meta{
    pagination?:PaginationType
    filters: {
        name?: string | null;
        id?: string | null;
        min?: string | null;
        max?: string | null;
        minQty?:string | null;
        maxQty?:string | null;
        from?:string | null;
        to?:string | null;
        slug?: string | null;
        status?: string[],
    }

}

