/**
 * iconfont icon 组件
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Icon extends PureComponent {
  render() {
    const { type, code, className, disabled, onClick } = this.props;
    return (
      <i
        onClick={disabled ? undefined : onClick}
        className={classnames('iconfont', type && ` icon${type}`, className, { disabled })}
      >
        {code}
      </i>
    );
  }
}

Icon.defaultProps = {
  disabled: false,
  code: '',
  type: '',
  className: '',
  onClick() {},
};

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  code: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Icon;
