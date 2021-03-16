import React, { useState } from 'react';
import { Upload, Button, Modal, Form } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';

interface Props {
  confirm(arg: any): void;
  accept?: string;
  upLoadText?: string;
}
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const UploadFile = ({ accept = '*', confirm, upLoadText = '导入' }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const params = {
    name: 'file',
    fileList: fileList,
    accept: accept,
    onRemove() {
      setFileList([]);
      form.setFieldsValue({ file: undefined });
    },
    onChange(info: any) {
      let arr = info.fileList.length > 0 ? [info.fileList[info.fileList.length - 1]] : [];
      setFileList(arr);
    },
  };
  const handleClick = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };
  const handleOk = () => {
    console.log('ok');
    form
      .validateFields()
      .then((values: any) => {
        console.log(values);
        let formData = new FormData();
        formData.append('file', values.file.file.originFileObj);
        confirm(formData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        {upLoadText}
      </Button>
      <Modal
        title="导入"
        visible={visible}
        onOk={handleOk}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={handleClose}
      >
        <Form {...formItemLayout} form={form}>
          <Form.Item
            label="文件"
            name="file"
            rules={[
              {
                required: true,
                message: '请选择文件!',
              },
            ]}
          >
            <Upload {...params}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="下载模板文件">
            {/* <a href="" target="blank">https://pinpai-portal-rs.eebbk.net/2020/08/20/1597910733683/订单导入模板.xls</a> */}
            <Button
              size="middle"
              type="primary"
              icon={<DownloadOutlined />}
              href="https://pinpai-portal-rs.eebbk.net/2020/08/20/1597910733683/订单导入模板.xls"
            >
              download
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UploadFile;
