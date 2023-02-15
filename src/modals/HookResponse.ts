import PaginationType from './Pagination'

interface HookResponse<ResponseItems> {
    items: ResponseItems;
    pagination?: PaginationType
}

export default HookResponse