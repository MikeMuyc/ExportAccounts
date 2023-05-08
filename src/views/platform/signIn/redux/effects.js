import store from '@redux';

const { dispatch } = store;
export default {
  // 获取列表
  async getList() {
    const { serviceUrl } = await ClientAPI.getInitData();
    const userNameList = JSON.parse(localStorage.getItem(`userNameList`));
    const loginRemember = JSON.parse(localStorage.getItem(`loginRemember`));
    const payload = {};
    if (userNameList) {
      payload.userNameList = userNameList;
    }
    if (loginRemember) {
      payload.remember = loginRemember;
    }
    dispatch({
      type: 'signIn/setState',
      payload,
    });
    return { userNameList, serviceUrl };
  },
  async setState(payload) {
    dispatch({
      type: 'signIn/setState',
      payload,
    });
  },
};
