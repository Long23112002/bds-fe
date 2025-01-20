/* eslint-disable react-refresh/only-export-components */

import  { useEffect, useRef, useState } from 'react'
import { Slider, Radio, Button, Space, Card } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { searchStore } from '../../../stores/SearchStore'
import { observer } from 'mobx-react-lite'
import { pageFilterStore } from '../../../stores/PageFilterStore'

const formatter = (value: number) => `${value} m²`

const areaRanges = [
    { label: 'Tất cả diện tích', value: 'all' },
    { label: 'Dưới 30 m²', value: '0-30' },
    { label: '30 - 50 m²', value: '30-50' },
    { label: '50 - 80 m²', value: '50-80' },
    { label: '80 - 100 m²', value: '80-100' },
    { label: '100 - 150 m²', value: '100-150' },
    { label: '150 - 200 m²', value: '150-200' },
    { label: '200 - 250 m²', value: '200-250' },
]
const AreaFilter = () => {
    const [sliderValue, setSliderValue] = useState<[number, number]>([0, 500])
    const [selectedRange, setSelectedRange] = useState('all')

    const handleRangeChange = (e: RadioChangeEvent) => {
        const value = e.target.value
        setSelectedRange(value)

        // Update slider based on selected range
        switch (value) {
            case 'all':
                setSliderValue([0, 500])
                break
            case '0-30':
                setSliderValue([0, 30])
                break
            case '30-50':
                setSliderValue([30, 50])
                break
            case '50-80':
                setSliderValue([50, 80])
                break
            case '80-100':
                setSliderValue([80, 100])
                break
            case '100-150':
                setSliderValue([100, 150])
                break
            case '150-200':
                setSliderValue([150, 200])
                break
            case '200-250':
                setSliderValue([200, 250])
                break
        }
    }

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                searchStore.setIsOpenArenaFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleReset = () => {
        setSliderValue([0, 500])
        setSelectedRange('all')
    }

    const handleApply = () => {

        const selectedLabel = areaRanges.find(range => range.value === selectedRange)?.label || 'Tất cả diện tích';

        searchStore.setAreaSearchValue({
            min: sliderValue[0],
            max: sliderValue[1]
        })

        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            minArea: sliderValue[0],
            maxArea: sliderValue[1]
        })

        pageFilterStore.setValueSearch({
            ...pageFilterStore.valueSearchLabel,
            arena: selectedLabel
        })


        searchStore.setIsOpenArenaFilter(false)
    }

    return (
        <Card ref={listRef} style={{
            display: searchStore.isOpenArenaFilter ? 'block' : 'none',
            width: "340px", height: '460px', overflow: 'auto',
            position: 'absolute', top: '160px', left: '480px'
        }}>
            <div style={{ marginBottom: 32 }}>
                <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>{formatter(sliderValue[0])}</span>
                    <span>→</span>
                    <span>{formatter(sliderValue[1])}</span>
                </Space>
                <Slider
                    range
                    min={0}
                    max={500}
                    value={sliderValue}
                    onChange={(value) => setSliderValue(value as [number, number])}
                // tooltip={{
                //     formatter
                // }}
                />
            </div>

            <Radio.Group
                style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 300, overflowY: 'auto', marginBottom: 16 }}
                value={selectedRange}
                onChange={handleRangeChange}
            >
                {areaRanges.map((range) => (
                    <Radio key={range.value} value={range.value}>
                        {range.label}
                    </Radio>
                ))}
            </Radio.Group>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                <Button
                    icon={<span style={{ marginRight: 8 }}>↺</span>}
                    onClick={handleReset}
                >
                    Đặt lại
                </Button>
                <Button
                    type="primary"
                    onClick={handleApply}
                    style={{ backgroundColor: '#f5222d', borderColor: '#f5222d' }}
                >
                    Áp dụng
                </Button>
            </div>
        </Card>
    )
}

export default observer(AreaFilter)

