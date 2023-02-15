import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import PaginationType from '../../modals/Pagination'

interface Props {
    pagination: PaginationType,
    update(number: number): void
}


const pages = (pageCount: number, pageRange: number = 3, marginPages: number, currentPage: number) => {
    const items = [];
    if (pageCount <= pageRange) {
        for (let index = 0; index < pageCount; index++) {
            const page: any = {
                index: index,
                content: index + 1,
                selected: index === currentPage - 1,
            };
            items[index] = page;
        }
    } else {
        const halfPageRange = Math.floor(pageRange / 2);
        const setPageItem = (index: number) => {
            const page: any = {
                index: index,
                content: index + 1,
                selected: index === currentPage - 1,
            };
            items[index] = page;
        };
        const setBreakView = (index: number) => {
            const breakView = {
                index: index,
                disabled: true,
                breakView: true,
            };
            items[index] = breakView;
        };
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < marginPages; i++) {
            setPageItem(i);
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (currentPage - halfPageRange > 0) {
            selectedRangeLow = currentPage - 1 - halfPageRange;
        }
        let selectedRangeHigh = selectedRangeLow + pageRange - 1;
        if (selectedRangeHigh >= pageCount) {
            selectedRangeHigh = pageCount - 1;
            selectedRangeLow = selectedRangeHigh - pageRange + 1;
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= pageCount - 1; i++) {
            setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > marginPages) setBreakView(selectedRangeLow - 1);
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < pageCount - marginPages) setBreakView(selectedRangeHigh + 1);
        // 3rd - loop thru high end of margin pages
        for (let i = pageCount - 1; i >= pageCount - marginPages; i--) {
            setPageItem(i);
        }
    }
    return items.filter((i) => i !== undefined);
}
const Pagination: React.FC<Props> = ({ pagination, update }) => {

    const pageCount = (): number => {
        const result = Math.ceil(pagination.total / pagination.itemsPerPage);
        return result < 1 ? 1 : result;
    }
    const itemCount = (): number => {
        return pageCount() === pagination.currentPage
            ? pagination.total - (pageCount() - 1) * pagination.itemsPerPage
            : pagination.itemsPerPage;
    }
    const allpages = pages(pageCount(), 3, 3, pagination.currentPage)
    const handlePageSelected = (selected: number) => {
        if (pagination.currentPage === selected) return;
        update(selected)
    }

    const prevPage = () => {
        if (pagination.currentPage <= 1) return;
        handlePageSelected(pagination.currentPage - 1);
    }
    const nextPage = () => {
        if (pagination.currentPage >= pageCount()) return;
        handlePageSelected(pagination.currentPage + 1);
    }
    return (
        <div className="py-3 flex items-center justify-between border-t border-gray-200 mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
                {pagination.hasPrevPage &&
                    <button
                        disabled={!pagination.hasPrevPage}

                        onClick={prevPage}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Previous
                    </button>}
                <button
                    disabled={!pagination.hasNextPage}
                    onClick={nextPage}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{pagination.skip + 1}</span> to <span className="font-medium">{itemCount() + (pagination.currentPage - 1) * pagination.itemsPerPage}</span> of{' '}
                        <span className="font-medium">{pagination.total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={prevPage}
                            disabled={!pagination.hasPrevPage}
                            className={`${!pagination.hasPrevPage && 'bg-gray-200'} relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {allpages.map(page => (
                            <button
                                onClick={() => handlePageSelected(page.index + 1)}
                                type="button"
                                key={page.index + 1}
                                className={`
                            ${page.selected ?
                                        'main-bg-color border-blue-600 text-white cursor-default' :
                                        'bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 border-gray-300'
                                    }
                                        -ml-px relative inline-flex items-center px-4 py-2 border
                            `}
                            >
                                {page.breakView && <span>...</span>}
                                <span>{page.content}</span>
                            </button>
                        ))}
                        <button
                            onClick={nextPage}
                            disabled={!pagination.hasNextPage}
                            className={`${!pagination.hasNextPage && 'bg-gray-200'} relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div >
    )
}

export default Pagination