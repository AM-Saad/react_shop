
import { Link } from 'react-router-dom'
import Zone from '../../../modals/Zone';

const ZoneItem: React.FC<{ zone: Zone }> = ({ zone }) => {
    return (
        <>
            <li key={zone._id}>
                <Link to={`/admin/zones/${zone._id}`} className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                            <div className="flex-shrink-0">
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                <div>
                                    <p className="text-sm text-left font-medium text-indigo-600 truncate">{zone.name}</p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                        <span className="truncate">#{zone.zoneId}</span>
                                    </p>
                                </div>
                             
                            </div>
                        </div>
                      
                    </div>
                </Link>
            </li>
        </>
    )
}

export default ZoneItem