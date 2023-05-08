import { addReducer } from '@redux';

const nameSpace = 'accountList';
const defaultState = {
  loading: false,
  tip: '加载中...',
  isSaas: true,
  dataList: [],
  queryVal: {},
  selectObj: {},
};

const accountList = (state = defaultState, action = {}) => {
  const { payload = {} } = action;
  // console.log('payload', payload);
  switch (action.type) {
    case `${nameSpace}/setState`:
      // 存储
      return { ...state, ...payload };
    case `${nameSpace}/resetState`:
      // 还原
      return defaultState;
    default:
      return { ...state };
  }
};
addReducer({ accountList });
