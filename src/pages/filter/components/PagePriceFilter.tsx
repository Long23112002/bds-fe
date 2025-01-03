/* eslint-disable react-refresh/only-export-components */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Slider, Radio, Button, Space, Card } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { observer } from 'mobx-react-lite'
import { pageFilterStore } from '../../../stores/PageFilterStore'

const formatter = (value: number) => value.toLocaleString('vi-VN')


const priceRanges = [
  { label: 'Tất cả mức giá', value: 'all' },
  { label: 'Dưới 500 triệu', value: '0-500' },
  { label: '500 - 800 triệu', value: '500-800' },
  { label: '800 triệu - 1 tỷ', value: '800-1000' },
  { label: '1 - 2 tỷ', value: '1000-2000' },
  { label: '2 - 3 tỷ', value: '2000-3000' },
  { label: '3 - 5 tỷ', value: '3000-5000' },
  { label: '5 - 7 tỷ', value: '5000-7000' },
]

const PriceFilter = () => {
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 60000])
  const [selectedRange, setSelectedRange] = useState('all')

  const handleRangeChange = (e: RadioChangeEvent) => {
    const value = e.target.value
    setSelectedRange(value)
    switch (value) {
      case 'all':
        setSliderValue([0, 60000])
        break
      case '0-500':
        setSliderValue([0, 500])
        break
      case '500-800':
        setSliderValue([500, 800])
        break
      case '800-1000':
        setSliderValue([800, 1000])
        break
      case '1000-2000':
        setSliderValue([1000, 2000])
        break
      case '2000-3000':
        setSliderValue([2000, 3000])
        break
      case '3000-5000':
        setSliderValue([3000, 5000])
        break
      case '5000-7000':
        setSliderValue([5000, 7000])
        break
    }
  }

  const handleReset = () => {
    setSliderValue([0, 60000])
    setSelectedRange('all')
  }

  const handleApply = () => {
    const selectedLabel = priceRanges.find(range => range.value === selectedRange)?.label || 'Tất cả mức giá';

    pageFilterStore.setParamSearch({
      ...pageFilterStore.paramSearch,
      maxPrice: sliderValue[1] * 1000000,
      minPrice: sliderValue[0] * 1000000,
    });

    pageFilterStore.setValueSearch({
      ...pageFilterStore.valueSearchLabel,
      price: selectedLabel
    })

    console.log(selectedLabel)

    pageFilterStore.setIsModalPeiceFilter(false);
  };

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        pageFilterStore.setIsModalPeiceFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <Card ref={listRef} style={{
      display: pageFilterStore.isModalPeiceFilter ? 'block' : 'none',
      width: "340px", height: '460px', overflow: 'auto',
      position: 'absolute', top: 61, left: 1125,
      zIndex: 1000, borderRadius: '4px 4px 4px 4px'
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
          max={60000}
          value={sliderValue}
          onChange={(value) => setSliderValue(value as [number, number])}
        // tooltip={{
        //   formatter
        // }}
        />
      </div>

      <Radio.Group
        style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 300, overflowY: 'auto', marginBottom: 16 }}
        value={selectedRange}
        onChange={handleRangeChange}
      >
        {priceRanges.map((range) => (
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

export default observer(PriceFilter)

