import React, { useRef, useState, useEffect } from 'react';
import { Button, Checkbox, Modal, Icon } from 'antd';
import PropTypes from 'prop-types';
import './style.less';

const { confirm } = Modal;
const AutoRefresh = ({
  durationNum,
  spaceNum,
  refresh,
  openTypeTime,
  openRef,
  style,
  className,
  isCheck,
  setIsCheck,
  ...rest
}) => {
  const defTime = {
    duration: +durationNum,
    space: +spaceNum,
    // duration: 20,
    // space: 5,
  };
  const openRefs = openRef;
  const timeRef = useRef({
    duration: defTime.duration, // 默认30分钟倒计时 1800秒
    space: defTime.space, // 默认刷新频率是15秒
    durationTimeRef: null,
    spaceTimeRef: null,
  });
  // const [isCheck, setIsCheck] = useState(false);
  const [space, setSpace] = useState(timeRef.current.space);
  // 清除所有定时器和关闭自动刷新（关闭自动刷新）
  const clearTime = () => {
    timeRef.current.space = defTime.space;
    setSpace(timeRef.current.space);
    setIsCheck(false);
    clearInterval(timeRef.current.spaceTimeRef);
    clearInterval(timeRef.current.durationTimeRef);
  };
  // 开始轮询
  const spaceRefresh = (num) => {
    clearInterval(timeRef.current.spaceTimeRef);
    const testNum = num || 0;
    timeRef.current.spaceTimeRef = setInterval(() => {
      timeRef.current.space -= 1;
      if (timeRef.current.space === 0) {
        clearInterval(timeRef.current.spaceTimeRef);
        refresh(() => {
          timeRef.current.space = defTime.space;
          setSpace(timeRef.current.space);
          if (!timeRef.current.durationTimeRef) {
            setIsCheck(false);
          } else {
            spaceRefresh(testNum + 1);
          }
        }, testNum);
      }
      setSpace(timeRef.current.space);
    }, 1000);
  };
  // 开启自动刷新
  const openAutoRefresh = () => {
    if (isCheck === false) {
      setIsCheck(true);
    }
    clearInterval(timeRef.current.durationTimeRef);
    spaceRefresh();
    timeRef.current.durationTimeRef = setInterval(() => {
      if (timeRef.current.duration > 0) {
        timeRef.current.duration -= 10;
      } else {
        timeRef.current.duration = defTime.duration;
        clearInterval(timeRef.current.durationTimeRef);
        timeRef.current.durationTimeRef = null;
      }
    }, 10000);
  };
  const onClick = () => {
    if (isCheck) {
      clearTime();
    }
    refresh();
  };
  const onChange = (e) => {
    if (e.target.checked) {
      confirm({
        title: <div>自动刷新时长为30分钟，是否确定？</div>,
        icon: <Icon type="exclamation-circle" style={{ color: '#F6A327' }} />,
        width: 280,
        onOk() {
          openAutoRefresh();
        },
      });
    } else {
      clearTime();
    }
  };
  const onOpenAutoRefresh = () => {
    if (!timeRef.current.durationTimeRef) {
      openAutoRefresh();
    }
  };
  useEffect(() => {
    if (openTypeTime) {
      onOpenAutoRefresh();
    }
  }, [openTypeTime]);
  useEffect(() => {
    openRefs.current = {
      open: onOpenAutoRefresh,
    };
    return () => {
      clearTime();
    };
  }, []);
  useEffect(() => {
    if (!isCheck) {
      clearTime();
    }
  }, [isCheck]);
  return (
    <div className={`ui-refresh-div ${className}`} style={style}>
      <Button {...rest} type="primary" ghost={!!isCheck} onClick={onClick}>
        {isCheck ? `${space}秒` : '刷新状态'}
      </Button>
      <Checkbox onChange={onChange} checked={isCheck}>
        自动刷新
      </Checkbox>
    </div>
  );
};

AutoRefresh.defaultProps = {
  refresh: () => {},
  openTypeTime: '',
  openRef: {
    current: {},
  },
  style: {},
  className: '',
  durationNum: 1800,
  spaceNum: 15,
};

AutoRefresh.propTypes = {
  refresh: PropTypes.func,
  openTypeTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  openRef: PropTypes.objectOf(PropTypes.any),
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  durationNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spaceNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isCheck: PropTypes.bool.isRequired,
  setIsCheck: PropTypes.func.isRequired,
};
export default AutoRefresh;
