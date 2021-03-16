import React from 'react';

const fontSize = 14;

const TableColumnTitle = ({ title }: any) => {
  return <div style={{ minWidth: title.length * fontSize + 'px' }}>{title}</div>;
};
export default TableColumnTitle;
