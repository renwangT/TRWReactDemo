import React from 'react';
import {
  Input,
  Space,
  Button,
  Form,
  Table,
  InputNumber,
  Radio,
  Select,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const sexMap = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
  {
    value: '不详',
    label: '不详',
  },
];

export const getFilterItem = (params?: any) => {
  return [
    {
      name: 'userName',
      label: '用户名',
      colon: false,
      input: ({ onChange, value }: any) => {
        return (
          <Input onChange={onChange} allowClear placeholder="请输入用户名" />
        );
      },
    },
    {
      name: 'age',
      label: '年龄',
      colon: false,
      input: ({ onChange, value }: any) => {
        return (
          <InputNumber
            style={{ width: '100%' }}
            onChange={onChange}
            placeholder="请输入年龄"
          />
        );
      },
    },
    {
      name: 'sex',
      label: '性别',
      colon: false,
      input: ({ onChange, value }: any) => {
        return (
          <Select onChange={onChange} allowClear placeholder="请选择性别">
            {sexMap.map((item: any) => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
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
      title: '用户',
      dataIndex: 'userName',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '职业',
      dataIndex: 'job',
    },
    {
      title: '爱好',
      dataIndex: 'hobby',
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
      name: 'userName',
      label: '姓名',
      rules: [{ required: true, message: '请输入姓名' }],
      input: ({ onChange, value }: any) => {
        return (
          <Input
            onChange={onChange}
            value={value}
            allowClear
            placeholder="请输入姓名"
          />
        );
      },
    },
    {
      name: 'age',
      label: '年龄',
      rules: [{ required: true, message: '请输入年龄' }],
      input: ({ onChange, value }: any) => {
        return (
          <InputNumber
            onChange={onChange}
            value={value}
            style={{ width: '100%' }}
            placeholder="请输入年龄"
          />
        );
      },
    },
    {
      name: 'sex',
      label: '性别',
      rules: [{ required: true, message: '请选择性别' }],
      input: ({ onChange, value }: any) => {
        return (
          <Radio.Group onChange={onChange} value={value}>
            {sexMap.map((item: any) => {
              return (
                <Radio value={item.value} key={item.value}>
                  {item.label}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      },
    },
    {
      name: 'job',
      label: '职业',
      rules: [{ required: true, message: '请输入职业' }],
      input: ({ onChange, value }: any) => {
        return (
          <Input
            onChange={onChange}
            value={value}
            allowClear
            placeholder="请输入职业"
          />
        );
      },
    },
    {
      name: 'hobby',
      label: '爱好',
      rules: [{ required: true, message: '请输入爱好' }],
      input: ({ onChange, value }: any) => {
        return (
          <Input
            onChange={onChange}
            value={value}
            allowClear
            placeholder="请输入爱好，以，逗号隔开"
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
