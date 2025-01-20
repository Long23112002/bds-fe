/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Row, Col, Checkbox, Space, Button } from 'antd';
import PostListItem from './components/PostListItem';
interface PostListProps {
  posts: any[];
  selectedItems: string[];
  onSelectAll: (checked: boolean) => void;
  onItemSelect: (id: string, checked: boolean) => void;
  extractAddress: (input: string) => string;
}

const PostList: React.FC<PostListProps> = ({ posts, selectedItems, onSelectAll, onItemSelect, extractAddress }) => {
  const isAllSelected = selectedItems.length === posts.length && posts.length > 0;
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < posts.length;

  return (
    <>
      <Row justify="space-between" align="middle" className="mb-4">
        <Col>
          <Checkbox
            indeterminate={isIndeterminate}
            checked={isAllSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
          >
            Chọn tất cả
          </Checkbox>
        </Col>
        <Col>
          <Space>
            <Button type="text">Sắp xếp</Button>
            <Button type="text">Nhóm tin</Button>
          </Space>
        </Col>
      </Row>

      {posts.map((item: any) => (
        <PostListItem
          key={item.id}
          item={item}
          isSelected={selectedItems.includes(item.id)}
          onSelect={onItemSelect}
          extractAddress={extractAddress}
        />
      ))}
    </>
  );
};

export default PostList;

