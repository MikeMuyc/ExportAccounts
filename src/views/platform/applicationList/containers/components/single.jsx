import React from 'react';
import './style.less';
import PropTypes from 'prop-types';

const Single = ({ title }) => {
  return (
    <div className="myIcon-single" title={title}>
      单
    </div>
  );
};
Single.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Single;
