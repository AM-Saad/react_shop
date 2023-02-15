import React from 'react'
import Fallback from '../../components/Common/Fallback'
import LoadingItems from './LoadingItems'

interface Props {
    loading: boolean
    error: string | null
    items:any[]
    label:string
    createNew?:boolean
}
const RequestStatus:React.FC<Props>= ({loading, error,items, label, createNew = true}) => {
  return (
      <>
        {loading && <LoadingItems/>}
            {!loading && error && <div className='p-3 border-2 border-red-200 my-4'><p className='text-red-400'>{error}</p></div>}
            {!loading && !error && items.length === 0 &&  <Fallback label={label} redirectLink={`/admin/${label}/new`} createNew={createNew}/>}
      </>
  )
}

export default RequestStatus