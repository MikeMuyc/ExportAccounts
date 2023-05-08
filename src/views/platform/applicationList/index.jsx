import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '@components/loading';
import './redux/reducer';
import Layout from './containers/layout';

export default () => {
  const { loading, tip } = useSelector((state) => state.applicationList);
  return (
    <Loading spinning={loading} tip={tip}>
      <Layout />
    </Loading>
  );
};
