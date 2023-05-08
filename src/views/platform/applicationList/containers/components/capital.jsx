import React from 'react';
import { Tooltip } from 'antd';
import './style.less';
import PropTypes from 'prop-types';

const typeList = {
  more: {
    label: '多',
    title: '支持合并多年度数据',
  },
  single: {
    label: '单',
    title: '单点登录',
  },
  capital: {
    label: '资',
    title: '支持固定资产导账',
  },
};
const SquIcon = ({ type }) => {
  const dataObj = typeList[type] || 'more';
  return (
    <Tooltip placement="topLeft" title={dataObj.title}>
      <div className={`myIcon-${type}`}>{dataObj.label}</div>
    </Tooltip>
  );
};
SquIcon.propTypes = {
  type: PropTypes.string.isRequired,
};
export default SquIcon;
