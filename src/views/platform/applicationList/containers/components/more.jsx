import React from 'react';
import './style.less';
import PropTypes from 'prop-types';

const More = ({ title }) => {
  return (
    <div className="myIcon-more" title={title}>
      多
    </div>
  );
};
More.propTypes = {
  title: PropTypes.string.isRequired,
};
export default More;
