import { useEffect, useState } from 'react'

const useWindowsResize = (): number => {
    const [width, setWidth] = useState<number>(0)

    const setWidthVal = () => {
        const width:number = document.body.clientWidth
        setWidth(width)
    }
    useEffect(() => {
        window.addEventListener('resize', setWidthVal)
        setWidthVal()
        return () => window.removeEventListener('resize', setWidthVal)
    }, [])

    return width | 0
}

export default useWindowsResize
