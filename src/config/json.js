export default () => {
  return {
    getInitData(callback) {
      const data = {
        result: 'success',
        msg: '登录成功',
        serviceUrl: 'http://cloud.jss.com.cn',
        userList: '13666666666,13111111111,13222222222,13333333333', // 历史用户名
      };
      callback(data);
    },
    datUpLoad(datas, callback) {
      const data = {
        result: 'success',
        msg: '保存成功',
        checkResult:
          '发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元发票总计X张（包含收购发票X张），金额XXX元，税额XXX元，有效税额XXX元，价税合计XXX元',
      };
      setTimeout(() => {
        callback(data);
      }, 1000);

      return false;
    },
    chooseFile(datas, callback) {
      const data = {
        result: 'success',
        msg: '保存成功',
        address: '这是我的地址',
      };
      setTimeout(() => {
        callback(data);
      }, 3000);
      return false;
    },
    saveUserList(datas, callback) {
      const data = {
        result: 'success',
        msg: '保存成功',
      };
      callback(data);
      return false;
    },
    login(datas, callback) {
      const data = {
        result: 'success',
        msg: '登录成功',
        datas: {
          // versionType: '1',
          maxAccountNumber: '1000',
          userAccountNumber: '500',
        },
      };
      // setTimeout(()=>{
      callback(data);
      // },2000)
    },
    // 获取企业列表
    getCompanyInfo(callback) {
      const list = [];
      for (let i = 0; i < 22; i++) {
        list.push({
          companyId: i.toString(),
          companyName: `这是企业这是企业这是企业这是企业这是企业这是企业这是企业这是企业这是企业这是企业${
            i + 1
          }`,
        });
      }
      const data = {
        result: 'success',
        msg: '保存成功',
        data: {
          list,
        },
      };
      callback(data);
      return false;
    },
    // 选择企业
    getCompanyId(datas, callback) {
      const data = {
        result: 'success',
        msg: '保存成功',
      };
      callback(data);
      return false;
    },
    setTypeSelect(datas, callback) {
      const data = {
        result: 'success',
        msg: '登录成功',
        datas: {
          maxAccountNumber: '1000',
          userAccountNumber: '500',
        },
      };
      if (callback) {
        callback(data);
      }
    },
    // 获取账套数
    getNumberOfAccountSets(callback) {
      const data = {
        result: 'success',
        msg: '登录成功',
        datas: {
          maxAccountNumber: '1000',
          userAccountNumber: '500',
        },
      };
      setTimeout(() => {
        callback(data);
      }, 2000);
    },
    getUserInfo(callback) {
      const data = {
        result: 'success',
        msg: '获取系统信息',
        data: {
          version: '2.0.0.1',
          userName:
            '小明是个大坏蛋，你知道吗？不知道，那你去问问大家。什么你问过了，都说我是大坏蛋？？？',
          companyName: '诺诺',
          accountName: '18814885555',
        },
      };
      setTimeout(() => {
        callback(data);
      }, 2000);
    },
    AllType(callback) {
      // 第一步 （返回软件类型）
      const list = [];
      for (let i = 1; i <= 8; i++) {
        const item = {
          name: `金蝶${i}`,
          id: i.toString(),
        };
        const arr = [];
        for (let j = 1; j < 100; j++) {
          arr.push({
            appid: i.toString(),
            typeid: Math.random() * 2 > 1 ? '1' : '0', // (0是sql server，非是access)
            value: j.toString(),
            name: `金蝶金蝶金蝶金蝶金蝶金蝶金蝶金金蝶${i}-${j}`,
            isContinuous: j % 2 === 1 ? '1' : '0', // 是否连续，1为连续，0为不连续
            isOpenEXE: j % 2 === 1 ? 1 : 0, // 是否另外启动导账1.0客户端，1为启动，0为不启动（若启动导账1.0客户端，先弹窗，提示"该系列必须使用导账取数，点击"确定"打开导账1.0客户端"，用户点击确定后再调用Connect接口）
            isSaaS: j % 2 === 1 ? '1' : '0', // 1是，0否，是否是saas版本
            isNewVersion: j % 4 === 1 ? '1' : '0',
            isSingleLogin: j % 3 === 1 ? '1' : '0',
            bAsset: j % 5 === 1 ? '1' : '0',
            loginParams: [
              {
                text: '登录账号',
                name: 'username',
              },
              {
                text: '登录密码',
                name: 'password',
              },
            ],
            loginLink: Math.random() * 2 > 1 ? 'http://www.hao123.com' : 'http://www.baidu.com',
          });
        }
        // arr.push({
        //   appid: 98888888888,
        //   typeid: '123',
        //   name: 'azptERW',
        //   value: '123123',
        // });
        item.list = arr;
        list.push(item);
      }
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        list,
      };
      // setTimeout(()=>{
      callback(data);
      // },2000)
    },
    getSaaS(datas, callback) {
      const query = JSON.parse(datas);
      const data = {
        result: 'success',
        list: [
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3GGGbAA', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '武陵瑞源gggddd', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
        ],
        accountDetailList: [
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套1', // 账套名称
            catchStatus: '1', // 抽取状态
            uploadStatus: '2', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '3', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            name: '测试账套3', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '0', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
        ],
        percentage: 22,
        loginStatus: `doing`,
        msg: `验证账号密码`,
      };
      if (query.testNum > 3 && query.testNum <= 4) {
        data.loginStatus = `doing`;
        data.percentage = 31;
        data.msg = `验证账号密码`;
      } else if (query.testNum > 4 && query.testNum <= 5) {
        data.loginStatus = `doing`;
        data.percentage = 69;
        data.msg = `识别验证码`;
      } else if (query.testNum >= 6) {
        data.loginStatus = `success`;
        data.percentage = 100;
        data.msg = `登录成功`;
      }
      callback(data);
      return false;
    },
    SaaSUpload(datas, callback) {
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        list: [
          {
            accId: '1', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            accName: '测试账套1', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
          {
            accId: '2', // 账套唯一标识，界面不展示，上传账套时回传给客户端，界面上的账套号由前端自行排序展示！
            accName: '测试账套2', // 账套名称
            catchStatus: '抽取中', // 抽取状态
            uploadStatus: '-1', // 上传状态
            uploadTime: '2099-13-32', // 上传时间
            uploadResult: '上传成功', // 上传结果
          },
        ],
      };
      callback(data);
      return false;
    },
    SetAddress(datas, callback) {
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        address: '', // 工作组文件路径或数据库路径
      };
      callback(data);
      return false;
    },
    Connect(datas, callback) {
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        server: '1', // 服务器名或工作组文件地址
        instance: '', // 实例名或数据目录
        port: '1233', // 端口号
        name: '', // 登录名
        password: '', // 密码
      };
      callback(data);
      return false;
    },
    getInstanse(datas, callback) {
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        list: [
          {
            name: 'LSH/BM1', // 实例名
            address: '192.168.1.1', // ip地址
            port: '1443', // 端口号
          },
          {
            name: 'LSH/BM2', // 实例名
            address: '192.168.1.1', // ip地址
            port: '1443', // 端口号
          },
          {
            name: 'LSH/BM3', // 实例名
            address: '192.168.1.1', // ip地址
            port: '1443', // 端口号
          },
        ],
      };
      callback(data);
      return false;
    },
    OpenDir(datas, callback) {
      const data = {
        msg: '服务器连接成功',
        result: 'success',
      };
      callback(data);
      return false;
    },
    getUpdateLog(callback) {
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        datas: [
          {
            date: '2020-09-30',
            dateId: '20200930',
            list: [
              {
                cid: '1',
                detail:
                  '优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能优化XX功能',
                typeName: 'bug优化',
              },
              {
                cid: '2',
                detail: '解决XXbug',
                typeName: '优化功能',
              },
            ],
          },
          {
            date: '2020-10-30',
            dateId: '20201030',
            list: [
              {
                cid: '1',
                detail: '优化XX功能',
                typeName: '优化功能',
              },
              {
                cid: '2',
                detail: '解决XXbug',
                typeName: 'bug优化',
              },
            ],
          },
        ],
      };

      setTimeout(() => {
        callback(data);
      });
      return false;
    },
    fileUpload(datas, callback) {
      const data = {
        name: '深圳伟达财务', // 账套名称
        checkResult: '账套上传成功！', // 账套上传结果
        accId: '1', // 账套编号
        resultStatus: '0', // 状态码，1为上传成功，非1为上传失败，红字标出上传结果
        msg: '服务器连接成功',
        result: 'success',
      };
      setTimeout(() => {
        callback(data);
      }, 1000);
      return false;
    },
    dataExport(datas, callback) {
      let data = {};
      // if (['1', '2', '3'].includes(datas.accId)) {
      //   data = {
      //     list: null,
      //     msg: "数据抽取失败",
      //     result: "error",
      //   }
      // } else {
      data = {
        checkResult: '数据无误,可以上传建账11111', // 数据抽取结果
        resultStatus: '0', // 状态码,1为抽取成功，非1为抽取失败，不再调用fileUpload,红字标出抽取结果
        name: '深圳伟达财务', // 账套名称
        accId: '1', // 账套编号
        msg: '服务器连接成功',
        result: 'success',
      };
      // }
      setTimeout(() => {
        callback(data);
      }, 1000);

      return false;
    },
    LinkDB(datas, callback) {
      const data = {
        result: 'success',
        msg: '服务器连接成功1',
        list: [
          {
            FDataBase: 'AIS20180616130449', // 数据库名称
            IsUpload: '0', // 是否已经建账,（去掉不传！！）
            accId: '1', // 账套id
            name: '金蝶大账套2007', // 账套名称"
            yearType: '0', // 年份类型，0为近1 年，1为近4年，2位全部年度
          },
          {
            FDataBase: 'AIS20191126053825',
            IsUpload: '0',
            accId: '2',
            name: '深圳伟达财务',
            yearType: '1',
          },
          {
            FDataBase: 'AIS20190619160957',
            IsUpload: '0',
            accId: '3',
            name: '浙江淘卡网络技术有限公司备份',
            yearType: '0',
          },
          {
            FDataBase: 'AIS20190622083021',
            IsUpload: '0',
            accId: '4',
            name: '浙江淘卡网络技术有限公司2016年',
            yearType: '2',
          },
          {
            FDataBase: 'AIS20190624155722',
            IsUpload: '0',
            accId: '5',
            name: '浙江淘卡网络技术有限公司2016年',
            yearType: '0',
          },
          {
            FDataBase: 'AIS20190624155840',
            IsUpload: '0',
            accId: '6',
            name: '浙江淘卡网络技术有限公司',
            yearType: '1',
          },
          {
            FDataBase: 'AIS20190624155938',
            IsUpload: '0',
            accId: '7',
            name: '浙江淘卡网络技术有限公司备份',
            yearType: '2',
          },
          {
            FDataBase: 'AIS20190625113720',
            IsUpload: '0',
            accId: '8',
            name: '浙江淘卡网络技术有限公司2016-2018',
            yearType: '0',
          },
          {
            FDataBase: 'AIS20190805153003',
            IsUpload: '0',
            accId: '9',
            name: '锐展',
            yearType: '1',
          },
          {
            FDataBase: 'AIS20161212032229',
            IsUpload: '0',
            accId: '10',
            name: 'bmtest0521',
            yearType: '2',
          },
        ],
      };
      // setTimeout(()=>{
      callback(data);
      // }, 2000)
    },
    ZTList(callback) {
      const list = [];
      for (let i = 0; i < 100; i++) {
        list.push({
          accId: i,
          IsUpload: i < 20 ? '1' : '0', // 是否已建账，1表示已建账，0表示未建账
          name: `KIS演示账套（企业）${i + 1}`,
        });
      }
      const data = {
        result: 'success',
        msg: '获取账套列表成功',
        list,
      };
      // setTimeout(()=>{
      callback(data);
      // }, 2000)
    },
    getAccountList(datas, callback) {
      const list = [];
      for (let i = 0; i < 600; i++) {
        list.push({
          accId: i,
          IsUpload: i < 300 ? '1' : '0', // 是否已建账，1表示已建账，0表示未建账
          name: `KIS演示账套（企业）${i}`,
        });
      }
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        list,
      };
      // setTimeout(()=>{
      callback(data);
      // }, 2000)
    },
    KJDY(datas, callback) {
      const list = [];
      for (let i = 1; i <= 20; i++) {
        list.push({
          code: i.toString(),
          sum: `浙江诺诺网络科技有限公司${i}`, // 账套数量/名称
          local: '小企业会计准则', // 本地会计制度
          level: '4-2-2-2', // 科目级次
          type: '5类', // 科目类型
          resultStatus: Math.random() * 2 > 1 ? 1 : 0, // 1是正常，0是有错误
          checkResult: '错误错误错误', // 错误信息
          accounting: {
            id: i.toString(),
            name: `云记账会计制度${Math.random() * 2 > 1 ? '2' : '1'}`, // 默认云记账会计制度
          },
          isFinish: '1', // 0未完成，1已完成
        });
      }
      const accountingList = [];
      for (let i = 1; i < 100; i++) {
        accountingList.push({
          id: i.toString(),
          name: `会计制度ABCdef${i}`,
        });
      }
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        accountingList,
        list,
      };
      // setTimeout(()=>{
      callback(data);
      // }, 2000)
    },
    SetDatFilePath(callback) {
      const data = {
        result: 'success',
        msg: '选择路径成功',
        path: 'D:/workSpace/财税助手源码/进项接口/bin/Debug', // 导出路径
      };
      callback(data);
    },
    OutPutDatFile(data, callback) {
      const list = [];
      for (let i = 1; i <= 50; i++) {
        list.push({
          checkResult: Math.random() * 2 > 1 ? '1' : '0',
          resultStatus: '导出结果啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
          accId: i,
          FName: '浙江小叶子公司啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        });
      }
      const datas = {
        result: 'success',
        msg: '成功获取导出文件夹路径',
        list,
      };
      setTimeout(() => {
        callback(datas);
      }, 1000);
    },
    OutPutErrExcel(datas, callback) {
      const data = {
        result: 'success',
        msg: '导出成功',
      };
      callback(data);
    },
    saveCorrespondence(datas, callback) {
      const data = {
        result: 'success',
        msg: '服务器连接成功',
      };
      callback(data);
    },
    getSubjectProofList(datas, callback) {
      // 获取科目匹配界面的数据
      const mateList = [];
      for (let i = 1; i <= 100; i++) {
        mateList.push({
          leftName: `存现金库存现金${i}`,
          leftCode: `100${i}`,
          rightName: `现金${i}`,
          rightCode: '',
          level: i,
          index: i - 1,
        });
      }
      const subjectList = [];
      for (let i = 1; i <= 200; i++) {
        subjectList.push({
          Name: `现金Ab${i}`,
          Code: `100${i}`,
        });
      }
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        mateList,
        subjectList,
        total: 2000,
      };
      // setTimeout(()=>{
      callback(data);
      // },2000)
    },
    newSuperiorSubject(datas, callback) {
      // 转至下级科目
      const data = {
        result: 'success',
        msg: '服务器连接成功',
        mateList: [
          {
            index: '0',
            leftName: '库存现金1',
            leftCode: '1001',
            rightName: '现金1',
            rightCode: '1001',
            level: '1',
          },
          {
            index: '1',
            leftName: '库存现金2',
            leftCode: '1002',
            rightName: '现金2',
            rightCode: '1002',
            level: '2',
          },
          {
            index: '2',
            leftName: '库存现金3',
            leftCode: '1003',
            rightName: '现金3',
            rightCode: '1003',
            level: '3',
          },
        ],
        subjectList: [
          {
            Name: '现金1',
            Code: '1001',
          },
          {
            Name: '现金2',
            Code: '1002',
          },
          {
            Name: '现金3',
            Code: '1003',
          },
          {
            Name: '现金4',
            Code: '1004',
          },
          {
            Name: '现金5',
            Code: '1005',
          },
        ],
      };
      // setTimeout(()=>{
      callback(data);
      // },2000)
    },
    saveMatchResult(datas, callback) {
      // 保存匹配结果
      const data = {
        result: 'success',
        msg: '保存成功',
      };
      callback(data);
    },
    saveOperationRecord(datas, callback) {
      // 保存操作记录
      const data = {
        result: 'success',
        msg: '保存成功',
      };
      callback(data);
    },
    getDataConversionResult(callback) {
      // 获取数据检查结果列表
      const dataList = [];
      const accountingList = [];
      const clientNameList = [];
      for (let i = 1; i <= 100; i++) {
        dataList.push({
          index: (i - 1).toString(),
          accId: i.toString(), // 账套ID
          accName: `浙江诺诺网络科技${i}`, // 账套名称
          checkResult:
            i % 2 === 0 ? '数据错误，您的数据存在XXXXX错误。' : '数据无误，可以上传建账。', // 检查结果
          resultStatus: i % 2 === 0 ? '2' : '0', // 0是可上传且数据无误，1是可上传但数据有误, 2是不可上传
          accounting: Math.random() * 2 > 1 ? 'a001' : 'a002', // 记账会计
          clientName: Math.random() * 2 > 1 ? 'c001' : 'c002', // 客户名称匹配
          uploadStatus: '0', // 上传状态：0是未上传，1是上传成功，2是上传失败
        });
        accountingList.push({
          actId: `a00${i}`,
          actName: `会计a00${i}`,
        });
        clientNameList.push({
          clientId: `c00${i}`,
          clientName: `客户c00${i}`,
          status: Math.random() * 2 > 1 ? '1' : '0', // 代帐版客户服务状态：0合作中，1已解约
          isCreate: Math.random() * 2 > 1 ? '1' : '0', // 是否已建账：0已建账 1未建账
        });
      }
      const data = {
        result: 'success',
        msg: '请求成功',
        dataList,
        accountingList,
        clientNameList,
      };
      callback(data);
    },
    getCustomerNameList(callback) {
      // 获取科目名称列表
      const clientNameList = [];
      for (let i = 1; i <= 100; i++) {
        clientNameList.push({
          clientId: `c00${i}`,
          clientName: `客户c00${i}`,
          status: Math.random() * 2 > 1 ? '1' : '0', // 代帐版客户服务状态：0合作中，1已解约
          isCreate: Math.random() * 2 > 1 ? '1' : '0', // 是否已建账：0已建账 1未建账
        });
      }
      const data = {
        result: 'success',
        msg: '请求成功',
        clientNameList,
      };
      callback(data);
    },
    dataCheck(datas, callback) {
      const selectedRows = [];
      for (let i = 1; i <= 100; i++) {
        selectedRows.push({
          index: (i - 1).toString(),
          accId: i.toString(), // 账套ID
          accName: `浙江诺诺网络科技${i}`, // 账套名称
          checkResult:
            i % 2 === 0 ? '数据错误，您的数据存在XXXXX错误。' : '数据无误，可以上传建账。', // 检查结果
          resultStatus: i % 2 === 0 ? '2' : '0', // 0是可上传且数据无误，1是可上传但数据有误, 2是不可上传
          accounting: Math.random() * 2 > 1 ? 'a001' : 'a002', // 记账会计
          clientName: Math.random() * 2 > 1 ? 'c001' : 'c002', // 客户名称匹配
          uploadStatus: '0', // 上传状态：0是未上传，1是上传成功，2是上传失败
        });
      }
      const data = {
        result: 'success',
        msg: '检查完毕',
        selectedRows,
      };
      // setTimeout(()=>{
      callback(data);
      // }, 2000)
    },
    uploadAccounting(datas, callback) {
      const data1 = {
        result: 'success',
        msg: '上传建账成功',
      };
      const data2 = {
        result: 'error',
        msg: '上传建账失败了，XXXX',
      };
      // setTimeout(()=>{
      callback(Math.random() * 2 > 1 ? data1 : data2);
      // }, 10000)
    },
    exportExel(datas, callback) {
      const data = {
        result: 'success',
        msg: '导出成功',
      };
      callback(data);
    },
    close() {
      // 关闭
      console.log('关闭');
    },
    min() {
      // 最小化
      console.log('最小化');
    },
    openUrl(datas) {
      window.open(datas, `_blank`);
    },
    getfileAddress(callback) {
      const data = {
        result: 'success',
        msg: '',
        path: 'http://www.baidu.com',
      };
      callback(data);
      return false;
    },
  };
};
