import { addReducer } from '@redux';

const nameSpace = 'applicationList';
const defaultState = {
  loading: false,
  tip: '加载中...',
};

const applicationList = (state = defaultState, action = {}) => {
  const { payload = {} } = action;
  switch (action.type) {
    case `${nameSpace}/setState`:
      // 存储
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
addReducer({ applicationList });
