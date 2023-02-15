import Zone, { ZonesMeta } from './Zone';
import Meta from './Meta';
import PaginationType from './Pagination';

export default interface Zones {
    zones: Zone[],
    pagination: PaginationType,
    zonesMeta: ZonesMeta,
    currentZone: Zone | null,
    fetch_zones: () => void,
    fetch_zone: (id: string) => void,
    delete_zone: (id: string) => void,
    create_zone: (form: any) => void,
    update_partial_zone: (json_patch: any) => void,
    update_meta: (data: any) => void,
    update_pagination: (data: any) => void
    updatingMeta: Meta,


}