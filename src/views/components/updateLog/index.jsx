import React, { useState } from 'react';
import { Modal, message } from 'antd';
import SquIcon from '@views/platform/applicationList/containers/components/capital';

const UpdateLog = () => {
  const [visible, setVisible] = useState(false);
  const [logvisible, setLogvisible] = useState(false);
  const [list, setList] = useState([]);
  /* const onClick = () => {
    setVisible(true);
  }; */
  if (window.GuideToCloud) {
    window.GuideToCloud.logClick = () => {
      ClientAPI.getUpdateLog()
        .then((result) => {
          setList(result.datas);
          setLogvisible(true);
        })
        .catch((result) => {
          message.error(result.msg || '获取更新日志失败！');
        });
    };
    window.GuideToCloud.help = () => {
      setVisible(true);
    };
  }

  const download = () => {
    ClientAPI.getfileAddress()
      .then((result) => {
        if (result.msg.indexOf(`取消`) > -1) {
          message.info(result.msg);
        } else {
          message.success(result.msg);
        }
      })
      .catch((result) => {
        console.log(result);
        message.error(result.msg || '下载失败！');
      });
  };
  return (
    <>
      {/* <div className="version" onClick={onClick}>
        <Icon type="question-circle" style={{ color: '#3051E6', marginRight: '5px' }} />
        帮助
      </div> */}
      <Modal
        className="ui-update-log"
        centered
        title="更新日志"
        visible={logvisible}
        onCancel={() => setLogvisible(false)}
        width={550}
        getContainer={false}
        footer={null}
        zIndex={2000}
      >
        <div className="ui-update-log-main">
          {list.map((val) => (
            <div key={val.date} className="ui-update-log-main-list">
              <h5>{val.date}</h5>
              <div className="logListItem">
                {val.list.map((v) => (
                  <p key={v.cid}>
                    {v.cid}、<em>{v.typeName}：</em>
                    <span>{v.detail}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        className="ui-update-log"
        centered
        title="说明"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={550}
        getContainer={false}
        footer={null}
      >
        <div className="info-list">
          <div className="left">
            <i className="iconfont icon-new myIcon-new" />
          </div>
          <div className="right">新版标记，表明此版本时近期刚刚上线</div>
        </div>
        <div className="info-list">
          <div className="left">
            <SquIcon type="single" />
          </div>
          <div className="right">
            单点登录标记，意味着此版本的同一个账号同时只能在同一个设备保持登录状态
          </div>
        </div>
        <div className="info-list">
          <div className="left">
            <SquIcon type="more" />
          </div>
          <div className="right">
            连续软件标记，说明此版本支持多年度数据导入到同一个账套。SaaS版均为此类型，故没有特意标记
          </div>
        </div>
        <div className="info-list">
          <div className="left">
            <SquIcon type="capital" />
          </div>
          <div className="right">资产导账标记，表示该版本已支持固定资产数据的导账</div>
        </div>
        <div className="info-download">
          操作手册：
          <i className="underLine" onClick={() => download()}>
            点此下载
          </i>
        </div>
      </Modal>
    </>
  );
};

export default UpdateLog;
