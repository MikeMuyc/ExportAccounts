import store from '@redux';

const { dispatch } = store;
export default {
  // // 获取列表
  // async getList() {
  //   const queryVal = JSON.parse(localStorage.getItem(`queryVal`));
  //   const { loginParams, isSaas, name } = queryVal;
  //   // console.log(loginParams, isSaas, name, dispatch);
  //   let dataList = [];
  //   if (isSaas) {
  //     const { list } = await ClientAPI.getSaaS(JSON.stringify(queryVal));
  //     dataList = list;
  //   } else {
  //     const { list } = await ClientAPI.LinkDB(JSON.stringify(loginParams));
  //     dataList = list;
  //   }
  //   return { name, dataList, isSaas };
  // },
  setState(payload) {
    dispatch({
      type: 'accountList/setState',
      payload,
    });
  },
  setMainLoading(loading = false, tip) {
    const payload = {
      loading,
      tip: tip || '加载中...',
    };
    this.setState(payload);
  },
};
