import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import PropTypes from 'prop-types';

const Main = ({ updateSpeed, modals }) => {
  const newModals = modals;
  const [percent, setPercent] = useState(0);
  newModals.setPercent = setPercent;
  useEffect(() => {
    updateSpeed(newModals);
  }, [updateSpeed, newModals]);
  return (
    <div className="content-box">
      <h6 style={{ fontSize: '14px' }}>正在导入...</h6>
      <Progress
        percent={percent}
        status="active"
        showInfo={false}
        strokeWidth={18}
        strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }}
      />
      <p style={{ margin: 0, lineHeight: '25px', paddingTop: '10px', fontSize: '13px' }}>
        当前进度为<span className="rate">{percent}%</span>，请耐心等待！
      </p>
    </div>
  );
};

Main.defaultProps = {
  updateSpeed: () => {},
};

Main.propTypes = {
  updateSpeed: PropTypes.func,
  modals: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Main;
