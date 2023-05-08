import React from 'react';
import PropTypes from 'prop-types';
import Progress from './progress';
import './style.less';

const SaasLoading = ({ maxPercent, stepName }) => {
  return (
    <div className="sass-loading-content">
      <div className="title">{stepName || `登录中`}...</div>
      <div className="loadingBar">
        <Progress maxPercent={maxPercent} />
      </div>
      <div className="info">
        当前 <i>{stepName || `登录中`}</i>，请耐心等待...
      </div>
    </div>
  );
};

SaasLoading.propTypes = {
  maxPercent: PropTypes.number.isRequired,
  stepName: PropTypes.string.isRequired,
};
export default SaasLoading;
