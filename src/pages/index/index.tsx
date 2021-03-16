import React, { useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

import Editor from '@/components/Editor/Editor';


export default () => {
  const editor = useRef<any>()
  const confirm = () => {
    let content = editor.current.getContent();
    console.log(content)
  }
  return (
    <>
      <Editor ref={editor} content={'<p>item.contentdasdlas;ldk;alsd</p><p>dasdadsasldk;asldk;asl</p><p>d</p><p>as</p><p>d</p><p>asd</p><p>ads</p>'} height={600} />
      <Button onClick={confirm}>确认</Button>
    </>
  )
}