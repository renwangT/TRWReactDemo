import React, { useMemo, useEffect, useRef } from 'react';
import { Form } from 'antd';

export default React.forwardRef((props?: any, ref?: any) => {
  const [form] = Form.useForm();
  const formKeyRef = useRef<any>({});
  const {
    formItem = [],
    layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    },
    initialValues = {},
    submit,
    size = 'middle',
    style = {},
  } = props;

  const onFinish = (values: any) => {
    console.log('Success:', values);
    submit && submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    ref.current = {
      form,
    };
    if (Object.keys(initialValues).length === 0) {
      // form.resetFields();
      console.log(formKeyRef.current);
      form.setFieldsValue(formKeyRef.current);
      // form.resetFields()
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  console.log('Form of initialValues', initialValues);
  useEffect(() => {
    formKeyRef.current = {};
    formItem.forEach((item: any) => {
      if (item.children && item.children.length) {
        item.children.forEach((val: any) => {
          formKeyRef.current[val.name] = undefined;
        });
      } else {
        formKeyRef.current[item.name] = undefined;
      }
    });
  }, [formItem]);
  return useMemo(() => {
    console.log('%cForm is Render', 'color: #ff0000f0');
    return (
      <Form
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        size={size}
        initialValues={initialValues}
        style={style}
      >
        {formItem.map(
          (item: any): JSX.Element => {
            const { input: InputCom, ...extra } = item;
            if (extra.type === 'layout') {
              return (
                <div className={item.name} key={item.name}>
                  {extra.children &&
                    extra.children.map((val: any) => {
                      const { input: InputCom, ...other } = val;
                      return (
                        <Form.Item key={val.name} {...other}>
                          <InputCom />
                        </Form.Item>
                      );
                    })}
                </div>
              );
            } else if (extra.type === 'list') {
              return (
                <Form.List key={item.name} {...extra}>
                  {InputCom()}
                </Form.List>
              );
            } else {
              return (
                <Form.Item key={item.name} {...extra}>
                  <InputCom />
                </Form.Item>
              );
            }
          },
        )}
      </Form>
    );
  }, [formItem]);
});
