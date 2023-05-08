import React, { Suspense, lazy, useEffect } from 'react';
import { ConfigProvider, message } from 'antd';
import Loading from '@components/loading';
import Layout from '@components/layout';
import NotFound from '@components/not-found';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import router from '@config/router';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const { loading } = useSelector((state) => state.user.state);
  const dispatch = useDispatch();
  useEffect(() => {
    ClientAPI.getUserInfo()
      .then((result) => {
        if (result.data) {
          dispatch({
            type: 'user/setState',
            payload: {
              user: result.data,
            },
          });
        }
      })
      .catch((result) => {
        message.error(result.msg || '获取用户信息失败');
      });
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter hashPrefix="#!">
        <Layout>
          <Suspense fallback={<Loading />}>
            <Loading spinning={loading}>
              <Switch>
                <Redirect exact from="/" to="/helper/sign-in" />
                <Redirect exact from="/helper" to="/helper/sign-in" />
                {router.map(({ key, loader, path, ...rest }) => {
                  return (
                    <Route component={lazy(loader)} key={`${path}`} path={`${path}`} {...rest} />
                  );
                })}
                <Route component={NotFound} path="*" />
              </Switch>
            </Loading>
          </Suspense>
        </Layout>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
