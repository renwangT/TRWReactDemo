import React from 'react';
import { Input, Space, Button, Form, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
export const getFilterItem = (params?: any) => {
  return [
    {
      name: 'template',
      label: '模板',
      colon: false,
      input: ({ onChange, value }: any) => {
        return (
          <Input
            onChange={onChange}
            allowClear
            placeholder="请输入服务代理ID"
          />
        );
      },
    },
  ];
};

export const getColumns = (params?: any) => {
  const { pagination, remove, edit } = params;
  return [
    {
      title: '序号',
      dataIndex: 'id',
      fixed: 'left',
      key: 'id',
      render: (text: any, record: any, index: number) => (
        <div style={{ minWidth: 28 }}>
          {(pagination.current - 1) * pagination.pageSize + (index + 1)}
        </div>
      ),
    },
    {
      title: '模板',
      dataIndex: 'template',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      render(text: any, record: any) {
        return (
          <Space>
            <Button size="small" onClick={() => edit(record)} type="link">
              编辑
            </Button>
            <Button
              size="small"
              onClick={() => remove(record.id)}
              type="link"
              danger
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
};

export const getFormItem = (params?: any) => {
  return [
    {
      name: 'template',
      label: '模板',
      rules: [{ required: true, message: '请输入模板' }],
      input: ({ onChange, value }: any) => {
        return (
          <Input
            onChange={onChange}
            value={value}
            allowClear
            placeholder="请输入模板"
          />
        );
      },
    },
  ];
};

const getShipmentstModalTableColums: (arg: any) => any[] = (params?: any) => {
  const { onShipNumChange } = params;
  return [
    {
      title: '厂别',
      dataIndex: 'factory',
    },
    {
      title: '物料代码',
      dataIndex: 'materialCode',
    },
    {
      title: '物料名称',
      dataIndex: 'materialName',
    },
    {
      title: '申请数量',
      dataIndex: 'requestNum',
    },
    {
      title: '发货数量',
      dataIndex: 'shipNum',
      render(text: any, record: any, index: number) {
        return (
          <InputNumber
            min={0}
            style={{ width: '80%' }}
            value={text}
            onChange={(val) => onShipNumChange(val, index)}
            max={record.requestNum}
            placeholder={`请输入0-${record.requestNum}`}
          />
        );
      },
    },
  ];
};
const wrapperCol = { span: 16, offset: 4 };
export const getShipmentstFormItem = (params?: any) => {
  const { onShipNumChange } = params;
  return [
    {
      type: 'list',
      label: '快递信息',
      name: 'express',
      input() {
        return (fields: any[], { add, remove }: any) => {
          console.log('fields:', fields);
          if (fields.length === 0) {
            add(undefined, 0);
          }
          return (
            <>
              {fields.map((field) => (
                <Form.Item
                  wrapperCol={wrapperCol}
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                >
                  <Space align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, 'company']}
                      label="快递公司"
                      fieldKey={[field.fieldKey, 'company']}
                      rules={[{ required: true, message: '请输入快递公司' }]}
                    >
                      <Input placeholder="请输入快递公司" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="快递单号"
                      name={[field.name, 'waybillNo']}
                      fieldKey={[field.fieldKey, 'waybillNo']}
                      rules={[{ required: true, message: '请输入快递单号' }]}
                    >
                      <Input placeholder="请输入快递单号" />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Space>
                </Form.Item>
              ))}
              <Form.Item wrapperCol={wrapperCol}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加快递信息
                </Button>
              </Form.Item>
            </>
          );
        };
      },
    },
    {
      name: 'detailsList',
      label: '',
      wrapperCol,
      rules: [{ required: true, message: '请输入发货数量' }],
      input({ value, onChange }: any) {
        return (
          <Table
            size="small"
            bordered
            rowKey={(record: any) => record.id}
            columns={getShipmentstModalTableColums({ onShipNumChange })}
            dataSource={value}
            pagination={false}
          />
        );
      },
    },
  ];
};
