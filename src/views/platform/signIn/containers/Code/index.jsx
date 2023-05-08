import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Code = forwardRef(({ serviceUrl }, ref) => {
  const [time, setTime] = useState(new Date().getTime());

  const updateCode = () => {
    console.log(serviceUrl);
    setTime(new Date().getTime());
  };

  // componentWillReceiveProps = (nextProps) => {
  //   if (nextProps.loginType !== this.props.loginType) {
  //     this.updateCode()
  //   }
  // };
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  return <img ref={ref} src={`${serviceUrl}?type=2&_=${time}`} onClick={updateCode} alt="验证码" />;
});
Code.propTypes = {
  serviceUrl: PropTypes.string.isRequired,
};
export default Code;
