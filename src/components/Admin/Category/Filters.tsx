import React, { useState,useContext } from 'react'
import AdminContext from '../../../store/Admin/admin-context'
import MultiSelect from '../../UI/MultiSelect';

import { RefreshIcon } from '@heroicons/react/solid'

interface Multiselect {
    val: string,
    label: string
}
const Filters: React.FC = () => {
    const adminCtx = useContext(AdminContext)

    const { categoryMeta, update_category_meta, } = adminCtx

    const [refresh, doRefresh] = useState(0);


    const changeFeatured = (value: Multiselect[]) => {
        update_category_meta({ ...categoryMeta, filters: { ...categoryMeta.filters, featured: value[0] ? value[0].val : null } })
    }
    const changeActive = (value: Multiselect[]) => {
        update_category_meta({ ...categoryMeta, filters: { ...categoryMeta.filters, active: value[0] ? value[0].val : null } })
    }
 

    const resetFilters = () => {
        update_category_meta({ ...categoryMeta, filters: {} })
        doRefresh((prev) => prev + 1)

    }


    return (
        <>

            <div className='flex flex-wrap gap-5'>

                <div className='p-2 mb-2 text-left w-full md:w-64'>
                    <label htmlFor="featured" className='text-xs font-medium text-gray-700 mb-1 block'>Featured</label>
                    <MultiSelect
                        options={[{ val: true, label: 'True' }, { val: false, label: 'False' }]}
                        trackBy="val"
                        label="label"
                        closeOnSelect={true}
                        multiple={false}
                        input={changeFeatured}
                        placeholder="Is Featured.."
                        id='featured'
                        disabled={false}
                        preSelected={
                            categoryMeta.filters.featured ?
                                [{ val: categoryMeta.filters.featured === 'true', label: categoryMeta.filters.featured !== null ? categoryMeta.filters.featured === 'true' ? 'True' : 'False' : null }]
                                : []}
                        refresh={refresh}


                    />
                </div>
                <div className='p-2 mb-2 text-left w-full md:w-64'>
                    <label htmlFor="featured" className='text-xs font-medium text-gray-700 mb-1 block'>Active</label>
                    <MultiSelect
                        options={[{ val: true, label: 'True' }, { val: false, label: 'False' }]}
                        trackBy="val"
                        label="label"
                        closeOnSelect={true}
                        multiple={false}
                        input={changeActive}
                        placeholder="Is Active.."
                        id='popular'
                        disabled={false}
                        preSelected={
                            categoryMeta.filters.active ?
                                [{ val: categoryMeta.filters.active === 'true', label: categoryMeta.filters.active !== null ? categoryMeta.filters.active === 'true' ? 'True' : 'False' : null }]
                                : []}
                        refresh={refresh}


                    />
                </div>

            </div>
            <button className='flex items-center gap-2 ml-auto mt-3 mb-3 mr-3' onClick={resetFilters}>Reset Filters<RefreshIcon className='main-text-color' height="20" width="20" /></button>

        </>
    )
}

export default Filters