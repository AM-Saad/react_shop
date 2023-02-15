import PaginationType from './Pagination';
import Meta from './Meta';
export default interface Zone {
    _id: string;
    name: string
    zoneId: number
    governorate: string
    pickup: boolean,
    delivery: boolean,
    shipping: number,
    orders: any[],
    notes: string,
    duration: string,
    active: boolean
}

export interface ZonesMeta extends Meta {
    pagination?: PaginationType

    filters: {
        name?: string | null;
        id?: string | null;
        active?: string | null;
        delivery?: string | null;
        governorate?: string | null;
        pickup?: string | null;
       
    }   
}