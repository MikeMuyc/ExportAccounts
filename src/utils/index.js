import req from '../config/req';

const createRequest = (services = {}) => {
  const requests = {};
  Object.entries(services).forEach((item) => {
    const [name, urlAndType] = item;
    if (typeof urlAndType === 'function') {
      requests[name] = (_, options = {}) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const mockData = urlAndType();
            if (`${mockData.status}` === '200') {
              resolve(mockData.data);
            } else {
              reject(mockData);
            }
          }, options.delay || 500);
        });
      return;
    }

    const [url, initType] = urlAndType.split(/:([a-zA-Z]+)$/);
    const type = initType || 'get';

    requests[name] = async (data = {}, options = {}) => {
      const { loading, returnAll, ...otherOptions } = options;
      if (loading) {
        // store.dispatch({
        //   type: 'account/_updateLoading',
        //   payload: {
        //     loading,
        //   },
        // });
      }

      let res = null;
      let errRes = null;
      res = await req({ url, data, type, ...otherOptions })
        .catch((err) => {
          errRes = err;
        })
        .finally(() => {
          if (loading) {
            // store.dispatch({
            //   type: 'account/_updateLoading',
            //   payload: {
            //     loading: false,
            //   },
            // });
          }
        });
      if (errRes) {
        return Promise.reject(errRes || '请求失败');
      }
      return returnAll ? res : res?.data;
    };
  });

  return requests;
};

const ss = 123;
export { createRequest, ss };
