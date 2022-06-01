/*
 * @Description: 平台 app 迭代
 * @Author: 尚夏
 * @Date: 2021-09-13 17:11:44
 * @LastEditTime: 2021-09-26 15:15:21
 * @FilePath: /mining-admin-desktop/src/pages/AppUpload/index.tsx
 */
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { message, Button, Tooltip, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { OwnerService } from '@/services';
import CopyToClipboard from '@/components/Copy';
import { formatAddress } from '@/utils/utils';
import AppRecordModal from './AppRecordModal';
import UploadModal from './UploadModal';
import EditRecordModal from './EditRecordModal';

const AppUpload: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [activeApp, setActiveApp] = useState<any>({});

  // 发布
  const publishAppRelease = (Id: string) => {
    OwnerService.publishAppRelease(Id).then((res: any) => {
      if (res) {
        message.success('操作成功');
        actionRef.current?.reload();
      }
    });
  };

  // app新版本内容
  const [visible, setVisible] = useState<boolean>(false);
  const handleOk = (data: any) => {
    OwnerService.createAppRelease({
      data: { ...data },
    }).then((res: any) => {
      if (res) {
        message.success('操作成功');
        actionRef.current?.reload();
      }
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // 上传App android 直接上传apk  ios 弹窗上传地址
  const [uploadVisible, setUploadVisible] = useState<boolean>(false);
  const handleUploadCancel = () => {
    setUploadVisible(false);
  };
  // 上传ios地址
  const handleUploadOk = (data: any) => {
    OwnerService.createAppRelease({
      data: { ...data },
    }).then((res: any) => {
      if (res) {
        message.success('操作成功');
        actionRef.current?.reload();
      }
    });
  };

  const beforeUpload = (file: File) => {
    message.loading('上传中...', 0);
    OwnerService.uploadAndroidReleaseApk(activeApp?.Id, {
      androidAPK: file,
    }).then((res: any) => {
      if (res) {
        message.destroy();
        message.success('操作成功');
        actionRef.current?.reload();
      }
    });
    return false;
  };

  // 编辑App信息
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const handleEditOk = (data: any) => {
    OwnerService.editAppRelease(activeApp.Id, {
      data: { ...data },
    }).then((res: any) => {
      if (res) {
        message.success('操作成功');
        actionRef.current?.reload();
      }
    });
  };

  const handleEditCancel = () => {
    setEditVisible(false);
  };

  const columns: ProColumns<Notice.FormProps>[] = [
    {
      title: '版本',
      search: false,
      dataIndex: 'version',
    },
    {
      title: '更新内容',
      search: false,
      dataIndex: 'releaseNotes',
    },
    {
      title: '发布时间',
      search: false,
      dataIndex: 'publishedAt',
      valueType: 'dateTime',
    },
    {
      title: '平台',
      search: false,
      dataIndex: 'platform',
      valueEnum: {
        android: {
          text: 'Android',
        },
        ios: {
          text: 'IOS',
        },
      },
    },
    {
      title: '链接',
      search: false,
      dataIndex: 'downloadURL',
      renderText: (text) => {
        if (text) {
          return (
            <>
              <Tooltip title={text}>
                <span className={styles.dot}>{formatAddress(text)}</span>
              </Tooltip>
              <CopyToClipboard text={text} />
            </>
          );
        }
        return '';
      },
    },
    {
      title: '操作',
      width: '164px',
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        if (text.state === 'created') {
          return [
            <a
              key="publish"
              onClick={() => {
                publishAppRelease(text.Id);
              }}
            >
              发布
            </a>,
            <a
              key="edit"
              onClick={() => {
                setActiveApp(text);
                setEditVisible(true);
              }}
            >
              编辑
            </a>,

            text.platform === 'android' ? (
              <Upload
                name="avatar"
                listType="picture"
                className={styles.uploader}
                showUploadList={false}
                action=""
                beforeUpload={beforeUpload}
              >
                <a
                  key="upload"
                  onClick={() => {
                    setActiveApp(text);
                  }}
                >
                  上传
                </a>
              </Upload>
            ) : (
              <a
                key="upload"
                onClick={() => {
                  setActiveApp(text);
                  setUploadVisible(true);
                }}
              >
                上传
              </a>
            ),
          ];
        }
        return null;
      },
    },
  ];

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <ProTable<Notice.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return OwnerService.fetchAppReleaseList().then((res: any) => {
            return { data: res || [] };
          });
        }}
        options={{
          density: false,
        }}
        // editable={{
        //   type: 'multiple',
        // }}
        rowKey="Id"
        search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="APP迭代记录"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setVisible(true)}
          >
            App新版本
          </Button>,
        ]}
      />
      <AppRecordModal visible={visible} onOk={handleOk} onCancel={handleCancel} />
      <UploadModal
        visible={uploadVisible}
        setVisible={setUploadVisible}
        onOk={handleUploadOk}
        onCancel={handleUploadCancel}
      />
      {editVisible && (
        <EditRecordModal
          visible={editVisible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
          record={activeApp}
        />
      )}
    </PageContainer>
  );
};

export default AppUpload;
