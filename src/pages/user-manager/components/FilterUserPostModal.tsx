/* eslint-disable react-refresh/only-export-components */
import { Modal, Tabs, Select, Checkbox, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { filterModalUserPost } from '../../../stores/FilterModalUserPost'

const FilterModal = () => {
    const [selectedCity, setSelectedCity] = useState<string[]>(["Hồ Chí Minh"])
    const [selectedType, setSelectedType] = useState<string[]>(["Tin VIP Kim Cương"])
    const [selectedPropertyType, setSelectedPropertyType] = useState<string[]>(["all"])
    const [selectedDistrict, setSelectedDistrict] = useState<string[]>(["all"])
    const [isHighlightedOnly, setIsHighlightedOnly] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>('all')

    const resetFilters = () => {
        setSelectedCity(["Hồ Chí Minh"])
        setSelectedType(["Tin VIP Kim Cương"])
        setSelectedPropertyType(["all"])
        setSelectedDistrict(["all"])
        setIsHighlightedOnly(false)
    }

    return (
        <Modal
            open={filterModalUserPost.isOpenModalFilter}
            onCancel={() => filterModalUserPost.setIsOpenModalFilter(false)}
            footer={null}
            width={600}
            closeIcon={<CloseOutlined className="text-gray-600" />}
            title={<h5 className="text-xl mb-0">Lọc</h5>}
            className="filter-modal"
        >
            <div className="py-2">
                <Tabs
                    defaultActiveKey="all"
                    onChange={(key) => setActiveTab(key)} 
                    items={[
                        { key: 'all', label: 'Tất cả' },
                        { key: 'sell', label: 'Bán' },
                        { key: 'rent', label: 'Cho thuê' },
                    ]}
                    className="mb-4"
                />

                <div className="mb-4">
                    <label className="text-gray-700 mb-2 block">Loại tin đăng</label>
                    <Select
                        mode="multiple"
                        value={selectedType}
                        onChange={setSelectedType}
                        className="w-100"
                        suffixIcon={<CloseOutlined className="text-gray-400" />}
                        options={[
                            { value: 'Tin VIP Kim Cương', label: 'Tin VIP Kim Cương' },
                            { value: 'Tin VIP Vàng', label: 'Tin VIP Vàng' },
                            { value: 'Tin Thường', label: 'Tin Thường' },
                        ]}
                    />
                </div>

                <div className="mb-3">
                    <Checkbox
                        checked={isHighlightedOnly}
                        onChange={(e) => setIsHighlightedOnly(e.target.checked)}
                    >
                        Chỉ lọc tin NỔI BẬT
                    </Checkbox>
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 mb-2 block">Loại nhà đất</label>
                    <Select
                        mode="multiple"
                        value={selectedPropertyType}
                        onChange={setSelectedPropertyType}
                        className="w-100"
                        disabled={activeTab === 'all'}
                        options={[
                            { value: 'all', label: 'Tất cả' },
                            { value: 'house', label: 'Nhà riêng' },
                            { value: 'apartment', label: 'Căn hộ' },
                        ]}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 mb-2 block">Tỉnh / Thành phố</label>
                    <Select
                        mode="multiple"
                        value={selectedCity}
                        onChange={setSelectedCity}
                        className="w-100"
                        suffixIcon={<CloseOutlined className="text-gray-400" />}
                        options={[
                            { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
                            { value: 'Hà Nội', label: 'Hà Nội' },
                            { value: 'Đà Nẵng', label: 'Đà Nẵng' },
                        ]}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 mb-2 block">Quận / Huyện</label>
                    <Select
                        mode="multiple"
                        value={selectedDistrict}
                        onChange={setSelectedDistrict}
                        className="w-100"
                        suffixIcon={<CloseOutlined className="text-gray-400" />}
                        options={[
                            { value: 'all', label: 'Tất cả' },
                            { value: 'district1', label: 'Quận 1' },
                            { value: 'district2', label: 'Quận 2' },
                        ]}
                    />
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top ">
                    <Button type="link" className="text-success p-0 " onClick={resetFilters}>
                        Đặt lại
                    </Button>
                    <div className="d-flex">
                        <Button className="me-2" onClick={() => filterModalUserPost.setIsOpenModalFilter(false)}>
                            Huỷ
                        </Button>
                        <Button type="primary" className="bg-danger border-danger">
                            Lọc
                        </Button>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default observer(FilterModal)
