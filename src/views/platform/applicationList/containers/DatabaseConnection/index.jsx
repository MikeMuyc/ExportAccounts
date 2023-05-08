import React, { useState } from 'react';
import { Form, Input, Select, message, Modal, Table } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const formConfig = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  // colon: false //是否显示 label 后面的冒号
};
const DatabaseConnection = ({ selectObj, form, setMainLoading }) => {
  const [dbTypeName, setDbTypeName] = useState('');
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [rowKey, setRowKey] = useState({
    selectedRowKeys: [],
    selectedRows: [],
  });
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = form;
  const { verificationMethod } = getFieldsValue();
  const handleFocus = (e) => {
    // console.log('选择数据库');
    const { target } = e;
    target.blur();
    // 选择目录地址
    ClientAPI.SetAddress()
      .then((result) => {
        if (result.instance) {
          setDbTypeName(result.dbTypeName || '');
          setFieldsValue({
            instance: result.instance || '',
          });
        }
      })
      .catch((result) => {
        setFieldsValue({
          instance: '我没连上 模拟下',
        });
        message.error(result.msg || '设置目录失败！');
      });
  };
  const seeInstanceName = () => {
    setMainLoading(true);
    ClientAPI.getInstanse(JSON.stringify({}))
      .then((result) => {
        setMainLoading(false);
        setVisible(true);
        setDataSource(
          result.list.map((item, key) => {
            return { ...item, id: `${key}` };
          }),
        );
      })
      .catch((result) => {
        setMainLoading(false);
        message.error(result.msg || '获取软件类型失败！');
      });
    // setVisible(true);
    // console.log('查看实例名');
  };
  // 复选
  const rowSelection = {
    selectedRowKeys: rowKey.selectedRowKeys,
    width: 60,
    onChange(keys, records) {
      if (rowKey.selectedRowKeys.length >= 1) {
        setRowKey({
          selectedRowKeys: [keys[1]],
          selectedRows: records.filter((val) => val.id === keys[1]),
        });
        return;
      }
      setRowKey({
        selectedRowKeys: keys,
        selectedRows: records,
      });
    },
  };
  const onOk = () => {
    setFieldsValue({
      ipHostName: (rowKey.selectedRows[0] || {}).name,
    });
    setVisible(false);
  };
  // const test = () => {
  //   message.error('连接失败');
  //   message.success('连接成功');
  //   console.log('连接测试');
  // }
  // console.log(dataSource);
  return (
    <>
      <Form className="ui-database-connection" {...formConfig}>
        <FormItem label="数据库类型">
          {getFieldDecorator('databaseType', {
            initialValue: selectObj.typeid,
          })(
            <Select disabled>
              <Select.Option value={selectObj.typeid}>
                {dbTypeName || selectObj.dbTypeName || selectObj.typeName}
              </Select.Option>
            </Select>,
          )}
        </FormItem>
        {selectObj.typeid !== '0' && (
          <FormItem label="选择数据库路径">
            {getFieldDecorator('instance', {
              initialValue: selectObj.instance || '',
              rules: [{ required: true, message: '请选择数据库路径' }],
            })(<Input placeholder="请选择数据库路径" onFocus={handleFocus} autoComplete="off" />)}
          </FormItem>
        )}
        {selectObj.typeid === '0' && (
          <>
            <FormItem label="IP/主机名">
              {getFieldDecorator('ipHostName', {
                initialValue: selectObj.instance,
                // rules: [{ required: true, message: 'IP/主机名' }],
              })(
                <Input
                  addonAfter={
                    <span style={{ cursor: 'pointer', color: '#1890ff' }} onClick={seeInstanceName}>
                      实例名
                    </span>
                  }
                />,
              )}
            </FormItem>
            <FormItem label="验证方式">
              {getFieldDecorator('verificationMethod', {
                initialValue: 0,
              })(
                <Select>
                  <Select.Option value={0}>windows 验证</Select.Option>
                  <Select.Option value={1}>SQL SERVER验证</Select.Option>
                </Select>,
              )}
            </FormItem>
            {verificationMethod === 1 && (
              <>
                <FormItem label="登录名">
                  {getFieldDecorator('name', {
                    initialValue: selectObj.name,
                    rules: [{ required: true, message: '请输入登录名' }],
                  })(<Input placeholder="请输入登录名" autoComplete="off" />)}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('password', {
                    initialValue: selectObj.password,
                    rules: [{ required: false, message: '请输入密码' }],
                  })(<Input.Password placeholder="请输入密码" autoComplete="off" />)}
                </FormItem>
              </>
            )}
            {/* <Button
              onClick={test}
              style={{
                height: '32px',
                padding: '0 20px',
                marginLeft: '285px',
              }}
            >连接测试</Button> */}
          </>
        )}
      </Form>
      <Modal
        title="下面显示的是当前网络上发现的SQL server"
        visible={visible}
        onOk={onOk}
        onCancel={() => {
          setVisible(false);
        }}
        width={600}
        // getContainer={false}
      >
        <Table
          bordered
          pagination={false}
          rowKey="id"
          rowSelection={rowSelection}
          dataSource={dataSource}
          scroll={{
            y: 300,
          }}
          columns={[
            {
              width: 280,
              title: '实例名',
              dataIndex: 'name',
              align: 'left',
              // render: () => {},
            },
            {
              width: 120,
              title: 'ip地址',
              dataIndex: 'address',
              align: 'left',
            },
            {
              width: 80,
              title: '端口号',
              dataIndex: 'port',
              align: 'center',
            },
          ]}
        />
      </Modal>
    </>
  );
};
DatabaseConnection.propTypes = {
  selectObj: PropTypes.objectOf(PropTypes.any).isRequired,
  setMainLoading: PropTypes.func.isRequired,
};
export default Form.create()(DatabaseConnection);
