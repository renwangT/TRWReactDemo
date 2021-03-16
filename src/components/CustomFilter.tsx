import React, { useMemo, useEffect } from 'react';
import { Form, Tooltip, Divider, Row, Col } from 'antd';

const filterLayout = {
  labelCol: { span: 6, offset: 0 },
  wrapperCol: { span: 17, offset: 0 },
};

const Filter = React.forwardRef((props: any, ref: any) => {
  const [form] = Form.useForm();
  const {
    filterItem,
    layout = filterLayout,
    initialValues = {},
    children,
    expandable = false,
    style = {},
    size = 'middle',
  } = props;
  const onFinish = async (values: any) => {
    console.log("onFinish's values", values);
    props.search(values);
  };
  useEffect(() => {
    if (ref) {
      ref.current = {
        form,
      };
    }
  }, []);
  // 优化组件 依赖父组件的 prop filterItem
  return useMemo(() => {
    console.log('%cFilter render', 'color: #00b9ff;');
    return (
      <Form
        size={size}
        form={form}
        layout="horizontal"
        scrollToFirstError={true}
        onFinish={onFinish}
        initialValues={initialValues}
        style={style}
      >
        <Row>
          {filterItem.map((item: any, k: number) => {
            if (item.type && item.type === 'expandable') {
              return (
                <Col
                  span={24}
                  key={item.type}
                  style={{
                    minHeight: 0,
                    height: expandable ? '36px' : 0,
                    // transition: 'height .2s',
                    overflow: 'hidden',
                  }}
                >
                  <Row>
                    {item.children.map((v: any) => {
                      const { input: InputCom, span = 4, colon = false, ...extra } = v;
                      return (
                        <Col key={v.name} span={span}>
                          <Form.Item
                            {...layout}
                            labelAlign="rigth"
                            colon={colon}
                            {...extra}
                            style={{ marginBottom: '10px' }}
                          >
                            <InputCom />
                          </Form.Item>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              );
            } else {
              const { input: InputCom, span = 4, offset = 0, style = {}, colon = false, ...extra } = item;
              return (
                <Col key={k} span={span} offset={offset} style={style}>
                  <Form.Item {...layout} labelAlign="rigth" colon={colon} {...extra} style={{ marginBottom: '10px' }}>
                    <InputCom />
                  </Form.Item>
                </Col>
              );
            }
          })}
        </Row>
        {children}
      </Form>
    );
  }, [filterItem, props.search, expandable, children]);
});
export default Filter;
