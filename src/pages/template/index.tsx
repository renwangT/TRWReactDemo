import React from 'react';
import { Table, Divider, Space, Button, Modal } from 'antd';
import {
  SearchOutlined,
  UndoOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import MixinComponent, { ComponentProps } from '@/components/MixinComponent';
import CustomFilter from '@/components/CustomFilter';
import CustomForm from '@/components/CustomForm';
import { namespace } from '@/models/template';
import { connect } from 'umi';

import { getFilterItem, getColumns, getFormItem } from './otherData';

class Index extends MixinComponent {
  constructor(props: ComponentProps) {
    super(props);
  }

  public filterItem = getFilterItem();
  public formItem = getFormItem();
  render() {
    const columns: any[] = getColumns({
      pagination: this.props.model.pagination,
      edit: this.edit,
      remove: this.remove,
    });
    return (
      <>
        <CustomFilter
          ref={this.filterFormRef}
          filterItem={this.filterItem}
          search={this.search}
        >
          <div>
            <Divider className="m-t-5" />
            <Space>
              <Button
                htmlType="submit"
                type="primary"
                icon={<SearchOutlined />}
                // style={{ marginLeft: '0' }}
              >
                查询
              </Button>
              <Button onClick={this.resetSearch} icon={<UndoOutlined />}>
                重置
              </Button>
              <Button
                type="primary"
                onClick={this.add}
                icon={<FileAddOutlined />}
              >
                新增
              </Button>
            </Space>
            <Divider />
          </div>
        </CustomFilter>
        <Table
          loading={this.props.loading}
          columns={columns}
          dataSource={this.props.model.dataList}
          size="small"
          scroll={{ x: true }}
          rowKey={(record: any) => record.id}
          rowClassName={this.setRowClassName}
          onRow={(record: any, index: any) => {
            return {
              onClick: (e: React.MouseEvent) => {
                // clickRow(record, index);
                this.handleClickRow(record);
              },
            };
          }}
          bordered
          pagination={this.getPagination()}
        />
        <Modal
          {...this.props.model.modalConfig}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          <CustomForm
            initialValues={this.props.model.modalInitialValues}
            ref={this.modalFormRef}
            formItem={this.formItem}
          />
        </Modal>
      </>
    );
  }
}

export default connect((state: any) => ({
  model: state[namespace],
  namespace,
  loading: state.loading.models[namespace],
}))(Index);
