import React from 'react';
import { Select } from 'antd';
import { request } from 'umi';

const { Option } = Select;
// 配件类型
const materialTypeMap = [
  {
    label: '配件',
    value: 1,
  },
  {
    label: '附件',
    value: 2,
  },
  {
    label: '标件',
    value: 3,
  },
];
let timeout: any;
let currentValue: any;

function fetch(value: any, callback: any) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    request(`/api/material?keyWords=${value}`).then(res => {
      if (currentValue === value) {
        if (res.success) {
          callback(res.data);
        } else {
          callback([]);
        }
      }
    });
  }

  timeout = setTimeout(fake, 300);
}
interface Props {
  placeholder?: string;
  style?: any;
  value?: string | undefined;
  onChange?: (v: any) => any;
}
class SearchInput extends React.Component<Props, any> {
  state = {
    data: [],
    value: undefined,
  };
  componentDidMount() {
    console.log('this.props.value:', this.props.value);
    this.setState({
      value: this.props.value,
    });
  }
  handleSearch = (value: any) => {
    if (value) {
      fetch(value, (data: any[]) => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleChange = (value: any) => {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    const options = this.state.data.map((d: any) => {
      let materialType = materialTypeMap.find((item: any) => item.value === d.materialType)?.label;
      let value = JSON.stringify(d);
      return (
        <Option key={d.id} value={value}>
          {`${d.materialCode} ${d.materialName} ${materialType}`}
        </Option>
      );
    });
    return (
      <Select
        showSearch
        value={this.props.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  }
}

export default SearchInput;
