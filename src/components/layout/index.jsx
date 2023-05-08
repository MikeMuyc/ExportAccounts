import React from 'react';
import { Layout } from 'antd';
import './style.less';

export default ({ children, ...rest }) => {
  return (
    <Layout prefixCls="printing-layout" {...rest}>
      {children}
    </Layout>
  );
};
