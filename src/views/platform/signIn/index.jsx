import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '@components/loading';
import './redux/reducer';
import Layout from './containers/layout';

export default () => {
  const { loading } = useSelector((state) => state.signIn);
  return (
    <Loading spinning={loading}>
      <Layout />
    </Loading>
  );
};
