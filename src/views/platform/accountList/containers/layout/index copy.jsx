import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Checkbox, Icon, message } from 'antd';
import { useHistory } from 'react-router-dom';
import AutoRefresh from '@components/autoRefresh';
import UpdateLog from '../../../applicationList/containers/updateLog';
import effects from '../../redux/effects';
import '../style.less';

export default () => {
  // 搜索内容
  const [searchData, setSearchData] = useState({
    searchName: '',
    uploadStatus: [],
  });
  // 表格复选
  const [rowKey, setRowKey] = useState({
    selectedRowKeys: [],
    selectedRows: [],
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
  });
  // 状态查询
  const [statusQuery] = useState({});
  const [isSaas1, setIsSaas1] = useState('');
  const [curName, setCurName] = useState('');
  const [accountListData, setAccountListData] = useState([]);
  const userData = {
    version: '3.01.2.001',
  };
  const history = useHistory();

  // 表格最大高度
  const [scrollY, setScrollY] = useState(0);
  // 屏幕大小发生变化
  const resize = () => {
    setScrollY(window.innerHeight - 184);
  };

  const columns = () => {
    const ztIdCol = {
      width: 120,
      title: '账套号',
      dataIndex: 'accId',
      align: 'center',
      render: (text) => text,
    };
    const nameCol = {
      width: 300,
      title: '账套名称',
      dataIndex: 'name',
      align: 'center',
    };
    const extractionStatusCol = {
      width: 120,
      title: '抽取',
      dataIndex: 'extractionStatus',
      align: 'center',
      render: (text) => text,
    };
    const uploadStatusCol = {
      width: 120,
      title: '上传',
      dataIndex: 'uploadStatus',
      align: 'center',
      render: (text) => {
        return <em>{text}</em>;
      },
    };
    const remarksCol = {
      width: 180,
      title: '上传结果',
      dataIndex: 'remarks',
      align: 'left',
      render: (text) => text,
    };
    const uploadTimeCol = {
      title: '上传时间',
      width: 100,
      dataIndex: 'uploadTime',
      align: 'left',
    };
    return [ztIdCol, nameCol, extractionStatusCol, uploadStatusCol, uploadTimeCol, remarksCol];
  };
  // 表格复选
  const rowSelection = {
    selectedRowKeys: rowKey.selectedRowKeys,
    width: 60,
    onChange(keys, records) {
      setRowKey({
        selectedRowKeys: keys,
        selectedRows: records,
      });
    },
    getCheckboxProps: (record) => {
      return {
        disabled: !!(statusQuery[record.accId] || {}).remarks,
      };
    },
  };
  // 成功失败筛选
  const onChange = (val) => {
    setSearchData({
      ...searchData,
      uploadStatus: val,
    });
    setRowKey({
      selectedRowKeys: [],
      selectedRows: [],
    });
  };

  // 上传数据
  const uploadData = () => {
    if (rowKey.selectedRows.length <= 0) {
      message.warning('请选择要上传的账套！');
      return;
    }
    const accIdObj = { ...statusQuery };
    rowKey.selectedRowKeys.forEach((key) => {
      accIdObj[key] = {
        extractionStatus: '-1',
        uploadStatus: '-1',
      };
    });
    // states.current = { ...accIdObj };
    // setStatusQuery({ ...accIdObj });
    // setMainLoading(true, '正在上传请稍后...');
    // dataExport();
  };
  const refresh = (data) => {
    // setMainLoading(true, '正在刷新请稍后...');
    const queryVal = JSON.parse(localStorage.getItem(`queryVal`));
    ClientAPI.getSaaS(JSON.stringify({ ...queryVal, ...data }))
      .then((result) => {
        // setMainLoading();
        message.success('刷新成功');
        effects.setAccountList({ accountListData: result.list });
      })
      .catch((result) => {
        // setMainLoading();
        message.error(result.msg || '刷新失败！');
      });
  };
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize, false);
    return () => {
      window.removeEventListener('resize', resize, false);
    };
  }, []);
  useEffect(() => {
    effects.getList().then(({ name, dataList, isSaas }) => {
      setCurName(name);
      setAccountListData(dataList);
      setIsSaas1(isSaas);
    });
  }, []);
  const total = accountListData.length;
  const paginationFooter = {
    ...pagination,
    total,
    pageSizeOptions: ['50', '100', '200', '500'],
    showTotal: () => (
      <span>
        当前页共
        {pagination.current * pagination.pageSize > total
          ? total % pagination.pageSize
          : pagination.pageSize}
        条记录，总共{total}条记录
      </span>
    ),
    showQuickJumper: {
      goButton: (
        <Button style={{ padding: '0 12px', height: '22px', margin: '0 12px' }}>确定</Button>
      ),
    },
    size: 'small',
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      setPagination({
        ...pagination,
        current,
        pageSize,
      });
      setRowKey({
        selectedRowKeys: [],
        selectedRows: [],
      });
    },
    onChange: (current) => {
      setPagination({
        ...pagination,
        current,
      });
      setRowKey({
        selectedRowKeys: [],
        selectedRows: [],
      });
    },
  };
  console.log(scrollY, accountListData);
  return (
    <div className="accountListLayer">
      <div className="headerBG">
        <div className="left">
          <div className="h3">上传数据</div>
          <div className="current">当前以选择： {curName}</div>
        </div>
      </div>
      <div className="listContent">
        <div className="backLine">
          <div className="left">
            <a
              className="uploadData-top-left-a"
              onClick={(e) => {
                e.stopPropagation();
                history.push('/helper/application-list');
              }}
            >
              <Icon type="arrow-left" />
              返回
            </a>
            <Input.Search
              style={{ width: 250, margin: '0 12px' }}
              placeholder="请输入账套名称"
              allowClear
            />
            <Checkbox.Group onChange={onChange} value={searchData.uploadStatus}>
              <Checkbox value="-99">未上传</Checkbox>
              <Checkbox value="1">上传成功</Checkbox>
              <Checkbox value="9">上传失败</Checkbox>
            </Checkbox.Group>
            <AutoRefresh />
          </div>
          <div className="right">
            {isSaas1 && (
              <Button type="primary" style={{ marginRight: '10px' }} ghost onClick={() => refresh}>
                更新列表
              </Button>
            )}
            <Button type="primary" onClick={uploadData}>
              上传数据
            </Button>
          </div>
        </div>
        <div className="tableContent">
          <Table
            bordered
            rowSelection={rowSelection}
            pagination={paginationFooter}
            rowKey="accId"
            dataSource={accountListData}
            scroll={{ y: scrollY }}
            columns={columns()}
          />
        </div>
      </div>
      <div className="bottomLine">
        <UpdateLog userData={userData} />
      </div>
    </div>
  );
};
