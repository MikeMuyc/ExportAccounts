import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '@components/loading';
import './redux/reducer';
import Layout from './containers/layout';
import effects from './redux/effects';

export default (props) => {
  const { location } = props || {};
  const { loading, tip } = useSelector((state) => state.accountList);
  useEffect(() => {
    if (location?.state) {
      effects.setState(location.state);
    }
  }, []);
  return (
    <Loading spinning={loading} tip={tip}>
      <Layout />
    </Loading>
  );
};
