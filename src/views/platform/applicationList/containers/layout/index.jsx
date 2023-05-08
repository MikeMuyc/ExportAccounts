import React, { useState, useRef, useEffect } from 'react';
import { Input, Modal, message, Icon } from 'antd';
import { useHistory } from 'react-router-dom';
import BottomLine from '@views/components/bottomLine';
import SquIcon from '@views/platform/applicationList/containers/components/capital';
import SaasModal from '../SaasModal';
import SaasLoading from '../SaasLoading';
import DatabaseConnection from '../DatabaseConnection';
// import More from '../components/more';
// import Single from '../components/single';
import '../style.less';
import effects from '../../redux/effects';

const ApplicationList = () => {
  const form = useRef(null);
  const history = useHistory();
  const navWidth = 68;
  const [appData, setAppData] = useState({
    tabsData: [],
    activeKey: '',
    activeIndex: 0,
    tabsDataList: [],
  });
  // 当前选择的软件名称
  const [selectObj, setSelectObj] = useState({});
  // 登录saas软件选择
  const [saaSVisible, setSaaSVisible] = useState(false);
  // 链接数据库
  const [isLinkDatabase, setIsLinkDatabase] = useState(false);
  // 手动上传数据弹层是否显示
  const [manualVisible, setManualVisible] = useState(false);
  // 上次数据
  const [address, setAddress] = useState('');

  const { tabsData, tabsDataList, activeKey, activeIndex } = appData;
  // 登录saas进度条
  const [saaSLoading, setSaaSLoading] = useState(false);
  const [maxPercent, setMaxPercent] = useState(0);
  const [stepName, setStepName] = useState('登录');
  const [searchName, setSearchName] = useState('');
  // 大类别发生变更
  const tabChange = (val, index) => {
    setSearchName('');
    setAppData({
      ...appData,
      tabsDataList: val.list,
      activeKey: val.id,
      activeIndex: index,
    });
    setSearchName('');
  };
  // 搜索
  const onSearch = (value) => {
    if (value !== '') {
      let newTabsDataList = [];
      tabsData.forEach((val) => {
        if (val.list) {
          const tabList = value
            ? val.list.filter((v) => v.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || []
            : val.list;
          newTabsDataList = newTabsDataList.concat(tabList);
        }
      });
      setAppData({
        ...appData,
        tabsDataList: newTabsDataList,
        activeIndex: 0,
        activeKey: '-99',
      });
      setSearchName(value);
    }
  };
  // 搜索框清空
  const searchChange = (e) => {
    const value = e.target?.value;
    if (value === '') {
      setAppData({
        ...appData,
        activeKey: tabsData[0].id,
        tabsDataList: tabsData[0].list,
        activeIndex: 0,
      });
      setSearchName('');
    } else {
      onSearch(value);
    }
    setSearchName(value);
  };

  // 企业点击
  const appClick = (data) => {
    const newData = { ...data, names: data.name };
    const query = {
      appid: newData.appid,
      typeid: newData.typeid,
      value: newData.value,
    };
    setSelectObj(newData);
    if (+newData.isSaaS === 1) {
      setSaaSVisible(true);
    } else if (+newData.isOpenEXE === 1) {
      // 去第二步
      Modal.confirm({
        title: '该系列必须使用1.0导账取数，点击"确定"打开导账1.0客户端',
        content: '',
        onOk() {
          effects.setLoadingObj(true, '正在获取软件类型...');
          ClientAPI.Connect(JSON.stringify(query))
            .then(() => {
              effects.setLoadingObj();
            })
            .catch((result) => {
              effects.setLoadingObj();
              message.error(result.msg || '获取软件类型失败！');
            });
          setSelectObj({});
        },
        onCancel() {
          setSelectObj({});
        },
      });
    } else {
      effects.setLoadingObj(true, '正在获取软件类型...');
      ClientAPI.Connect(JSON.stringify(query))
        .then((res) => {
          setSelectObj({ ...newData, ...res });
          effects.setLoadingObj();
          setIsLinkDatabase(true);
        })
        .catch((result) => {
          effects.setLoadingObj();
          message.error(result.msg || '获取软件类型失败！');
        });
    }
  };
  const patrolLoginInfo = (data, num) => {
    const testNum = num || 0;
    setSaaSLoading(true);
    // console.log(`loginData:`, data);
    ClientAPI.getSaaS(JSON.stringify({ ...data, testNum }))
      .then((result) => {
        console.log(`patrolLoginInfo:`, result);
        const { percentage, loginStatus, msg } = result;
        if (loginStatus === `success`) {
          setMaxPercent(100);
          history.push({
            pathname: '/helper/account-list',
            state: {
              dataList: result.list || [],
              queryVal: data,
              isSaas: true,
              selectObj,
            },
          });
          message.success('登录SaaS成功');
          setTimeout(() => {
            setSaaSVisible(false);
            setSaaSLoading(false);
            setMaxPercent(0);
            setStepName(`登录`);
          }, 1000);
        } else if (loginStatus === `fail`) {
          setSaaSVisible(false);
          setSaaSLoading(false);
          message.error(msg || '登录SaaS失败！');
          setMaxPercent(0);
          setStepName(`登录`);
        } else {
          setTimeout(() => {
            setStepName(msg);
            setMaxPercent(+percentage);
            patrolLoginInfo(data, testNum + 1);
          }, 500);
        }
      })
      .catch((result) => {
        setSaaSVisible(false);
        setSaaSLoading(false);
        message.error(result.msg || '登录SaaS失败！');
        setMaxPercent(0);
        setStepName(`登录`);
      });
  };
  // 登录saas软件
  const saasOnOk = () => {
    form.current.validateFields((err, values) => {
      if (err) {
        return;
      }
      const reg = /(^\s*)|(\s*$)/g;
      const params = {};
      Object.keys(values).forEach((item) => {
        params[item] = values[item].replace(reg, '');
      });
      const query = {
        loginParams: params,
        isRefreshList: 1,
        name: selectObj.name,
      };
      console.log(`loginParams:`, params);
      patrolLoginInfo(query);
    });
  };
  // 登录数据库选择
  const inkDatabaseOnOk = () => {
    form.current.validateFields((err, values) => {
      if (err) {
        return;
      }
      const { databaseType, ipHostName, verificationMethod, name, password, instance } = values;
      const query = {
        instance: instance || ipHostName,
      };
      if (+databaseType === 0 && +verificationMethod === 1) {
        query.name = name;
        query.password = password;
      }
      effects.setLoadingObj(true, '正在连接数据库...');
      ClientAPI.LinkDB(JSON.stringify(query))
        .then((result) => {
          message.success('数据库连接成功');
          history.push({
            pathname: '/helper/account-list',
            state: {
              dataList: result.list || [],
              queryVal: query,
              isSaas: false,
              selectObj,
            },
          });
          effects.setLoadingObj();
        })
        .catch((result) => {
          effects.setLoadingObj();
          message.error(result.msg || '连接数据库失败！');
        });
    });
  };
  // 手动上传
  const uploadOk = () => {
    if (!address) {
      message.error('请选择文件！');
      return;
    }
    effects.setLoadingObj(true);
    ClientAPI.datUpLoad(JSON.stringify({ address }))
      .then((result) => {
        if (+result.resultStatus === 0) {
          Modal.success({
            content: '上传成功',
          });
          effects.setLoadingObj(false);
          return;
        }
        Modal.error({
          title: `【${result.name}】 上传失败`,
          content: `${result.checkResult}`,
        });
        console.log(`fail:`, result);
        effects.setLoadingObj(false);
      })
      .catch((result) => {
        Modal.error({
          title: `【${result.name}】 上传失败`,
          content: `${result.checkResult}`,
        });
        effects.setLoadingObj(false);
      });
  };
  // 获得焦点
  const handleFocus = (e) => {
    const { target } = e;
    target.blur();
    ClientAPI.chooseFile(JSON.stringify({}))
      .then((result) => {
        if (result.address) {
          setAddress(result.address);
        }
      })
      .catch((result) => {
        message.error(result.msg || '设置目录失败！');
      });
  };
  // 获取列表数据
  useEffect(() => {
    const fetchData = () => {
      effects.setLoadingObj(true, '正在获取软件类型...');
      ClientAPI.AllType()
        .then((result) => {
          effects.setLoadingObj(false);
          setAppData({
            ...appData,
            tabsData: result?.list || [],
            activeKey: result?.list[0]?.id || '',
            tabsDataList: result?.list[0]?.list || [],
          });
        })
        .catch((result) => {
          effects.setLoadingObj(false);
          message.error(result.msg || '获取软件类型失败！');
        });
    };
    fetchData();
  }, []);
  console.log(`appData:`, appData);
  const outsideLogin = (url) => {
    ClientAPI.openUrl(url);
  };
  return (
    <div className="applicationListLayer">
      <div className="headerBG">
        <div className="left">
          <div className="h3">选择软件</div>
          <div className="nav">
            {searchName && (
              <div className="itemNav active" key="-99">
                <em className="txt">搜索</em>
              </div>
            )}
            {tabsData.map((item, index) => (
              <div
                className={`itemNav ${item.id === activeKey ? 'active' : ''}`}
                key={item.id}
                onClick={() => tabChange(item, index)}
              >
                <em className="txt">{item.name}</em>
              </div>
            ))}
            <div className="whiteHover" style={{ left: `${activeIndex * navWidth}px` }} />
          </div>
        </div>
        <div className="search">
          <Input.Search
            placeholder="请输入供应商或软件名称"
            style={{
              width: 240,
              height: 28,
              verticalAlign: 'middle',
              borderRadius: 14,
              overflow: 'hidden',
            }}
            allowClear
            size="small"
            value={searchName}
            onChange={searchChange}
          />
        </div>
      </div>
      <div className="listContent">
        <div className="civ">
          {tabsDataList.map((item) => {
            return (
              <div className="listItem" key={`${item.appid}-${item.value}`}>
                <i className="iconfont icon-wenben" />
                <div
                  className={item.loginLink ? `text` : `text large`}
                  onClick={() => appClick(item)}
                >
                  {item.name}
                </div>
                {+item.isNewVersion === 1 && <i className="iconfont icon-new" />}
                {+item.isContinuous === 1 && <SquIcon type="more" />}
                {+item.isSingleLogin === 1 && <SquIcon type="single" />}
                {+item.bAsset === 1 && <SquIcon type="capital" />}
                <div
                  className="url"
                  title={item.loginLink}
                  onClick={() => outsideLogin(item.loginLink)}
                >
                  {item.loginLink}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomLine
        right={() => (
          <div className="notice" onClick={() => setManualVisible(true)}>
            <Icon type="exclamation-circle" style={{ margin: '2px 5px 0 0' }} />
            上传dat文件
          </div>
        )}
      />
      {saaSVisible && (
        <Modal
          title={`登录${selectObj.names}`}
          wrapClassName="ssssModal"
          visible={saaSVisible}
          onOk={saasOnOk}
          onCancel={() => {
            setSaaSVisible(false);
            setTimeout(() => {
              setSelectObj({});
            }, 300);
          }}
          width={428}
          okText="确定"
          maskClosable={false}
          getContainer={false}
        >
          <SaasModal ref={form} selectObj={selectObj} />
        </Modal>
      )}
      {isLinkDatabase && (
        <Modal
          title="连接数据库"
          visible={isLinkDatabase}
          onOk={inkDatabaseOnOk}
          onCancel={() => {
            setIsLinkDatabase(false);
            setTimeout(() => {
              setSelectObj({});
            }, 300);
          }}
          width={550}
          style={{ top: '10vh' }}
          okText="下一步"
          maskClosable={false}
          getContainer={false}
        >
          <DatabaseConnection
            ref={form}
            selectObj={selectObj}
            setMainLoading={effects.setLoadingObj}
          />
        </Modal>
      )}
      {manualVisible && (
        <Modal
          title="手动上传数据"
          visible={manualVisible}
          onOk={uploadOk}
          onCancel={() => setManualVisible(false)}
          width={550}
          getContainer={false}
        >
          <p style={{ color: '#ff8d00' }}>
            温馨提示：本次操作主要是对通过诺诺导账工具导出的dat文件进行手动上传操作。
          </p>
          <Input
            placeholder="请选择需要上传的数据文件"
            onFocus={handleFocus}
            autoComplete="off"
            value={address}
          />
        </Modal>
      )}
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
    </div>
  );
};
export default ApplicationList;
