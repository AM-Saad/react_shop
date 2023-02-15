import React, { useContext, useEffect } from 'react'
import AdminContext from '../../../store/Admin/admin-context'
import ZonesContext from '../../../store/Admin/zones-context'

import Zone from '../../../modals/Zone'
import EditableInput from '../../UI/EditableInput'


const SingleZone: React.FC<{ zone: Zone }> = ({ zone }) => {

  const adminCtx = useContext(AdminContext)
  const zonesCtx = useContext(ZonesContext)

  const { token } = adminCtx.authMeta
  const { updatingMeta } = zonesCtx
  useEffect(() => { 
    console.log(updatingMeta)
  }, [updatingMeta.loading])
  return (
    <>
      <div className='grid sm:grid-cols-2 py-6 gap-8' >
        <div>
          <EditableInput
            label='Name'
            inputType="text"
            onSave={(value: string | number) => zonesCtx.update_partial_zone([{ name: value }])}
            defaultVal={zone.name}
            loading={updatingMeta.loading}
            validationMessage={'Name is required'}
            required={true}
          />
        </div>
        < div >
          <EditableInput
            label='Shipping Price'
            inputType="text"
            onSave={(value: string | number) => zonesCtx.update_partial_zone([{ shipping: value }])}
            defaultVal={zone.shipping}
            loading={updatingMeta.loading}
            validationMessage={'Shipping Price is required'}
            required={true}
          />
        </div>
        < div >
          <EditableInput
            label='Zone Number'
            inputType="number"
            onSave={(value: string | number) => zonesCtx.update_partial_zone([{ zoneId: value }])}
            defaultVal={zone.zoneId}
            loading={updatingMeta.loading}
            validationMessage={'Zone Number is required'}
            required={true}
          />
        </div>
        < div >
          <EditableInput
            label='Notes'
            inputType="text"
            onSave={(value: string | number) => zonesCtx.update_partial_zone([{ notes: value }])}
            defaultVal={zone.notes}
            loading={updatingMeta.loading}
          />
        </div>

      </div>
    </>
  )
}

export default SingleZone