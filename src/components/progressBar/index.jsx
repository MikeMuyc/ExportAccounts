import React from 'react';
import { Modal } from 'antd';
import Progress from './progress';
import style from './style.less';

const Confirm = ({ className, updateSpeed, ...rest }) => {
  const modals = Modal.confirm({
    width: 360,
    centered: true,
    icon: null,
    title: null,
    cancelButtonProps: {
      style: { display: 'none' },
    },
    okButtonProps: {
      style: { display: 'none' },
    },
    content: null,
    ...rest,
    className: `${style['ui-ant-modal-progress']} ${className}`,
  });
  modals.hide = () => {
    modals.destroy();
  };
  modals.update({
    content: <Progress updateSpeed={updateSpeed} modals={modals} />,
  });
};

export default Confirm;
