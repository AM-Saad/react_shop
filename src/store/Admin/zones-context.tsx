import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom"

import ZonesContextType from '../../modals/ZonesContext';
import Pagination from '../../modals/Pagination';
import Zone, { ZonesMeta } from '../../modals/Zone';
import Meta from '../../modals/Meta';
import serialize from '../../utils/serialize';
import { ZoneRepository } from '../../repositories/ZoneRepository';
import Response, { State } from '../../modals/Respone';
import { toast } from "react-toastify";
const ZoneRepo = new ZoneRepository()
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
const ZonesContext = React.createContext<ZonesContextType>({
    zones: [],
    zonesMeta: { loading: true, error: null, filters: {} },
    pagination: initialPagination,
    currentZone: null,
    fetch_zones: () => { },
    fetch_zone: (id: string) => { },
    create_zone: (form: any) => { },
    delete_zone: (id: string) => { },
    update_partial_zone: (json_patch: any) => { },
    updatingMeta: { loading: false, error: null },
    update_meta: (data: any) => { },
    update_pagination: (data: Pagination) => { }
})

export const ZonesContextProvider: React.FC<{ children?: React.ReactNode; }> = (props) => {
    let history = useHistory()

    const [currentZone, setCurrentZone] = useState<Zone | null>(null)
    const [zonesMeta, setZonesMeta] = useState<ZonesMeta>({ loading: false, error: null, filters: {} })
    const [zones, setZones] = useState([])
    const [updatingMeta, setUpdatingMeta] = useState<Meta>({ loading: false, error: null })
    const [pagination, setPagination] = useState(initialPagination)


    const fetch_zones = async () => {

        setZonesMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { state, message, items }: Response = await ZoneRepo.fetch_zones(pagination, '')


        setZonesMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            setPagination(items.pagination)
            return setZones(items.zones)
        }
        return setZonesMeta((prevState => { return { ...prevState, error: message } }))


    }
    const fetch_zone = async (id: string) => {
        setZonesMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { state, message, items }: Response = await ZoneRepo.fetch_zone(id)

        setZonesMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            return setCurrentZone(items)
        }
        return setZonesMeta((prevState => { return { ...prevState, error: message } }))

    }
    const create_zone = async (form: any) => {
        setZonesMeta((prevState => { return { ...prevState, loading: true, error: null } }))
        const { state, message, items }: Response = await ZoneRepo.create_zone(form)

        setZonesMeta((prevState => { return { ...prevState, loading: false } }))
        if (state === State.SUCCESS) {
            toast.success(message)

            return history.push(`/admin/zones/${items._id}`)

        }
        toast.error(message)

        return setZonesMeta((prevState => { return { ...prevState, error: message } }))

    }

    const delete_zone = async (id: string) => {
        setZonesMeta((prevState => { return { ...prevState, loading: true, error: null } }))

        const { state, message, items }: Response = await ZoneRepo.delete_zone(id)

        setZonesMeta((prevState => { return { ...prevState, loading: false } }))

        if (state === State.SUCCESS) {

            toast.success(message)
            return history.push('/admin/zones')

        }
        toast.error(message)
        setZonesMeta((prevState => { return { ...prevState, error: message } }))


    }

    const update_partial_zone = async (json_patch: any) => {
        setUpdatingMeta({ loading: true, error: null })
        const { state, message, items }: Response = await ZoneRepo.update_partial_zone(currentZone?._id!, json_patch)

        setUpdatingMeta({ loading: false, error: null })
        if (state === State.SUCCESS) {
            return setCurrentZone(items)
        }
        toast.error(message)

    }


    const update_pagination = async (data: Pagination) => {
        return setPagination(data)
    }
    const update_meta = async (data: any) => {
        setPagination(prevState => { return { ...prevState, currentPage: 1 } })

        setZonesMeta(prevState => { return { ...prevState, ...data } })
    }

    useEffect(() => {

        update_pagination(initialPagination)
    }, [])
    const adminContext = {

        zones,
        currentZone,
        zonesMeta,
        fetch_zones,
        fetch_zone,
        create_zone,
        delete_zone,
        update_partial_zone,
        updatingMeta,
        update_meta,
        update_pagination,
        pagination
    }


    return <ZonesContext.Provider value={adminContext}>
        {props.children}
    </ZonesContext.Provider>
}


export default ZonesContext