import { addReducer } from '@redux';

const nameSpace = 'signIn';
const defaultState = {
  loading: false,
  userNameList: [],
  remember: false,
};

const signIn = (state = defaultState, action = {}) => {
  const { payload = {} } = action;
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
addReducer({ signIn });
