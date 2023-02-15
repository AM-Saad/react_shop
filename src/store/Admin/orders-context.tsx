import React, { useEffect, useState, useContext } from 'react';
// import { NotificationModalContext } from "../Notification/notification-context"
import { useHistory, useLocation } from "react-router-dom"

import OrderContextType from '../../modals/OrdersContext';
import Pagination from '../../modals/Pagination';
import Order, { OrdersMeta } from '../../modals/Order';
import Meta from '../../modals/Meta';
import serialize from '../../utils/serialize';
import { OrderRepository } from '../../repositories/OrderRepository';
import Response, { State } from '../../modals/Respone';
import { toast } from "react-toastify";

const OrderRepo = new OrderRepository()

const initialPagination = {
    itemsPerPage: 10,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    lastPage: 1,
    nextPage: 2,
    prevPage: 0,
    total: 0,
    skip: 0,
}
const OrdersContext = React.createContext<OrderContextType>({

    orders: [],
    ordersMeta: { loading: true, error: null, filters: {} },
    pagination: initialPagination,
    currentOrder: null,

    fetch_orders: () => { },
    fetch_order: (id: string) => { },
    delete_order: (id: string) => { },
    change_order_status: (status: number, reason?: string) => { },
    cancel_order: (reason: string) => { },
    update_meta: (data: any) => { },
    update_pagination: (data: Pagination) => { },
    updatingMeta: { loading: false, error: null }

})

export const OrdersContextProvider: React.FC<{ children?: React.ReactNode; }> = (props) => {
    let history = useHistory()

    const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
    const [orders, setOrders] = useState([])

    const [ordersMeta, setOrdersMeta] = useState<OrdersMeta>({ loading: false, error: null, filters: {} })
    const [pagination, setPagination] = useState(initialPagination)
    const [updatingMeta, setUpdatingMeta] = useState<Meta>({ loading: false, error: null })



    const fetch_orders = async () => {
        setOrdersMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { from, to, min, max, minQty, maxQty, status } = ordersMeta.filters
        const params = new Map<string, string | string[]>();
        if (min) params.set("min", min);
        if (max) params.set("max", max);
        if (minQty) params.set("minQty", minQty);
        if (maxQty) params.set("maxQty", maxQty);
        if (from) params.set("from", from);
        if (to) params.set("to", to);
        if (status && status?.length > 0) {
            params.set("status", status.map((s) => s.toString()));
        }
        const paramsUrl = serialize(params)

        const { state, message, items }: Response = await OrderRepo.fetch_orders(pagination, paramsUrl)

        setOrdersMeta((prevState => { return { ...prevState, loading: false, error: null } }))

        if (state === State.SUCCESS) {
            setPagination(items.pagination)
            return setOrders(items.items)
        }
        return setOrdersMeta((prevState => { return { ...prevState, loading: false, error: message } }))


    }
    const fetch_order = async (id: string) => {
        setOrdersMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { state, message, items }: Response = await OrderRepo.fetch_order(id)

        setOrdersMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            return setCurrentOrder(items)
        }
        setOrdersMeta((prevState => { return { ...prevState, error: message } }))

    }

    const delete_order = async (id: string) => {
        setOrdersMeta((prevState => { return { ...prevState, loading: true, error: null } }))

        const { state, message }: Response = await OrderRepo.delete_order(currentOrder?._id!)


        setOrdersMeta((prevState => { return { ...prevState, loading: false } }))
        toast[state](message)

        if (state === State.SUCCESS) {
            return history.push('/admin/orders')

        }
        setOrdersMeta((prevState => { return { ...prevState, loading: false, error: message } }))


    }


    const change_order_status = async (status: number, reason?: string) => {
        setUpdatingMeta({ loading: true, error: null })
        const { state, message, items }: Response = await OrderRepo.change_order_status(currentOrder?._id!, { status, reason })

        setUpdatingMeta({ loading: false, error: null })
        if (state === State.SUCCESS) {
            return setCurrentOrder(items)
        }
        toast[state](message)

        return setUpdatingMeta({ loading: false, error: message })
    }

    const cancel_order = async (reason: string) => {
        setUpdatingMeta({ loading: true, error: null })
        const { state, message, items }: Response = await OrderRepo.cancel_order(currentOrder?._id!, reason)

        setUpdatingMeta({ loading: false, error: null })
        toast[state](message)
        if (state === State.SUCCESS) {
            return setCurrentOrder(items)
        }

        return setUpdatingMeta({ loading: false, error: message })
    }

    const update_pagination = async (data: Pagination) => {
        return setPagination(data)
    }


    const update_meta = async (data: any) => {
        setPagination(prevState => { return { ...prevState, currentPage: 1 } })
        console.log(data)
        setOrdersMeta(prevState => { return { ...prevState, ...data } })
    }
    useEffect(() => {
        update_pagination(initialPagination)
    }, [])
    const ctx = {
        orders,
        currentOrder,
        ordersMeta,
        fetch_orders,
        fetch_order,
        delete_order,
        change_order_status,
        cancel_order,
        updatingMeta,
        update_pagination,
        update_meta,
        pagination,
        url: 'http://localhost:8000'
    }


    return <OrdersContext.Provider value={ctx}>
        {props.children}
    </OrdersContext.Provider>
}


export default OrdersContext