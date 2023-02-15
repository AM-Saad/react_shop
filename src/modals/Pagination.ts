export default interface PaginationType {
    itemsPerPage: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean,
    nextPage: number,
    prevPage: number,
    lastPage: number,
    total: number,
    skip: number
}
