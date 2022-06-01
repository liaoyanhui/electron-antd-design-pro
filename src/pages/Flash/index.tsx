/*
 * @Description: 订单
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2021-11-22 15:57:52
 * @FilePath: /mining-admin-desktop/src/pages/Flash/index.tsx
 */
import React, { useRef, useState, useEffect } from 'react';
import { history, connect } from 'umi';
import type { Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import styles from './index.less';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import ModalInfo from '@/components/ModalInfo';

// service
import { FlashService } from '@/services';

const Flash: React.FC<{
  dispatch: Dispatch;
}> = (props) => {
  const { dispatch } = props;

  const actionRef = useRef<ActionType>();

  // 查看公告
  const [checkFlashVisible, setCheckFlashVisible] = useState<boolean>(false);
  const [currentFlash, setCurrentFlash] = useState<any>({
    title: '',
    content: '',
  });

  const columns: ProColumns<Flash.FormProps>[] = [
    // {
    //   title: '编号',
    //   search: false,
    //   dataIndex: 'Id',
    // },
    {
      title: '标题',
      search: false,
      dataIndex: 'title',
    },
    // {
    //   title: '创建人',
    //   search: false,
    //   dataIndex: 'createAuthor',
    // },
    // {
    //   title: '发布对象',
    //   search: false,
    //   dataIndex: 'publishObj'
    // },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '发布时间',
      search: false,
      dataIndex: 'publishedAt',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      search: false,
      dataIndex: 'state',
      valueEnum: {
        created: {
          text: '创建',
        },
        published: {
          text: '发布',
        },
        revoked: {
          text: '撤回',
        },
      },
    },
    {
      title: '操作',
      width: '164px',
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        return (
          <div className={styles.option}>
            {text.state === 'created' || text.state === 'revoked' ? (
              <>
                <a
                  onClick={() => {
                    dispatch({
                      type: 'flash/updateState',
                      payload: {
                        activeFlash: {
                          ...text,
                        },
                      },
                    });
                    history.push(`/operation/flash/editFlash?id=${text.Id}`);
                  }}
                >
                  编辑
                </a>
                <a
                  onClick={() => {
                    ModalInfo({
                      title: '发布',
                      handleOk: () => {
                        FlashService.publishFlash({
                          id: text.Id,
                        }).then((res: any) => {
                          if (res) {
                            message.success('操作成功');
                            actionRef.current?.reload();
                          }
                        });
                      },
                    });
                  }}
                >
                  发布
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => {
                    setCurrentFlash({
                      title: text.title,
                      content: text.content,
                    });
                    setCheckFlashVisible(true);
                  }}
                >
                  查看
                </a>
                <a
                  onClick={() => {
                    ModalInfo({
                      title: '撤回',
                      handleOk: () => {
                        FlashService.revokeFlash({
                          id: text.Id,
                        }).then((res: any) => {
                          if (res) {
                            message.success('操作成功');
                            actionRef.current?.reload();
                          }
                        });
                      },
                    });
                  }}
                >
                  撤回
                </a>
              </>
            )}
          </div>
        );
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
      <ProTable<Flash.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return FlashService.getFlashList().then((res: any) => {
            return { data: res };
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
        // headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => history.push('/operation/flash/addFlash')}
          >
            新建快讯
          </Button>,
        ]}
      />

      <Modal
        title={''}
        width={800}
        centered
        visible={checkFlashVisible}
        footer={null}
        // onOk={handleOk}
        wrapClassName={styles.check_modal}
        // bodyStyle={{maxHeight: '600px', minHeight: '300px'}}
        onCancel={() => setCheckFlashVisible(false)}
      >
        <h2>{currentFlash.title}</h2>
        <div
          className={styles.agency}
          dangerouslySetInnerHTML={{ __html: currentFlash.content }}
        ></div>
      </Modal>
    </PageContainer>
  );
};

// const mapStateToProps = (state: any) => {
//   return {
//       // publishVideoList: state.video.publishVideoList
//   }
// }

export default connect()(Flash);
