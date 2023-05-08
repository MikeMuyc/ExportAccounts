import React, { useState, useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import PropTypes from 'prop-types';
import './style.less';

const modalBodyStyle = { maxHeight: 305, overflow: 'auto', padding: '10px 20px' };
const SelectCompany = ({ selectCompanyVisible, handleOk, handleCancel }) => {
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    const oneList = (values) => {
      ClientAPI.getCompanyId(values.companyId)
        .then(() => {
          handleCancel();
          handleOk();
        })
        .catch((result) => {
          message.error(result.msg || '设置企业失败！');
        });
    };
    if (selectCompanyVisible) {
      ClientAPI.getCompanyInfo()
        .then((result) => {
          console.log(result);
          if ((result.data.list || []).length === 1) {
            oneList(result.data.list[0]);
            return;
          }
          setCompanyList(result?.data?.list || []);
        })
        .catch((result) => {
          message.error(result.msg || '获取企业列表失败！');
        });
    }
  }, [selectCompanyVisible]);
  const getCompanyId = (companyId) => {
    ClientAPI.getCompanyId(companyId)
      .then(() => {
        handleCancel();
        handleOk();
      })
      .catch((result) => {
        message.error(result.msg || '设置企业失败！');
      });
  };
  return (
    <Modal
      title="选择登录企业"
      visible={selectCompanyVisible}
      footer={null}
      centered
      bodyStyle={modalBodyStyle}
      onCancel={() => handleCancel()}
      getContainer={false}
    >
      <Form className="modalContent">
        {companyList.map((item) => {
          return (
            <div
              className="companyItem"
              key={item.companyId}
              onClick={() => {
                getCompanyId(item.companyId);
              }}
            >
              <div className="left" title={item.companyName}>
                {item.companyName}
              </div>
              <div className="right">
                进入企业
                <i className="iconfont icon-youjiantou" />
              </div>
            </div>
          );
        })}
      </Form>
    </Modal>
  );
};
SelectCompany.propTypes = {
  selectCompanyVisible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
export default SelectCompany;
