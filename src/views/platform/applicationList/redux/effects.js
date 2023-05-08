import store from '@redux';

const { dispatch } = store;
export default {
  // 获取列表
  setAccountList(payload) {
    dispatch({
      type: 'user/setState',
      payload,
    });
  },
  setLoadingObj(bool = false, tip) {
    dispatch({
      type: 'applicationList/setState',
      payload: {
        loading: bool,
        tip: tip || '加载中...',
      },
    });
  },
};
