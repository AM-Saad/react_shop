import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import AdminContext from '../../../store/Admin/admin-context'
import productsContext from '../../../store/Admin/products-context';
import MultiSelect from '../../UI/MultiSelect';
import MultiRangeSlider from '../../UI/MultiRangeSlider';
import { RefreshIcon } from '@heroicons/react/solid'

interface Multiselect {
    val: string,
    label: string
}
const Filters: React.FC = () => {
    const adminCtx = useContext(AdminContext)
    const prodductCtx = useContext(productsContext)

    const { categories, fetch_categories } = adminCtx
    const { update_meta, productsMeta } = prodductCtx
    const [refresh, doRefresh] = useState(0);


    const changeCategory = (value: Multiselect[]) => {
        if (value !== null) update_meta({ ...productsMeta, filters: { ...productsMeta.filters, category: value.map(i => i.label) } })
    }
    const changeFeatured = (value: Multiselect[]) => {
        update_meta({ ...productsMeta, filters: { ...productsMeta.filters, featured: value[0] ? value[0].val : null } })
    }
    const changePopular = (value: Multiselect[]) => {
        update_meta({ ...productsMeta, filters: { ...productsMeta.filters, popular: value[0] ? value[0].val : null } })
    }
    const changePrice = (min: number, max: number) => {
        update_meta({ ...productsMeta, filters: { ...productsMeta.filters, min: min.toString(), max: max.toString() } })
    }
    const changeQuantity = (min: number, max: number) => {
        update_meta({ ...productsMeta, filters: { ...productsMeta.filters, minQty: min.toString(), maxQty: max.toString() } })
    }

    const resetFilters = () => {
        update_meta({ ...productsMeta, filters: {} })
        doRefresh((prev) => prev + 1)

    }

    useEffect(() => {
        fetch_categories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>

            <div className='flex flex-wrap'>
                <div className='p-2 mb-2 text-left'>
                    <label htmlFor="desc" className='text-xs font-bold text-gray-700'>Category</label>
                    {categories.length > 0 && <MultiSelect
                        options={categories.map((i) => ({ val: i._id, label: i.name }))}
                        trackBy="val"
                        label='label'
                        closeOnSelect={false}
                        multiple={true}
                        input={changeCategory}
                        placeholder="Choose categories.."
                        id='category'
                        disabled={false}
                        preSelected={productsMeta.filters.category?.map((i) => ({ val: i, label: i })) || []}
                        refresh={refresh}

                    />}
                </div>
                <div className='p-2 mb-2 text-left'>
                    <label htmlFor="featured" className='text-xs font-bold text-gray-700'>Featured</label>
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
                            productsMeta.filters.featured ?
                                [{ val: productsMeta.filters.featured === 'true', label: productsMeta.filters.featured !== null ? productsMeta.filters.featured === 'true' ? 'True' : 'False' : null }]
                                : []}
                        refresh={refresh}


                    />
                </div>
                <div className='p-2 mb-2 text-left'>
                    <label htmlFor="featured" className='text-xs font-bold text-gray-700'>Popular</label>
                    <MultiSelect
                        options={[{ val: true, label: 'True' }, { val: false, label: 'False' }]}
                        trackBy="val"
                        label="label"
                        closeOnSelect={true}
                        multiple={false}
                        input={changePopular}
                        placeholder="Is Popular.."
                        id='popular'
                        disabled={false}
                        preSelected={
                            productsMeta.filters.popular ?
                                [{ val: productsMeta.filters.popular === 'true', label: productsMeta.filters.popular !== null ? productsMeta.filters.popular === 'true' ? 'True' : 'False' : null }]
                                : []}
                        refresh={refresh}


                    />
                </div>
                <div className='p-2 mb-2 text-left'>
                    <label htmlFor="price" className='text-xs font-bold text-gray-700'>Price Range</label>
                    <MultiRangeSlider
                        min={0}
                        max={3000}
                        onChange={({ min, max }) => changePrice(min, max)}
                        refresh={refresh}

                    />
                </div>
                <div className='p-2 mb-2 text-left'>
                    <label htmlFor="price" className='text-xs font-bold text-gray-700'>Quantity</label>
                    <MultiRangeSlider
                        min={0}
                        max={10000}
                        onChange={({ min, max }) => changeQuantity(min, max)}
                        refresh={refresh}

                    />
                </div>
            </div>
            <button className='flex items-center gap-2 ml-auto mt-3 mb-3 mr-3' onClick={resetFilters}>Reset Filters<RefreshIcon className='main-text-color' height="20" width="20" /></button>

        </>
    )
}

export default Filters