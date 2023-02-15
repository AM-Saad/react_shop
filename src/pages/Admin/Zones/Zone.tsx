import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminContext from '../../../store/Admin/admin-context'
import ZonesContext from '../../../store/Admin/zones-context'
import SingleZone from '../../../components/Admin/Zone/SingleZone'
import FetchError from '../../../components/Common/FetchError'
import Modal from '../../../components/UI/Modal'
import ConfirmDeleteItem from '../../../components/Common/ConfirmDeleteItem'

const Zone = () => {
    const params = useParams()
    const { id }: any = params
    const adminCtx = useContext(AdminContext)
    const zonesCtx = useContext(ZonesContext)
    const { currentZone, zonesMeta, fetch_zone, delete_zone } = zonesCtx
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false)
    const deleteZone = () => {
        if (currentZone) delete_zone(currentZone?._id,)
    }
    useEffect(() => {
        if (id) {
            fetch_zone(id)
        }
        return
    }, [id])



    if (zonesMeta.loading) {
        return <p>Loading...</p>
    }

    if (!zonesMeta.loading && zonesMeta.error) {
        return <FetchError error={zonesMeta.error} reload={() => fetch_zone(id)} />

    }
    return (
        <div className='p-4 sm:p-6' >
            <div className='flex items-center justify-between ' >
                <h1 className='text-2xl font-bold mb-4 text-left my-5' >Your Zone</h1>
                {currentZone && !adminCtx.updatingMeta.loading && <button onClick={() => setOpenConfirmDeleteModal(true)} className=' py-2 px-4 text-sm bg-red-400 rounded hover:opacity-70 text-white' > Delete </button>}
                {adminCtx.updatingMeta.loading && <button className=' py-2 px-4 text-sm bg-red-400 rounded hover:opacity-70 text-white opacity-50' > Delete </button>}
            </div>
            <Modal styles={'w-full sm:w-5/12 max-h-full overflow-scroll '} open={openConfirmDeleteModal} close={() => setOpenConfirmDeleteModal(false)}>
                <ConfirmDeleteItem label='Zone' cancel={() => setOpenConfirmDeleteModal(false)} confirmDelete={deleteZone} />
            </Modal>
            {currentZone && <SingleZone zone={currentZone} />}
        </div>
    )



}

export default Zone