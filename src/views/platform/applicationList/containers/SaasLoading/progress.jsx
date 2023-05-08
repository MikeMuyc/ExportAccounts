import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import PropTypes from 'prop-types';
import './style.less';

const ProgressStep = ({ maxPercent }) => {
  const [percent, setPercents] = useState(0);
  const [timer, setTimer] = useState(null);

  const setProgress = (num, maxp) => {
    const val = percent > num ? percent : num;
    if (maxp >= 100 || val >= 100) {
      clearTimeout(timer);
      setPercents(100);
      setTimer(null);
      return;
    }
    if (val < maxp) {
      setTimer(
        setTimeout(() => {
          setPercents(val + 1);
          if (val + 1 < maxp) {
            setProgress(val + 1, maxp);
          }
        }, 50),
      );
    }
  };
  useEffect(() => {
    if (maxPercent >= 0 && maxPercent < 100) {
      setProgress(percent, maxPercent);
    } else {
      setPercents(100);
    }
    return () => {
      clearTimeout(timer);
      setTimer(null);
    };
  }, [maxPercent]);
  return <Progress percent={percent} />;
};

ProgressStep.propTypes = {
  maxPercent: PropTypes.number.isRequired,
};
export default ProgressStep;
