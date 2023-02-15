import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminContext from '../../../store/Admin/admin-context';
import ZonesContext from '../../../store/Admin/zones-context';
import ZoneItem from '../../../components/Admin/Zone/ZoneItem'
import Pagination from '../../../components/Common/Pagination'
import RequestStatus from '../../../components/Admin/RequestStatus'

const Zones = () => {
    const adminCtx = useContext(AdminContext)
    const zonesCtx = useContext(ZonesContext)
    const { token } = adminCtx.authMeta
    const { zones, fetch_zones, zonesMeta } = zonesCtx
    const { loading, error, pagination } = zonesMeta

    const updatePagination = (page: number) => {
        fetch_zones(token!)
    }
    useEffect(() => {
        if (token) {
            fetch_zones(token)
        }

    }, [token])


    return (

        <div className="p-4 sm:p-6">

            <div className=' mb-5  flex items-center justify-between'>
                <h2 className="font-bold text-2xl text-left">Zones</h2>
                <Link to={`/admin/zones/create`} className=' py-2 px-4 text-sm bg-green-400 rounded hover:opacity-70 text-white'>New Zone</Link>

            </div>

            <RequestStatus loading={loading} error={error} items={zones} label="zones" />

            {!loading && !error && zones.length > 0 && <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {zones.length > 0 && zones.map(zone => <ZoneItem key={zone._id} zone={zone} />)}

                </ul>
            </div>}
            {!loading && !error && pagination && <Pagination pagination={pagination} update={updatePagination} />}

        </div>


    )
}

export default Zones