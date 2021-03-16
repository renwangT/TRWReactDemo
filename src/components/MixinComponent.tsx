import React from 'react';
import { ConnectProps, Dispatch } from 'umi';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export interface ComponentProps extends ConnectProps {
  namespace: string;
  model: { [key: string]: any };
  loading?: boolean;
  dispatch: Dispatch;
  [k: string]: any;
}

export default class MixinComponet extends React.PureComponent<
  ComponentProps,
  any
> {
  public filterFormRef = React.createRef<any>();
  public modalFormRef = React.createRef<any>();
  // public namespace;
  // public dispatch;
  // public model;
  constructor(props: ComponentProps) {
    super(props);
  }
  // 搜索
  search = (values: any) => {
    this.props.dispatch({
      type: `${this.props.namespace}/search`,
      payload: {
        searchData: values,
        pagination: {
          ...this.props.model.pagination,
          current: 1,
        },
      },
    });
    // this.props.dispatch({
    //   type: `${this.props.namespace}/getList`,
    //   payload: {
    //     searchData: values,
    //   },
    // });
  };
  resetSearch = () => {
    this.filterFormRef.current.form.resetFields();
    this.props.dispatch({
      type: `${this.props.namespace}/setState`,
      payload: {
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
      },
    });
    this.filterFormRef.current.form.submit();
  };
  handleClickRow = (row: any) => {
    this.props.dispatch({
      type: `${this.props.namespace}/setState`,
      payload: {
        selectRow: { ...row },
      },
    });
  };
  setRowClassName = (row: any) => {
    if (row.id === this.props.model.selectRow?.id) {
      return 'actived';
    } else {
      return '';
    }
  };
  onOk = () => {
    this.modalFormRef.current.form
      .validateFields()
      .then((values: any) => {
        console.log('%chandleOk result values:', 'background: #FF6A00', values);
        if (this.props.model.isEdit) {
          this.props.dispatch({
            type: `${this.props.namespace}/update`,
            payload: {
              params: {
                ...values,
                id: this.props.model.modalInitialValues.id,
              },
            },
          });
        } else {
          this.props.dispatch({
            type: `${this.props.namespace}/add`,
            payload: {
              params: values,
            },
          });
        }
      })
      .catch((errorInfo: any) => {
        message.warning('请填写必填项！');
        console.error(errorInfo);
      });
  };
  add = () => {
    this.props.dispatch({
      type: `${this.props.namespace}/setState`,
      payload: {
        modalConfig: {
          ...this.props.model.modalConfig,
          title: '新增',
          visible: true,
        },
        isEdit: false,
        modalInitialValues: {},
        selectRow: {},
      },
    });
  };
  edit = (row: any) => {
    let initialValues = {
      ...row,
    };
    this.props.dispatch({
      type: `${this.props.namespace}/setState`,
      payload: {
        modalConfig: {
          ...this.props.model.modalConfig,
          title: '编辑',
          visible: true,
        },
        modalInitialValues: initialValues,
        isEdit: true,
      },
    });
  };
  //remove
  remove = (id?: number) => {
    console.log('删除');
    const _this = this;
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: '提醒',
      content: '是否删除！',
      okText: '是',
      cancelText: '否',
      onOk() {
        _this.props.dispatch({
          type: `${_this.props.namespace}/remove`,
          payload: {
            params: { id },
          },
        });
      },
    });
  };
  onCancel = () => {
    console.log('onCancel');
    this.props.dispatch({
      type: `${this.props.namespace}/setState`,
      payload: {
        modalConfig: {
          ...this.props.model.modalConfig,
          visible: false,
        },
        modalInitialValues: {},
        inventoryPagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
        inventoryList: [],
        searchData: {},
      },
    });
  };
  paginationChange = (current: any, pageSize: any) => {
    this.props.dispatch({
      type: `${this.props.namespace}/setState`,
      payload: {
        pagination: {
          total: this.props.model.pagination.total,
          current,
          pageSize,
        },
      },
    });
    this.props.dispatch({
      type: `${this.props.namespace}/getList`,
    });
  };

  getPagination = () => {
    return {
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total: number) => ` 共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50'],
      position: ['bottomRight'],
      onChange: this.paginationChange,
      ...this.props.model.pagination,
    };
  };
}
