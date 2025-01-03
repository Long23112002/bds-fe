/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Checkbox, Space } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { searchStore } from '../../../stores/SearchStore'
import { observer } from 'mobx-react-lite'
import { pageFilterStore } from '../../../stores/PageFilterStore'

interface FilterOption {
    label: string
    value: string
}

const bedroomOptions: FilterOption[] = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5+', value: '5+' },
]

const directionOptions: any[] = pageFilterStore.diractionOptions.map((item: any) => {
    return {
        label: item.name,
        value: item.id,
    }
})

const contentOptions: FilterOption[] = [
    { label: 'Hình ảnh', value: 'image' },
    { label: 'Video', value: 'video' },
]

const MultiSelectFilter = () => {
    const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([])
    const [selectedDirections, setSelectedDirections] = useState<string[]>([])
    const [selectedContent, setSelectedContent] = useState<string[]>([])

    const CheckboxGroup = ({ options, value, onChange }: {
        options: FilterOption[]
        value: string[]
        onChange: (checkedValues: string[]) => void
    }) => (
        <Space wrap>
            {options.map(option => (
                <Checkbox
                    key={option.value}
                    checked={value.includes(option.value)}
                    onChange={(e: CheckboxChangeEvent) => {
                        if (e.target.checked) {
                            onChange([...value, option.value])
                        } else {
                            onChange(value.filter(v => v !== option.value))
                        }
                    }}
                    style={{
                        backgroundColor: value.includes(option.value) ? '#f5f5f5' : 'white',
                        border: '1px solid #d9d9d9',
                        borderRadius: 16,
                        padding: '4px 12px',
                        marginRight: 8,
                        marginBottom: 8,
                    }}
                >
                    <span style={{ marginLeft: 0 }}>{option.label}</span>
                </Checkbox>
            ))}
        </Space>
    )

    const handleReset = () => {
        searchStore.setFilterOptionValue({
            bedrooms: [],
            directions: [],
            content: [],
        })

        setSelectedBedrooms([])
        setSelectedDirections([])
        setSelectedContent([])
    }

    const handleApply = () => {
        const bedroomsValue = selectedBedrooms;
        const directionsValue = selectedDirections;
        const contentValue = selectedContent;

        // Lấy các giá trị tiếng Việt tương ứng từ các lựa chọn
        const bedroomsVietnamese = selectedBedrooms.map(
            value => bedroomOptions.find(option => option.value === value)?.label || value
        );
        const directionsVietnamese = selectedDirections.map(
            value => directionOptions.find(option => option.value === value)?.label || value
        );
        const contentVietnamese = selectedContent.map(
            value => contentOptions.find(option => option.value === value)?.label || value
        );

        // Cập nhật các giá trị đã chọn vào pageFilterStore
        pageFilterStore.setFilterOptionValue({
            bedroom: bedroomsValue,
            bedroomVietnamese: bedroomsVietnamese,
            directions: directionsValue,
            directionsVietnamese: directionsVietnamese,
            content: contentValue,
            contentVietnamese: contentVietnamese,
        });

        pageFilterStore.setValueSearch({
            ...pageFilterStore.valueSearchLabel,
            checkboxQuantity: selectedBedrooms.length + selectedDirections.length + selectedContent.length,
        })

        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            numBerOfBedrooms: new Set<number>(bedroomsValue.map(value => parseInt(value))),
            media: new Set<string>(contentValue),
        })

        searchStore.setIsfilterOption(false);
    };


    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                searchStore.setIsfilterOption(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        pageFilterStore.fetchHouseDirection({ name: '' }, {
            page: 0,
            size: 1000
        })
    }, [])

    return (
        <>
            <Card ref={listRef} style={{
                display: searchStore.isfilterOption ? 'block' : 'none',
                width: 380, height: 500, overflow: 'auto',
                position: 'absolute', top: '160px', left: '480px'
            }}>
                <div style={{ marginBottom: 24 }}>
                    <h3 style={{ marginBottom: 16 }}>Số phòng ngủ</h3>
                    <CheckboxGroup
                        options={bedroomOptions}
                        value={selectedBedrooms}
                        onChange={setSelectedBedrooms}
                    />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <h3 style={{ marginBottom: 16 }}>Hướng nhà</h3>
                    <CheckboxGroup
                        options={directionOptions}
                        value={selectedDirections}
                        onChange={setSelectedDirections}
                    />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <h3 style={{ marginBottom: 16 }}>Nội dung tin có</h3>
                    <CheckboxGroup
                        options={contentOptions}
                        value={selectedContent}
                        onChange={setSelectedContent}
                    />
                </div>

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
        </>
    )
}
export default observer(MultiSelectFilter)

