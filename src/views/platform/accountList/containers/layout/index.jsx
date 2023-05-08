import React, { useState, useEffect, useRef } from 'react';
import { Input, Select, Checkbox, message, Icon, Modal, Table, Button, Progress } from 'antd';
import SaasLoading from '@views/platform/applicationList/containers/SaasLoading';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AutoRefresh from '@components/autoRefresh';
import BottomLine from '@views/components/bottomLine';
import effects from '../../redux/effects';
import '../style.less';

const DatabaseConnection = () => {
  const [isCheck, setIsCheck] = useState(false);
  // 刷新saas软件
  const [saaSLoading, setSaaSLoading] = useState(false);
  const [maxPercent, setMaxPercent] = useState(0);
  const [stepName, setStepName] = useState('刷新中');
  // 自动刷新开启的openRef
  // const openRef = useRef({});
  // 用于线下上传轮询状态变更
  const states = useRef(null);
  const uploadDataTop = useRef(null);
  const [openTypeTime, setOpenTypeTime] = useState();
  const history = useHistory();
  const { isSaas, dataList, queryVal, selectObj } = useSelector((state) => state.accountList);
  const [batchSearchVisible, setBatchSearchVisible] = useState(false);
  // saas刷新状态
  const refresh = (data, cbk, num) => {
    const testNum = num || 0;
    setSaaSLoading(true);
    ClientAPI.getSaaS(JSON.stringify({ ...data, testNum }))
      .then((result) => {
        const { loginStatus, msg, percentage } = result;
        if (loginStatus === `success`) {
          message.success('刷新成功');
          setMaxPercent(100);
          setSaaSLoading(false);
          effects.setState({
            dataList: result.list || [],
          });
          if (cbk) {
            cbk();
          }
          setTimeout(() => {
            setMaxPercent(0);
            setStepName(`刷新中`);
          }, 1000);
        } else if (loginStatus === `fail`) {
          if (cbk) {
            cbk();
          }
          message.error(msg || '刷新失败！');
          setSaaSLoading(false);
          setMaxPercent(0);
          setStepName(`刷新中`);
        } else {
          setTimeout(() => {
            setStepName(msg);
            setMaxPercent(+percentage);
            refresh(data, cbk, testNum + 1);
          }, 1000);
        }
      })
      .catch((result) => {
        if (cbk) {
          cbk();
        }
        message.error(result.msg || '刷新失败！');
        setSaaSLoading(false);
        setMaxPercent(0);
        setStepName(`刷新中`);
      });
  };

  /* const autoRefresh = (data, cbk, testNum) => {
    effects.setMainLoading(true, '正在刷新请稍后...');
    ClientAPI.getSaaS(JSON.stringify({ ...queryVal, ...data, testNum }))
      .then((result) => {
        effects.setMainLoading();
        message.success('刷新成功');
        effects.setState({
          dataList: result.list || [],
        });
        if (cbk) {
          cbk();
        }
      })
      .catch((result) => {
        if (cbk) {
          cbk();
        }
        effects.setMainLoading();
        message.error(result.msg || '刷新失败！');
      });
  }; */
  // 列表数据
  const data = [].concat(dataList);
  // 搜索内容
  const [searchName, setSearchName] = useState('');
  const [uploadStatus, setUploadStatus] = useState([]);
  const [singleSearchName, setSingleSearchName] = useState('');
  const [batchSearchName, setBatchSearchName] = useState('');
  // 上传结果是否显示
  const [modalVisible, setModalVisible] = useState(false);
  // 是否需要显示全部年度
  const [selectKey, setSelectKey] = useState('0');
  // 表格最大高度
  const [scrollY, setScrollY] = useState(0);
  const [tableHeight, setTableHeight] = useState(360);
  // 是否显示全部年度控制
  const [selectFig, setSelectFig] = useState(false);
  // 年度下拉列表是否展开
  const [visible, setVisible] = useState(false);
  // 表格复选
  const [rowKey, setRowKey] = useState({
    selectedRowKeys: [],
    selectedRows: [],
  });
  // 分页
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
  });
  // 状态查询
  const [statusQuery, setStatusQuery] = useState({});

  // 年度列表
  const selectList = [
    {
      name: '当前年度',
      id: '0',
    },
    {
      name: '近四年(含当年)',
      id: '1',
    },
  ];
  // 是否显示全部年度  （内部人员操作 快捷键ctrl + L）
  if (selectFig || selectKey === '3') {
    selectList.push({
      name: '全部年度',
      id: '3',
    });
  }
  // 年度下拉是否展示
  const onDropdownVisibleChange = (e) => {
    setVisible(e);
    setSelectFig(false);
  };
  // 成功失败筛选
  const onChange = (val) => {
    setUploadStatus(val);
    setRowKey({
      selectedRowKeys: [],
      selectedRows: [],
    });
  };
  // 导入年度选择发生变化
  const yearChange = (e) => {
    setSelectKey(e);
    setRowKey({
      selectedRowKeys: [],
      selectedRows: [],
    });
  };

  // 更新线下上传状态
  const setStatusObj = ({ type, accId, resultStatus, checkResult }) => {
    const accIdObj = states.current[accId] || {};
    const upData = { ...states.current, [accId]: { ...accIdObj, [type]: resultStatus } };
    if (checkResult) {
      upData[accId].remarks = checkResult;
    }
    states.current = upData;
    setStatusQuery(states.current);
  };
  // 线下上传
  const fileUpload = (accId, callback) => {
    setStatusObj({
      type: 'uploadStatus',
      accId,
      resultStatus: '0', // 0 = 上传中， 9 = 上传失败， 1 = 上传成功
      checkResult: '',
    });
    ClientAPI.fileUpload(JSON.stringify({ accId }))
      .then((result) => {
        setStatusObj({
          type: 'uploadStatus',
          accId,
          resultStatus: result.resultStatus === '0' ? '1' : '9',
          checkResult: result.checkResult,
        });

        // 上传结束 回调（不管成功失败）
        if (callback) {
          callback(result);
        }
      })
      .catch((result) => {
        setStatusObj({
          type: 'uploadStatus',
          accId,
          resultStatus: '9', // 0 = 上传中， 9 = 上传失败， 1 = 上传成功
          checkResult: result.msg || '上传失败',
        });
        effects.setMainLoading();
        message.error(result.msg || '获取软件类型失败！');
      });
  };

  // 线下抽取并去上传
  const dataExportUpload = (datas, callback) => {
    setStatusObj({
      type: 'extractionStatus',
      accId: datas.accId,
      resultStatus: '0', // 0 = 抽取中 9 = 抽取失败  1 = 抽取成功
      checkResult: '',
    });
    ClientAPI.dataExport(JSON.stringify(datas))
      .then((result) => {
        setStatusObj({
          type: 'extractionStatus',
          accId: datas.accId,
          resultStatus: result.resultStatus === '0' ? '1' : '9',
          checkResult: result.checkResult,
        });
        // 抽取成功 继续调用上传接口
        if (result.resultStatus === '0') {
          fileUpload(datas.accId, (results) => {
            if (callback) {
              callback(results);
            }
          });
        } else {
          setStatusObj({
            type: 'uploadStatus',
            accId: datas.accId,
            resultStatus: '9',
            checkResult: result.checkResult,
          });
          if (callback) {
            callback(result);
          }
        }
      })
      .catch((result) => {
        setStatusObj({
          type: 'extractionStatus',
          accId: datas.accId,
          resultStatus: '9', // 0 = 抽取中 9 = 抽取失败
          checkResult: result.msg || '抽取失败',
        });
        effects.setMainLoading();
        message.error(result.msg || '获取软件类型失败！');
      });
  };

  // 线下批量抽取
  const dataExport = (index = 0) => {
    if (rowKey.selectedRows.length >= index + 1) {
      const currentList = rowKey.selectedRows[index];
      // if (!currentList.accId) {
      //   return;
      // }
      dataExportUpload(
        {
          accId: currentList.accId,
          iYear: selectKey,
        },
        () => {
          // 下一步？
          dataExport(index + 1);
        },
      );
    } else {
      const outPutExcel = rowKey.selectedRows.map((item) => {
        return {
          ...(states.current[item.accId] || {}),
          accId: item.accId,
          name: item.name,
        };
      });

      ClientAPI.outPutExcel(JSON.stringify(outPutExcel));

      setModalVisible(true);
      message.success('本次上传完成！请查看结果');
      effects.setMainLoading();
    }
  };

  // 线上上传
  const onlineUpData = (fig) => {
    if (rowKey.selectedRows.length > 0) {
      if (rowKey.selectedRows.find((val) => [0, 1].includes(+val.catchStatus)) && !fig) {
        Modal.confirm({
          title: '当前选择了正在抽取或已抽取成功的账套，继续操作会重新抽取',
          content: '',
          onOk() {
            onlineUpData(true);
          },
          onCancel() {},
        });
        return;
      }
      effects.setMainLoading(true, '正在上传请稍后...');
      ClientAPI.SaaSUpload(JSON.stringify({ accid: rowKey.selectedRowKeys.join(',') }))
        .then((result) => {
          setRowKey({
            selectedRowKeys: [],
            selectedRows: [],
          });
          effects.setState({
            dataList: result.list || [],
          });
          effects.setMainLoading();
          setTimeout(() => {
            setOpenTypeTime(new Date().getTime());
            // openRef.current.open();
          }, 100);
        })
        .catch((result) => {
          message.error(result.msg || '上传失败！');
          effects.setMainLoading();
        });
    } else {
      message.warning('请选择要上传的账套');
    }
  };

  // 点击上传数据按钮
  const onClick = () => {
    if (rowKey.selectedRows.length <= 0) {
      message.warning('请选择要上传的账套！');
      return;
    }
    if (isSaas) {
      onlineUpData();
    } else {
      const accIdObj = { ...statusQuery };
      rowKey.selectedRowKeys.forEach((key) => {
        accIdObj[key] = {
          extractionStatus: '-1',
          uploadStatus: '-1',
        };
      });
      states.current = { ...accIdObj };
      setStatusQuery({ ...accIdObj });
      effects.setMainLoading(true, '正在上传请稍后...');
      dataExport();
    }
  };
  // 快捷键
  const onKeyDown = (e) => {
    if (e.code === 'KeyL' && e.ctrlKey) {
      console.log(e);
      setSelectFig(true);
      setVisible(true);
      e.preventDefault();
    }
  };
  // 屏幕大小发生变化
  const resize = () => {
    const h = uploadDataTop.current.clientHeight;
    console.log(`clientHeight: `, h);
    // 上传数据栏54  返回栏h 底部步骤栏56 页脚42 表头40
    setScrollY(window.innerHeight - 54 - h - 56 - 42 - 40);
    setTableHeight(window.innerHeight - 54 - h - 56);
  };
  // 执行一次
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown, false);
    resize();
    window.addEventListener('resize', resize, false);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.addEventListener('resize', resize, false);
    };
  }, []);

  // 筛选条件处理获取显示列表
  const newData = data.filter((item) => {
    const reg = /(^\s*)|(\s*$)/g;
    const batchSearch =
      searchName !== '' ? searchName.split(/[,，]/).map((item2) => item2.replace(reg, '')) : [];
    let isName;
    if (batchSearch.length > 0 && item.name) {
      isName = batchSearch.reduce((prev, item1) => {
        if (item.name.toLowerCase().indexOf(item1.toLowerCase()) > -1 && item1 !== '') {
          return true;
        }
        return prev;
      }, false);
    } else {
      isName =
        !searchName ||
        (item.name && item.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
    const isSearchDatta =
      uploadStatus.length <= 0 ||
      (uploadStatus.includes('-99') && !(statusQuery[item.accId] || {}).uploadStatus) ||
      ((statusQuery[item.accId] || {}).uploadStatus &&
        uploadStatus.includes((statusQuery[item.accId] || {}).uploadStatus));
    const isSelectKey =
      (selectKey === '0' && item.yearType === '0') ||
      (selectKey === '1' && (item.yearType === '0' || item.yearType === '1')) ||
      selectKey === '3';
    if (isSaas) {
      const newSearch = uploadStatus.map((v) => {
        if (+v === -99) {
          return '-1';
        }
        if (+v === 1) {
          return '0';
        }
        return '2';
      });
      return isName && (newSearch.includes(item.uploadStatus) || newSearch.length === 0);
    }
    return isName && isSearchDatta && isSelectKey;
  });
  // 数据总量
  const total = newData.length;

  // 线下结果成功数量
  let upSuccess = 0;
  if (modalVisible) {
    upSuccess = rowKey.selectedRowKeys.filter(
      (item) => states.current[item].uploadStatus === '1',
    ).length;
  }
  // 打开文件位置
  const openDir = () => {
    effects.setMainLoading(true, '正在打开目录文件，请稍后...');
    ClientAPI.OpenDir()
      .then(() => {
        effects.setMainLoading();
      })
      .catch((result) => {
        message.error(result.msg || '查找文件失败，请稍后！');
        effects.setMainLoading();
      });
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
  // 获取显示列
  const getCol = () => {
    const ztIdCol = {
      width: 80,
      title: '账套号',
      dataIndex: 'ztId',
      align: 'center',
      render: (text, record, index) => {
        if (isSaas) {
          return index + 1;
        }
        return text;
      },
    };
    const nameCol = {
      width: 280,
      title: '账套名称',
      dataIndex: 'name',
      align: 'left',
    };
    const extractionStatusCol = {
      width: 100,
      title: '抽取',
      dataIndex: 'extractionStatus',
      align: 'center',
      render: (text, record) => {
        if (isSaas) {
          const texts =
            ['未抽取', '抽取成功', '抽取中', '抽取失败'][+record.catchStatus + 1] || '抽取失败';
          if (texts === '抽取中') {
            return <Progress percent={record.catchProcess || 0} />;
          }
          if (texts === '抽取成功') {
            return <i style={{ color: '#64BF00' }}>抽取成功</i>;
          }
          if (texts === '抽取失败') {
            return <i style={{ color: '#F13F3F' }}>抽取失败</i>;
          }
          return texts;
        }
        let extractionStatusText = '';
        const styleName = {};
        if (statusQuery[record.accId]) {
          const { extractionStatus } = statusQuery[record.accId];
          if (extractionStatus === '-1') {
            extractionStatusText = '等待抽取';
          } else if (extractionStatus === '1') {
            styleName.color = '#52c41a';
            extractionStatusText = '抽取成功';
          } else if (extractionStatus === '0') {
            extractionStatusText = '抽取中';
          } else {
            extractionStatusText = '抽取失败';
            styleName.color = '#f5222d';
          }
        }
        return <i style={styleName}>{extractionStatusText}</i>;
        // return (statusQuery[record.accId] || {}).extractionStatus
        // return ['抽取中', '抽取完成', '抽取失败'][text - 1];
      },
    };
    const uploadStatusCol = {
      width: 160,
      title: '上传',
      dataIndex: 'uploadStatus',
      align: 'center',
      render: (text, record) => {
        if (isSaas) {
          const styleName = {};
          if (+record.uploadStatus === 0) {
            styleName.color = '#52c41a';
          } else if (
            +record.uploadStatus === 2 ||
            !record.uploadStatus ||
            +record.uploadStatus > 2 ||
            +record.uploadStatus < -1
          ) {
            styleName.color = '#f5222d';
          }
          return (
            <em style={styleName}>
              {['未上传', '上传成功', '上传中', '上传校验失败，请联系运维人员'][
                +record.uploadStatus + 1
              ] || '上传失败'}
            </em>
          );
        }
        let uploadStatusText = '';
        const styleName = {};
        if (statusQuery[record.accId]) {
          const uploadState = statusQuery[record.accId].uploadStatus;
          if (uploadState === '-1') {
            uploadStatusText = '等待上传';
          } else if (uploadState === '1') {
            uploadStatusText = '上传成功';
            styleName.color = '#52c41a';
          } else if (uploadState === '0') {
            uploadStatusText = '上传中';
          } else {
            uploadStatusText = '上传校验失败，请联系运维人员';
            styleName.color = '#f5222d';
          }
        }

        return <em style={styleName}>{uploadStatusText}</em>;
        // return ['上传中', '上传完成', '上传失败'][text - 1];
      },
    };
    const remarksCol = {
      title: '备注',
      dataIndex: 'remarks',
      minWidth: 150,
      align: 'left',
      render: (text, record) => {
        const styleName = {
          maxHeight: '100px',
          overflowY: 'auto',
          display: 'inline-block',
        };
        if (statusQuery[record.accId]) {
          const uploadState = statusQuery[record.accId].uploadStatus;
          if (+uploadState === 1) {
            styleName.color = '#52c41a';
          } else {
            styleName.color = '#f5222d';
          }
        }
        return <em style={styleName}>{(statusQuery[record.accId] || {}).remarks || ''}</em>;
      },
    };
    /* const optionCol = {
      title: '操作',
      dataIndex: '',
      align: 'left',
      width: 150,
      render: (text, record) => {
        if (statusQuery[record.accId]) {
          const uploadState = statusQuery[record.accId].uploadStatus;
          if (!['-1', '1', '0'].includes(uploadState)) {
            return (
              <div className="table-operation">
                <span
                  onClick={() => {
                    openDir({
                      accId: record.accId,
                    });
                  }}
                >
                  查看
                </span>
                {/!* <span onClick={() => {
                  // 是否还需要抽取
                  setMainLoading(true, '正在上传请稍后...');
                  fileUpload(record.accId, (results) => {
                    setMainLoading()
                    if (results.resultStatus && results.checkResult) {
                      message[results.resultStatus === '1' ? 'success' : 'error'](results.checkResult);
                    }
                  })
                }}>{`重新上传`}</span> *!/}
              </div>
            );
          }
          if (uploadStatus === '1') {
            return (
              <div className="table-operation">
                <span
                  onClick={() => {
                    openDir({
                      accId: record.accId,
                    });
                  }}
                >
                  查看
                </span>
              </div>
            );
          }
        }
        return '';
      },
    }; */
    const uploadTimeCol = {
      title: '上传时间',
      width: 160,
      dataIndex: 'uploadTime',
      align: 'center',
    };
    const uploadResultCol = {
      title: '备注',
      dataIndex: 'uploadResult',
      align: 'left',
      minWidth: 150,
      render: (text, record) => {
        const styleName = {
          maxHeight: '100px',
          overflowY: 'auto',
          display: 'inline-block',
        };

        if (+record.uploadStatus === 0) {
          styleName.color = '#52c41a';
        } else if (
          +record.uploadStatus === 2 ||
          !record.uploadStatus ||
          +record.uploadStatus > 2 ||
          +record.uploadStatus < -1
        ) {
          styleName.color = '#f5222d';
        }

        return <em style={styleName}>{text || ''}</em>;
      },
    };
    if (isSaas) {
      return [
        ztIdCol,
        nameCol,
        { ...extractionStatusCol },
        uploadStatusCol,
        uploadTimeCol,
        uploadResultCol,
      ];
    }
    return [ztIdCol, nameCol, extractionStatusCol, uploadStatusCol, remarksCol];
  };
  // 获取线下线上显示的列
  const col = getCol();
  const outsideLogin = () => {
    ClientAPI.openUrl(selectObj.loginLink);
  };

  return (
    <div className="uploadData-main">
      <div className="headerBG">
        <div className="ui-main-header-left">
          <h3>上传数据</h3>
          <div className="ui-main-select-name" onClick={outsideLogin}>
            当前已选择：<i className="link">{selectObj.names}</i>
          </div>
        </div>
      </div>
      <div className="uploadData-top" ref={uploadDataTop}>
        <div className="uploadData-top-left">
          <a
            className="uploadData-top-left-a"
            onClick={(e) => {
              e.stopPropagation();
              if (!isSaas) {
                Modal.confirm({
                  width: 460,
                  cancelText: '否',
                  okText: '是',
                  title: '温馨提示',
                  content: (
                    <p>
                      点击返回后，本页面的上传结果将不做保留！
                      <br />
                      上传结果可通过安装目录下的【上传结果】进行查看。
                      <br />
                      是否继续操作？
                    </p>
                  ),
                  onOk() {
                    history.push('/helper/application-list');
                  },
                  onCancel() {},
                });
              } else {
                history.push('/helper/application-list');
              }
            }}
          >
            <Icon type="arrow-left" />
            返回
          </a>
          {!isSaas && (
            <>
              <span>导入年度：</span>
              <Select
                open={visible}
                onChange={yearChange}
                onDropdownVisibleChange={onDropdownVisibleChange}
                value={selectKey}
                style={{ width: '120px', display: 'inline-block', marginRight: '8px' }}
              >
                {selectList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </>
          )}
          <div className="searchBox">
            <Input.Search
              style={{ width: 240 }}
              value={singleSearchName}
              placeholder="请输入账套名称"
              onSearch={(value) => {
                setRowKey({
                  selectedRowKeys: [],
                  selectedRows: [],
                });
                setSearchName(value);
                setSingleSearchName(value);
                setBatchSearchName(``);
              }}
              allowClear
              onChange={(e) => {
                if (!e.target.value) {
                  setSearchName('');
                  setSingleSearchName('');
                  setRowKey({
                    selectedRowKeys: [],
                    selectedRows: [],
                  });
                } else {
                  setSearchName(e.target.value);
                  setSingleSearchName(e.target.value);
                }
              }}
            />
            <div
              className="batchSearch"
              onClick={() => {
                setBatchSearchVisible(true);
              }}
            >
              批量
            </div>
          </div>
          {/* <span style={{ paddingLeft: '12px' }}>上传状态：</span> */}
          <span style={{ paddingLeft: '12px' }} />
          <Checkbox.Group onChange={onChange} value={uploadStatus}>
            {/* <Checkbox value="-1">等待上传</Checkbox>
            <Checkbox value="0">上传中</Checkbox> */}
            <Checkbox value="-99">未上传</Checkbox>
            <Checkbox value="1">上传成功</Checkbox>
            <Checkbox value="9">上传失败</Checkbox>
          </Checkbox.Group>
          {isSaas && (
            <AutoRefresh
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              openTypeTime={openTypeTime}
              refresh={(cbk, testNum) => {
                refresh({ ...queryVal, isRefreshList: 4 }, cbk, testNum);
              }}
            />
            // <span
            //   onClick={() => {
            //     refresh({ isRefreshList: 4 });
            //   }}
            //   style={{ color: '#008CFF', fontSize: '14px', marginLeft: '8px', cursor: 'pointer' }}
            // >
            //   <Icon type="sync" style={{ margin: '10px 5px 0 0', verticalAlign: 'top' }} />
            //   刷新状态
            // </span>
          )}
        </div>
        <div className="uploadData-top-right">
          {isSaas && (
            <Button
              type="primary"
              ghost
              style={{ marginLeft: 0 }}
              onClick={() => {
                setIsCheck(false);
                refresh({ ...queryVal, isRefreshList: 3 });
              }}
            >
              更新列表
            </Button>
          )}
          {!isSaas && (
            <Button type="primary" onClick={() => openDir()} ghost>
              查看日志
            </Button>
          )}
          <Button type="primary" onClick={onClick}>
            上传数据
          </Button>
        </div>
      </div>
      <div className="uploadData-table" style={{ height: `${tableHeight}px` }}>
        <Table
          className="accountTable"
          bordered
          rowSelection={rowSelection}
          // pagination={false}
          pagination={{
            ...pagination,
            total,
            pageSizeOptions: ['50', '100', '200', '500'],
            showTotal: () => (
              <span>
                当页
                {pagination.current * pagination.pageSize > total
                  ? total % pagination.pageSize
                  : pagination.pageSize}
                条，共{total}条
              </span>
            ),
            // showQuickJumper: {
            //   goButton: (
            //     <Button style={{ padding: '0 12px', height: '22px', margin: '0 12px' }}>确定</Button>
            //   ),
            // },
            showQuickJumper: false,
            size: 'small',
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
              setPagination({
                ...pagination,
                current: 1,
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
            showLessItems: true,
          }}
          rowKey={isSaas ? 'ztId' : 'accId'}
          dataSource={newData}
          scroll={{ y: scrollY }}
          columns={col}
        />
        {/* <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={total}
          pageSizeOptions={['50', '100', '200', '500']}
          showTotal={null}
          showQuickJumper={false}
          showSizeChanger
          size="small"
          onShowSizeChange={(current, pageSize) => {
            setPagination({
              ...pagination,
              current,
              pageSize,
            });
            setRowKey({
              selectedRowKeys: [],
              selectedRows: [],
            });
          }}
          onChange={(current) => {
            setPagination({
              ...pagination,
              current,
            });
            setRowKey({
              selectedRowKeys: [],
              selectedRows: [],
            });
          }}
        /> */}
      </div>
      <BottomLine />
      <Modal
        width={600}
        title="导入结果"
        className="upload-result-modal"
        centered
        destroyOnClose
        visible={modalVisible}
        maskClosable={false}
        getContainer={false}
        onCancel={() => {
          setRowKey({
            selectedRowKeys: [],
            selectedRows: [],
          });
          setModalVisible(false);
        }}
        footer={
          <Button
            onClick={() => {
              setRowKey({
                selectedRowKeys: [],
                selectedRows: [],
              });
              setModalVisible(false);
            }}
          >
            关闭
          </Button>
        }
      >
        <div>
          <i className="iconfont icon-zhuyi" />
          <span>
            本次总共选择上传
            <em style={{ color: 'red' }}>{rowKey.selectedRowKeys.length}</em>
            个账套，上传成功
            <em style={{ color: 'red' }}>{upSuccess}</em>
            ，失败
            <em style={{ color: 'red' }}>{rowKey.selectedRowKeys.length - upSuccess}</em>
            个。
          </span>
          {/* <span>
            导入结果请参考软件安装目录下的Excel文件：上传结果
            <br />
            <em style={{ color: '#20a0ff' }}>
              上传失败的账套，请点击“查看”按钮找到相应的dat文件，并根据上传结果进行修改，修改后可点击右下角“手动上传”按钮重新上传！
            </em>
          </span> */}
        </div>
      </Modal>
      {saaSLoading && (
        <Modal
          title={null}
          visible={saaSLoading}
          width={550}
          getContainer={false}
          footer={null}
          closable={false}
          centered
        >
          <SaasLoading maxPercent={maxPercent} stepName={stepName} />
        </Modal>
      )}
      <Modal
        title={null}
        visible={batchSearchVisible}
        width={550}
        getContainer={false}
        footer={null}
        onCancel={() => setBatchSearchVisible(false)}
        centered
      >
        <div className="batchSearchTips">注：输入时请将账套名称以逗号隔开</div>
        <Input.TextArea
          autoSize={{ minRows: 6, maxRows: 8 }}
          value={batchSearchName}
          onChange={(e) => {
            setBatchSearchName(e.target.value);
          }}
        />
        <div className="batchSearchFooter">
          <Button
            type="primary"
            onClick={() => {
              setSearchName(batchSearchName);
              setBatchSearchVisible(false);
              setSingleSearchName('');
            }}
          >
            开始搜索
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DatabaseConnection;
