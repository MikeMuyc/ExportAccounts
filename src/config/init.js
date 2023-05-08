import json from './json';

export default () => {
  // 初始化客户端API  GuideToCloud
  const GuideToCloud = window.GuideToCloud || json();
  const GuideToCloudApis = Object.getOwnPropertyNames(GuideToCloud);
  window.ClientAPI = { version: '1.0' };
  GuideToCloudApis.forEach((functionName) => {
    window.ClientAPI[functionName] = new Proxy(GuideToCloud[functionName], {
      apply(target, context, argument) {
        return new Promise((resolve, reject) => {
          console.log(`invoke GuideToCloud.${functionName} with params:`, ...argument);
          Reflect.apply(target, context, [
            ...argument,
            (dataFromClient) => {
              console.info(`GuideToCloud.${functionName} returns with data:`, dataFromClient);
              if (dataFromClient.result && dataFromClient.result === 'success') {
                resolve(dataFromClient);
              } else {
                reject(dataFromClient);
              }
            },
          ]);
        });
      },
    });
  });
};
