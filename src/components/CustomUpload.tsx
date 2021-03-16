import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { ACCESS_TOKEN } from '@/store/mutation-types';
const token = localStorage.getItem(ACCESS_TOKEN);
let Token: string = 'Bearer ' + token;
interface PropsType {
  onChange(newFileList: any): void;
  value: any[];
}
const Demo = (props: PropsType) => {
  const [fileList, setFileList] = useState<any[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    props.onChange && props.onChange(newFileList);
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow: any = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  useEffect(() => {
    setFileList(props.value || []);
  }, [props.value]);
  return (
    <ImgCrop rotate>
      <Upload
        action="/api/file/upload"
        headers={{ Authorization: Token }}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default Demo;
