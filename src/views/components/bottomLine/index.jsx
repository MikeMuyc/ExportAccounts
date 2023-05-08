import React from 'react';
import PropTypes from 'prop-types';
import UpdateLog from '../updateLog';
import step1 from './step-1.png';
import step2 from './step-2.png';
import step3 from './step-3.png';
import './style.less';

const BottomLine = ({ right }) => {
  return (
    <div className="bottomLine">
      <UpdateLog />
      <div className="bt-center">
        <img src={step1} alt="step1" />
        <i className="text">1.选择软件</i>
        <i className="iconfont icon-youjiantou" />
        <img src={step2} alt="step2" />
        <i className="text">2.上传数据</i>
        <i className="iconfont icon-youjiantou" />
        <img src={step3} alt="step3" />
        <i className="text">
          3.旧账迁移
          <br />
          (请登录诺诺云财税系统）
        </i>
      </div>
      {right()}
    </div>
  );
};

BottomLine.defaultProps = {
  right: () => {},
};

BottomLine.propTypes = {
  right: PropTypes.func,
};

export default BottomLine;
