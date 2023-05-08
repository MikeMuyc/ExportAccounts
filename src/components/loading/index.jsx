import React from 'react';
import { Spin } from 'antd';
import './style.less';

export default (data) => (
  <div className="loading">
    <Spin size="large" tip="加载中..." {...data} />
  </div>
);
