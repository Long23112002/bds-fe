/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, List, Typography } from 'antd';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { favoriteStore } from '../../stores/FavoriteStore';
import { formatTimeAgo } from '../../utils/FomatTime';
import { Link } from 'react-router-dom';


const { Title } = Typography;



const Favorite = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleDelete = async (id: number) => {
    try {
      await favoriteStore.deleteFavorite(id);
      favoriteStore.setListFavorite(
        favoriteStore.listFavorite.filter((favorite: any) => favorite.post.id !== id)
      );
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      favoriteStore.isOpenModalFavorite = false;
    }
  };

  const handleScroll = () => {
    favoriteStore.isOpenModalFavorite = false;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    favoriteStore.fetchListFavorite()
  }, [favoriteStore.isOpenModalFavorite, favoriteStore.listFavorite.length]);




  return (
    <div
      ref={ref}
      className="border rounded bg-white"
      style={{
        display: favoriteStore.isOpenModalFavorite ? 'block' : 'none',
        width: '500px',
        position: 'absolute',
        zIndex: '9999',
        left: '1050px',
        top: '0px',
      }}
    >
      <Title level={4} className="px-4 py-3 m-0 border-bottom">
        Tin đăng đã lưu
      </Title>

      <List
        itemLayout="horizontal"
        dataSource={favoriteStore.listFavorite}
        renderItem={(favorite: any) => {
          const post = favorite.post;

          return (
            <List.Item
              className="px-4 position-relative"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ transition: 'background-color 0.3s' }}
            >
              <Link
                to={`/post-detail/${post.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  width: '100%' // Add this to ensure full width
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      src={post?.images[0]?.url || '/placeholder.png'}
                      alt={post.title}
                      width={80}
                      height={60}
                      preview={false}
                      className="rounded object-cover"
                    />
                  }
                  title={
                    <div
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '1.3',
                        maxWidth: '350px' // Add max-width to ensure text doesn't overlap with delete button
                      }}
                    >
                      {post.title}
                    </div>
                  }
                  description={
                    <div
                      className="text-muted"
                      style={{
                        width: '200px',
                      }}
                    >
                      {formatTimeAgo(new Date(favorite.createdAt))}
                    </div>
                  }
                />
              </Link>

              {hoveredId === post.id && (
                <Button
                  type="text"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => handleDelete(post.id)}
                  className="position-absolute"
                  style={{
                    top: '50%',
                    right: '16px',
                    transform: 'translateY(-50%)',
                    transition: 'opacity 0.3s',
                  }}
                />
              )}
            </List.Item>
          );
        }}
        style={{
          maxHeight: '240px',
          overflowY: 'auto',
        }}
      />



      <div className="px-4 py-3 border-top">
        {favoriteStore.listFavorite.length > 0 && (
          <Link
            to="/favorite-list"
            className="text-danger text-decoration-none d-flex align-items-center justify-content-center"
          >
            Xem tất cả <RightOutlined className="ms-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default observer(Favorite);
