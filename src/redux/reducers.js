const defaultState = {
  state: {
    loading: false,
    serviceUrl: 'http://cloud.jss.com.cn',
    accountListData: [],
  },
  user: {},
};

export default {
  user: (state = defaultState, { type, payload }) => {
    switch (type) {
      case 'user/setState':
        return {
          ...state,
          ...payload,
        };
      case 'user/remove':
        return null;
      default:
        return state;
    }
  },
};
