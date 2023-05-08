import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const formConfig = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  // colon: false //是否显示 label 后面的冒号
};
const { Option } = Select;
const SaasModal = ({ form, selectObj }) => {
  const { getFieldDecorator } = form;
  return (
    <Form className="ui-database-connection" {...formConfig}>
      {(selectObj.loginParams || []).map((val) => {
        if (val.name === 'product_version') {
          // optionCodes, optionNames
          const projectList =
            val.optionCodes && val.optionNames
              ? val.optionCodes.map((item, index) => {
                  return {
                    name: val.optionNames[index],
                    key: item,
                  };
                })
              : [];
          return (
            <FormItem label={val.text} key={val.name}>
              {getFieldDecorator(`${val.name}`, {
                initialValue: undefined,
                rules: [{ required: true, message: `请填写${val.text}` }],
              })(
                <Select placeholder={`请选择${val.text}`}>
                  {projectList.map((item) => {
                    return (
                      <Option value={item.key} key={item.key}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </FormItem>
          );
        }
        return (
          <FormItem label={val.text} key={val.name}>
            {getFieldDecorator(`${val.name}`, {
              initialValue: selectObj.companyId || '',
              rules: [{ required: true, message: `请填写${val.text}` }],
            })(<Input placeholder={`请填写${val.text}`} autoComplete="off" />)}
          </FormItem>
        );
      })}
    </Form>
  );
};

SaasModal.defaultProps = {
  selectObj: {},
};

SaasModal.propTypes = {
  selectObj: PropTypes.objectOf(PropTypes.any),
};
export default Form.create()(SaasModal);
