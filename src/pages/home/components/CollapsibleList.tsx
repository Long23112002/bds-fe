
import { useState } from 'react'
import { Card } from 'antd'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CollapsibleListProps {
    title: string
    items: { text: string; count: number }[]
    initialVisibleItems?: number
}

export function CollapsibleList({ title, items, initialVisibleItems = 3 }: CollapsibleListProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const visibleItems = isExpanded ? items : items.slice(0, initialVisibleItems)

    return (
        <Card title={title} className="mt-4">
            <ul className="list-unstyled mb-0">
                {visibleItems.map((item, index) => (
                    <li key={index} className={index !== visibleItems.length - 1 ? "mb-2" : ""}>
                        {item.text} ({item.count})
                    </li>
                ))}
            </ul>
            {items.length > initialVisibleItems && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary border-0 bg-transparent p-0 mt-2 d-flex align-items-center gap-1"
                >
                    {isExpanded ? (
                        <>
                            Thu gọn
                            <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Xem thêm
                            <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            )}
        </Card>
    )
}
