import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Input, Checkbox, AutoComplete, Icon, message } from 'antd';
import logoBgSrc from '@images/loginBackground.png';
import { useHistory } from 'react-router-dom';
import effects from '../../redux/effects';
import SelectCompany from '../SelectModal';
import Code from '../Code';
import './style.less';

const { Item: FormItem } = Form;
const { Option } = AutoComplete;

const LoginLayout = ({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form;
  const [selectCompanyVisible, setSelectCompanyVisible] = useState(false);
  // const [verifyCode, setVerifyCode] = useState(null);
  const [serviceUrl, setServiceUrl] = useState('');
  const verifyCode = useRef(null);

  const history = useHistory();
  const { userNameList, remember } = useSelector((state) => state.signIn);

  useEffect(() => {
    effects.getList().then((res) => {
      if (res) {
        setServiceUrl(res.serviceUrl || '');
        setFieldsValue({
          username: res.userNameList[0].account,
          password: res.userNameList[0].password,
          code: '',
        });
      }
    });
  }, [setFieldsValue]);
  const updateCode = () => {
    verifyCode.current.click();
  };
  const handleLogin = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      ClientAPI.login(JSON.stringify(values))
        .then(() => {
          if (remember) {
            const userObj = {
              account: values.username,
              password: values.password,
            };
            const index = userNameList.findIndex((item) => item.account === values.username);
            if (index > -1) {
              userNameList.splice(index, 1);
            }
            userNameList.unshift(userObj);
            effects.setState({ userNameList });
            localStorage.setItem(`userNameList`, JSON.stringify(userNameList));
          }
          localStorage.setItem(`loginRemember`, remember);
          setSelectCompanyVisible(true);
        })
        .catch((result) => {
          message.error(result.msg || '登录失败！');
          updateCode();
          setFieldsValue({
            code: '',
          });
        });
    });
  };
  const removeAccount = (value, e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const newUserNameList = [...userNameList];
    const index = userNameList.findIndex((item) => item.account === value.account);
    newUserNameList.splice(index, 1);
    localStorage.setItem('userNameList', JSON.stringify(newUserNameList));
    effects.setState({
      userNameList: newUserNameList,
    });
  };

  const handleCancel = () => {
    updateCode();
    setSelectCompanyVisible(false);
    setFieldsValue({
      code: '',
    });
  };

  const handleOk = () => {
    effects.setState({ loading: true });
    ClientAPI.getNumberOfAccountSets()
      .then((res) => {
        console.log(res);
        // setAccountNum({
        //   maxAccountNumber: get(res, 'datas.maxAccountNumber', 0),
        //   userAccountNumber: get(res, 'datas.userAccountNumber', 0),
        // });
        effects.setState({ loading: true });
        history.push('/helper/application-list');
      })
      .catch((res) => {
        effects.setState({ loading: true });
        message.error(res.msg || '获取账套数失败！');
      });
  };

  return (
    <div className="loginLayer">
      <div className="login_background">
        <div className="left" />
        <img className="background" src={logoBgSrc} alt="logoBg" />
        <div className="right" />
      </div>
      <div className="hoverBox">
        <div className="h3">欢迎登录</div>
        <Form className="loginForm" onSubmit={handleLogin}>
          <FormItem>
            {getFieldDecorator('username', {
              initialValue: '',
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <AutoComplete
                defaultActiveFirstOption
                optionLabelProp="value"
                filterOption={(inputValue, option) =>
                  option.props.value.toUpperCase().includes(inputValue.toUpperCase())
                }
                onSelect={(v) => {
                  setFieldsValue({
                    password: userNameList.find((item) => item.account === v).password,
                  });
                }}
                dataSource={userNameList.map((item) => (
                  <Option key={item.account} value={item.account}>
                    <Row type="flex" justify="space-between">
                      <Col>{item.account}</Col>
                      <Col>
                        <Icon
                          type="close"
                          className="i-fs16"
                          onClick={(e) => removeAccount(item, e)}
                        />
                      </Col>
                    </Row>
                  </Option>
                ))}
              >
                <Input
                  placeholder="请输入用户名"
                  autoComplete="off"
                  style={{ width: '250px' }}
                  prefix={<i className="iconfont icon-yonghuming1" />}
                />
              </AutoComplete>,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input.Password
                prefix={<i className="iconfont icon-mima1" />}
                placeholder="请输入密码"
                style={{ width: '250px' }}
                autoComplete="off"
              />,
            )}
          </FormItem>
          <Row type="flex" gutter={12}>
            <Col style={{ flex: 1 }}>
              <FormItem>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: '请输入验证码' }],
                })(
                  <Input
                    prefix={<i className="iconfont icon-yanzhengma1" />}
                    placeholder="请输入验证码"
                    style={{ width: '160px' }}
                    autoComplete="off"
                  />,
                )}
              </FormItem>
            </Col>
            <Col style={{ paddingBottom: '20px', alignItems: 'center', display: 'flex' }}>
              <Code ref={verifyCode} serviceUrl={serviceUrl} />
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col style={{ userSelect: 'none' }}>
              <Checkbox
                checked={remember}
                onChange={() => effects.setState({ remember: !remember })}
              >
                记住密码
              </Checkbox>
            </Col>
          </Row>
          <FormItem className="e-pt10">
            <Button style={{ height: 36 }} block type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
      <SelectCompany
        selectCompanyVisible={selectCompanyVisible}
        setSelectCompanyVisible={setSelectCompanyVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default connect()(Form.create()(LoginLayout));
