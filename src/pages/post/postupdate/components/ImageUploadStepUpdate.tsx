/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Form, Upload, Input, message } from 'antd';
import { UploadOutlined, PictureOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { newPostStore } from '../../../../stores/NewPostStore';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import { BASE_API } from '../../../../enums/baseApi';

const ImageUploadStepUpdate: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageList, setImageList] = useState<any[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | undefined>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const handleUpload = async (file: RcFile): Promise<boolean | void> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BASE_API}/api/v1/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const url = response.data?.file?.[0]?.url;

      // Cập nhật danh sách ảnh
      setImageList((prevImages) => [...prevImages, { url: url }]);

      // Cập nhật fileList
      setFileList((prevFileList) => [
        ...prevFileList,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: url,
        },
      ]);

      message.success(`Tải ảnh lên thành công!`);
      return false;
    } catch (error) {
      message.error(`${file.name} tải lên thất bại.`);
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    console.log('Form submitted with values:', values);
    try {
      const uploadedImages = fileList.map((file) => file.url);

      const valueRequest = {
        ...newPostStore.valueNewPost,
        images: uploadedImages.map((image: string | undefined) => ({ url: image || '' })),
        videoUrl: videoUrl || '',
      };

      newPostStore.setValueNewPost(valueRequest);

      console.log('Data to be submitted:', valueRequest);


      setFileList([]);
      setImageList([]);
      newPostStore.setCurrentStepUpdate(2);

      localStorage.setItem('valueNewPost', JSON.stringify(newPostStore.valueNewPost));
    } catch (error) {
      console.error('Submission failed:', error);
      message.error('Gửi dữ liệu thất bại!');
    }
  };

  const onRemove = (file: UploadFile): boolean => {
    setFileList((prev) => prev.filter(p => p.uid !== file.uid));
    return true;
  };

  useEffect(() => {
    if (newPostStore.postUpdateDetail.images) {
      const initialFileList = newPostStore.postUpdateDetail.images.map((image: any, index: any) => ({
        uid: `-${index}`,
        name: `Image ${index + 1}`,
        status: 'done',
        url: image.url,
      }));
      setFileList(initialFileList);
    }
    setVideoUrl(newPostStore.postUpdateDetail.videoUrl || '');
  }, [newPostStore.postUpdateDetail]);




  return (
    <div className="container px-4 py-5">
      <div className="mx-auto" style={{ maxWidth: '768px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
        >
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <h2 className="h5 mb-4">Hình ảnh</h2>

            <div className="bg-light p-3 rounded mb-4 d-flex align-items-center">
              <PictureOutlined className="me-2" />
              <span>Đăng tối thiểu 3 ảnh thường</span>
            </div>

            <Form.Item
              name="images"
              rules={[
                {
                  validator: (_, _value) =>
                    fileList.length >= 3
                      ? Promise.resolve()
                      : Promise.reject(new Error('Vui lòng thêm ít nhất 3 ảnh!')),
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onRemove={onRemove}
                customRequest={({ file }) => handleUpload(file as RcFile)}
                multiple
              >
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>

            {/* Help Links */}
            <div className="d-flex flex-column gap-2">
              <Button
                type="text"
                className="d-flex justify-content-between align-items-center w-100"
                size="large"
              >
                <span>Hướng dẫn đăng ảnh thường</span>
                <RightOutlined />
              </Button>
              <Button
                type="text"
                className="d-flex justify-content-between align-items-center w-100"
                size="large"
              >
                <span>Hướng dẫn đăng ảnh 360°</span>
                <RightOutlined />
              </Button>
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h5 mb-0">Video</h2>
              <span className="text-muted">(không bắt buộc)</span>
            </div>
            <Form.Item >
              <Input
                value={newPostStore.postUpdateDetail.videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)}
                size="large"
                placeholder="Dán đường dẫn Youtube hoặc Tiktok"
              />
            </Form.Item>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button onClick={handleSubmit} size="large" type="primary" >
              Tiếp theo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(ImageUploadStepUpdate);
