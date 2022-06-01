import {
  // AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  // TaobaoCircleOutlined,
  UserOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
// import Footer from '@/components/Footer';
// import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { setStore } from '@/utils/utils';
import { AuthService } from '@/services';
import { imgs } from '@/assets/images';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    // const { query } = history.location;
    // const { redirect } = query as { redirect: string };
    history.push('/homePage');
  }, 10);
};

const Login: React.FC = () => {
  const [form] = ProForm.useForm();
  const [submitting, setSubmitting] = useState(false);
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('sms');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   // const userInfo = setStore()
  //   if (userInfo) {
  //     setInitialState({
  //       ...initialState,
  //       currentUser: userInfo,
  //     });
  //   }
  // };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // 登录
      const msg: any = await AuthService.signinByMobile({
        data: {
          ...values,
          signinChallengeMethod: type,
        },
      });
      if (msg) {
        if (msg.code) {
          message.error(msg.message);
          return;
        }
        const defaultloginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultloginSuccessMessage);
        setStore('userInfo', msg);
        setInitialState({
          ...initialState,
          currentUser: {
            ...msg,
          },
        });
        goto();
        return;
      }
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      const defaultloginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });

      message.error(defaultloginFailureMessage);
    }
    setSubmitting(false);
  };
  // const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      {/* <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div> */}
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={imgs.yunJieLogin} />
              {/* <span className={styles.title}>Ant Design</span> */}
            </Link>
          </div>
          <div className={styles.desc}>
            {/* {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })} */}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            form={form}
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                  borderRadius: 50,
                  background: '#004499',
                  fontSize: 14,
                  borderColor: 'transparent',
                  marginTop: 20,
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            {/* <Tabs activeKey={type} onChange={setType}>
        
              <Tabs.TabPane
                key="sms"
                tab={intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '手机号登录',
                })}
              />
            </Tabs> */}

            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'sms' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    style: {
                      border: 'none',
                    },
                  }}
                  name="mobile"
                  placeholder={'手机号'}
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    style: {
                      border: 'none',
                    },
                  }}
                  captchaProps={{
                    size: 'large',
                    style: {
                      border: 'none',
                      fontSize: 14,
                    },
                  }}
                  placeholder={'验证码'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} 获取验证码`;
                    }
                    return '获取验证码';
                  }}
                  name="signinChallengeResponse"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={async () => {
                    const mobile = form.getFieldValue('mobile');
                    const result = await AuthService.sendVerificationCodeBySms({
                      data: {
                        mobile,
                      },
                    });

                    if (result) {
                      message.success('获取验证码成功！');
                    } else {
                      throw new Error('网络错误');
                    }
                  }}
                />
              </>
            )}
            {/* <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
            </div> */}
          </ProForm>
          {/* <Space className={styles.other}>
            <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
            <AlipayCircleOutlined className={styles.icon} />
            <TaobaoCircleOutlined className={styles.icon} />
            <WeiboCircleOutlined className={styles.icon} />
          </Space> */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
