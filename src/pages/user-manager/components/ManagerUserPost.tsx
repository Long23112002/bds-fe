/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  Input,
  Tabs,
  Button,
  Space,
  Row,
  Col,
  Affix,
} from 'antd';
import {
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
  ReloadOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { filterModalUserPost } from '../../../stores/FilterModalUserPost';
import { observer } from 'mobx-react-lite';
import FilterUserPostModal from './FilterUserPostModal';
import PostList from '../PostList';
import { filterPostApi } from '../../../api/posts';
import { debounce } from 'lodash';

const { TabPane } = Tabs;

const ManagerUserPost = () => {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string[] }>({
    all: [],
    expired: [],
    aboutToExpire: [],
    approved: [],
    pending: [],
  });

  const [selectedTab, setSelectedTab] = useState('all');
  const [allPost, setAllPost] = useState([]);
  const [expiredPosts, setExpiredPosts] = useState([]);
  const [aboutToExpirePosts, setAboutToExpirePosts] = useState([]);
  const [approvedPosts, setApprovedPosts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const res = await filterPostApi({
        page: 0,
        size: 10000,
        userId: localStorage.getItem('id') ? parseInt(localStorage.getItem('id') as string) : 0,
        keyword: keyword,
        isExpired: true
      });
      setAllPost(res.data);
    }

    fetchApi();


  }, [selectedTab, keyword]);

  useEffect(() => {
    setAboutToExpirePosts(allPost?.filter((item: any) => {
      const endDate = new Date(item.packagePriceTransaction?.endDate);
      const currentDate = new Date();
      const threeDaysFromNow = new Date(currentDate);
      threeDaysFromNow.setDate(currentDate.getDate() + 3);
      return endDate > currentDate && endDate <= threeDaysFromNow;
    }));;
    setExpiredPosts(allPost.filter((item: any) => item.status === 'EXPIRED'));
    setApprovedPosts(allPost.filter((item: any) => item.status === 'APPROVED'));
    setPendingPosts(allPost.filter((item: any) => item.status === 'PENDING'));
  }, [selectedTab, allPost]);


  const handleSelectAll = (checked: boolean, tabKey: string) => {
    if (checked) {
      setSelectedItems(prev => ({
        ...prev,
        [tabKey]: getPostsForTab(tabKey).map((item: any) => item.id)
      }));
    } else {
      setSelectedItems(prev => ({ ...prev, [tabKey]: [] }));
    }
  };

  const handleItemSelect = (id: string, checked: boolean, tabKey: string) => {
    if (checked) {
      setSelectedItems(prev => ({
        ...prev,
        [tabKey]: [...prev[tabKey], id]
      }));
    } else {
      setSelectedItems(prev => ({
        ...prev,
        [tabKey]: prev[tabKey].filter((itemId) => itemId !== id)
      }));
    }
  };

  const getPostsForTab = (tabKey: string) => {
    switch (tabKey) {
      case 'all':
        return allPost;
      case 'expired':
        return expiredPosts;
      case 'aboutToExpire':
        return aboutToExpirePosts;
      case 'approved':
        return approvedPosts;
      case 'pending':
        return pendingPosts;
      default:
        return [];
    }
  };

  const extractAddress = (address: string) => {
    return address;
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, selectedItems);
  };

  const handleChange = debounce((e) => {
    setKeyword(e.target.value);
  }, 300);


  return (
    <div className="container mx-4 my-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Danh sách tin</h1>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={12}>
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            onChange={handleChange}
          />
        </Col>
        <Col span={12}>
          <Space>
            <Button icon={<FilterOutlined />} onClick={() => filterModalUserPost.setIsOpenModalFilter(true)}>
              Bộ lọc
            </Button>
            <Button icon={<DownloadOutlined />}> Xuất dữ liệu </Button>
          </Space>
        </Col>
      </Row>

      <Tabs defaultActiveKey="all" onChange={(e) => setSelectedTab(e)} className="mb-4">
        <TabPane tab={`Tất cả (${allPost.length})`} key="all">
          <PostList
            posts={allPost}
            selectedItems={selectedItems.all}
            onSelectAll={(checked) => handleSelectAll(checked, 'all')}
            onItemSelect={(id, checked) => handleItemSelect(id, checked, 'all')}
            extractAddress={extractAddress}
          />
        </TabPane>

        <TabPane tab={`Hết hạn (${expiredPosts.length})`} key="expired">
          <PostList
            posts={expiredPosts}
            selectedItems={selectedItems.expired}
            onSelectAll={(checked) => handleSelectAll(checked, 'expired')}
            onItemSelect={(id, checked) => handleItemSelect(id, checked, 'expired')}
            extractAddress={extractAddress}
          />
        </TabPane>

        <TabPane tab={`Sắp hết hạn (${aboutToExpirePosts.length})`} key="aboutToExpire">
          <PostList
            posts={aboutToExpirePosts}
            selectedItems={selectedItems.aboutToExpire}
            onSelectAll={(checked) => handleSelectAll(checked, 'aboutToExpire')}
            onItemSelect={(id, checked) => handleItemSelect(id, checked, 'aboutToExpire')}
            extractAddress={extractAddress}
          />
        </TabPane>

        <TabPane tab={`Đang hiển thị (${approvedPosts?.length})`} key="approved">
          <PostList
            posts={approvedPosts}
            selectedItems={selectedItems.approved}
            onSelectAll={(checked) => handleSelectAll(checked, 'approved')}
            onItemSelect={(id, checked) => handleItemSelect(id, checked, 'approved')}
            extractAddress={extractAddress}
          />
        </TabPane>

        <TabPane tab={`Chờ hiển thị (${pendingPosts?.length})`} key="pending">
          <PostList
            posts={pendingPosts}
            selectedItems={selectedItems.pending}
            onSelectAll={(checked) => handleSelectAll(checked, 'pending')}
            onItemSelect={(id, checked) => handleItemSelect(id, checked, 'pending')}
            extractAddress={extractAddress}
          />
        </TabPane>
      </Tabs>

      {Object.values(selectedItems).some(items => items.length > 0) && (
        <Affix offsetBottom={0}>
          <div
            style={{
              backgroundColor: '#1f1f1f',
              padding: '16px 24px',
              width: '50%',
              position: 'fixed',
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              borderRadius: '6px'
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Space align="center">
                  <span style={{ color: 'white' }}>
                    {Object.values(selectedItems).reduce((sum, items) => sum + items.length, 0)} tin đã được chọn
                  </span>
                </Space>
              </Col>
              <Col>
                <Space>
                  <Button
                    icon={<VerticalAlignTopOutlined />}
                    onClick={() => handleBulkAction('push')}
                  >
                    Đẩy tin (0)
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => handleBulkAction('repost')}
                  >
                    Đăng lại (0)
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        </Affix>
      )}
      <FilterUserPostModal />
    </div>
  );
}

export default observer(ManagerUserPost);

