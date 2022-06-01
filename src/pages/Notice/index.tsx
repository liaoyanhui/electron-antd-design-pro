/*
 * @Description: 订单
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2022-04-08 17:28:49
 * @FilePath: /mining-admin-desktop/src/pages/Notice/index.tsx
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
import { NoticeService } from '@/services';

// const NOTICE = `<p style="text-align:left;">尊敬的用户：<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据协议实验室官方信息，星际文件系统主网将于2021年6月30日UTC时间21:00-23:00，区块高度892800时，升级至V13 HyperDrive版本。本次更新将会使星际文件系统网络的存储和验证效率提高10-25倍。<br/>Bitchina将于北京时间6月30日8：00至7月1日8：00时进行升级，升级期间新增算力可能受影响，出块收益正常。除此之外，bitchina其余服务皆正常运转，App可以正常登录。<br/>bitchina遵循客户第一的原则，致力于以一流的产品服务为客户提供完善的服务体验。如您有任何问题请第一时间联系官方客服，我们将会及时为您解答。<br/>                                                                         <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;BitChina.io&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<span style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;">&nbsp;2021-10-11&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>`;
const Notice: React.FC<{
  dispatch: Dispatch;
}> = (props) => {
  const { dispatch } = props;

  const actionRef = useRef<ActionType>();

  // 查看公告
  const [checkNoticeVisible, setCheckNoticeVisible] = useState<boolean>(false);
  const [currentNotice, setCurrentNotice] = useState<any>({
    title: '',
    content: '',
  });

  const columns: ProColumns<Notice.FormProps>[] = [
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
                      type: 'notice/updateState',
                      payload: {
                        activeNotice: {
                          ...text,
                        },
                      },
                    });
                    history.push(`/operation/notice/editNotice?id=${text.Id}`);
                  }}
                >
                  编辑
                </a>
                <a
                  onClick={() => {
                    ModalInfo({
                      title: '发布',
                      handleOk: () => {
                        NoticeService.publishNotice({
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
                    setCurrentNotice({
                      title: text.title,
                      content: text.content,
                    });
                    setCheckNoticeVisible(true);
                  }}
                >
                  查看
                </a>
                <a
                  onClick={() => {
                    ModalInfo({
                      title: '撤回',
                      handleOk: () => {
                        NoticeService.revokeNotice({
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
      <ProTable<Notice.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return NoticeService.getNoticeList().then((res: any) => {
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
            onClick={() => history.push('/operation/notice/addNotice')}
          >
            新建公告
          </Button>,
        ]}
      />

      <Modal
        title={''}
        width={800}
        centered
        visible={checkNoticeVisible}
        footer={null}
        // onOk={handleOk}
        wrapClassName={styles.check_modal}
        // bodyStyle={{maxHeight: '600px', minHeight: '300px'}}
        onCancel={() => setCheckNoticeVisible(false)}
      >
        <h2>{currentNotice.title}</h2>
        <div
          className={styles.agency}
          dangerouslySetInnerHTML={{ __html: currentNotice.content }}
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

export default connect()(Notice);
