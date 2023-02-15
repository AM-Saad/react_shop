import React, { useRef, useState, useEffect, useCallback } from 'react'

import './MultiRangeSlider'
interface Props {
    onChange: (data: { min: number, max: number }) => void;
    min: number
    max: number
    refresh?: any
}
const MultiRangeSlider: React.FC<Props> = ({ onChange, min, max, refresh }) => {
    const [minVal, setMinVal] = useState<number>(min);
    const [maxVal, setMaxVal] = useState<number>(max);
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const minValRef: any = useRef(null);
    const maxValRef: any = useRef(null);
    const range: any = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: any) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    const changeMaxValue = (event: any) => {
        const value = Math.max(+event.target.value, minVal + 1);
        setMaxVal(value);
    }
    const changeMinValue = (event: any) => {
        const value = Math.min(+event.target.value, maxVal - 1);
        setMinVal(value);
    }
    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);


    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isFirstRender) onChange({ min: minVal, max: maxVal });
        }, 1000)
        return () => clearTimeout(timer)

    }, [minVal, maxVal]);

    useEffect(() => {
        setIsFirstRender(false)
    }, [])
    useEffect(() => {
        setMinVal(min);
        setMaxVal(max);

    }, [refresh])
    return (
        <div className="h-12 mt-3">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={changeMinValue}
                className={`thumb thumb--zindex-3 w-64 pointer-events-none absolute h-0 outline-none max-w-full ${minVal > max - 100 ? 'thumb--zindex-5' : ''}`}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={changeMaxValue}
                className="thumb thumb--zindex-4 w-64 pointer-events-none absolute h-0 outline-none"
            />

            <div className="max-w-full relative w-64">
                <div className=" rounded-md h-1 w-full bg-gray-300" />
                <div ref={range} className="z-30 bg-indigo-700" />
                <input className=" absolute text-gray-400 mt-3 text-xs w-16 p-1" type="number" min="0" max={maxVal} value={minVal} onChange={changeMinValue} />
                <input className="right-1 absolute text-gray-400 mt-3 text-xs w-16 p-1" type="number" min="0" max={maxVal} value={maxVal} onChange={changeMaxValue} />
            </div>
        </div>
    )
}

export default MultiRangeSlider