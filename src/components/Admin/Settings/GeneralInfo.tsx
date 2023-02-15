import { useContext, useEffect, useState } from 'react'
import AdminContext from '../../../store/Admin/admin-context';
import EditableInput from '../../UI/EditableInput'

const GeneralInfo = () => {
    const adminCtx = useContext(AdminContext)
    const { update_partial_admin, } = adminCtx
    const { user, loading, error } = adminCtx.authMeta
    return (
        <div>
            <h2 className='font-medium'>General Info </h2>
            <div>
                <EditableInput
                    loading={loading}
                    defaultVal={user?.email!}
                    required={true}
                    onSave={(value) => { update_partial_admin([{ email: value }]) }}
                    inputType={'text'}
                    label={'Email'}
                    error={error ? true : false}
                />
            </div>
            <div>
                <EditableInput
                    loading={loading}
                    defaultVal={user?.name!}
                    required={true}
                    onSave={(value) => { update_partial_admin([{ name: value }]) }}
                    inputType={'text'}
                    label={'Name'}
                    error={error ? true : false}

                />
            </div>

        </div>

    )
}

export default GeneralInfo