import React from 'react'
import GeneralInfo from '../../../components/Admin/Settings/GeneralInfo'
import Password from '../../../components/Admin/Settings/Password'

const index = () => {
    return (
        <>

            <div className="p-4 sm:p-6">
                <div className='mb-5 flex items-center justify-between'>
                    <h1 className="font-bold text-2xl text-left">Settings</h1>
                </div>
                <GeneralInfo />
                <Password />
            </div>
        </>
    )
}

export default index