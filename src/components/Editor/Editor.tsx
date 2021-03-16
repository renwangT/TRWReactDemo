/***
 * 
 * --- 引入方式为本地引入
 *  -- 文件目录 跟文件 public/ueditor
 *  -- 引入地址 /src/pages/document.ejs
 *  -- <%= context.publicPath %> 为地址
 *  --  <script src="<%= context.publicPath %>ueditor/ueditor.config.js"></script>
        <script src="<%= context.publicPath %>ueditor/ueditor.all.js"></script>
        <script src="<%= context.publicPath %>ueditor/lang/zh-cn/zh-cn.js"></script>
 * 
 * ---  富文本源码修改
 * -- 找到ueditor.all.js 搜索 “修改位置”
 * 
 * 1、新增 token
 *   --在@/tools/editor.config文件新增headers:{'Authorization':Token}
 *   -- 搜索xhr.addEventListener('load' 上面写入一下代码 设置token
 *  if (me.options.headers && Object.prototype.toString.apply(me.options.headers) === "[object Object]") {
		for (var key in me.options.headers) {
		  xhr.setRequestHeader(key, me.options.headers[key])
		}
	}
 * 
 * 2、 请求返回的数据与富文本的格式不符合
 *  -- 修改 json.code === '000001' 修改为 json.code === '0000001' 增加一个0
 *  -- 修改 successHandler 函数设置值 
 *  -- var link = data.data.imgUrl 修改为 var link = data.data.imgUrl ? data.data.imgUrl : data.data,
 * **/

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { message } from 'antd';
import config from './/editor.config';
import styles from './editor.less';

interface XtableProps {
  content: any;
  height: number;
}

const Editor = (props: XtableProps, ref: any) => {
  const hotul = useRef<any | null>(null);
  let editor: any = null;

  let { content, height }: any = props;

  useImperativeHandle(
    ref,
    () => ({
      getContent: () => {
        return getContent();
      },
      setContent: (val: any) => {
        setContent(val);
      },
      execCommand: (cmd: any, val: any) => {
        execCommand(cmd, val);
      },
    }),
    [editor],
  );
  useEffect(() => {
    setEditor();
    return () => {
      UE.delEditor(hotul.current);
    };
  }, []);

  // ---- 获取编辑器html内容
  const getContent = () => {
    return editor ? editor.getContent() : '';
  };
  // ---- -追加编辑器内容
  const setContent = (val: any) => {
    editor && editor.setContent(val);
  };

  // ----- 在当前光标位置插入html内容
  const execCommand = (cmd: any, val: any) => {
    editor && editor.execCommand(cmd, val);
  };

  const setEditor = () => {
    if (!window.UE) {
      return message.error('编辑器加载失败！请刷新后重试！');
    }
    // editor = window.UE.getEditor(hotul.current)
    UE.delEditor(hotul.current);
    editor = UE.ui.Editor({
      ...config,
    });
    editor.render(hotul.current);
    editor.ready(() => {
      editor.setHeight(height);
      if (content) {
        editor.setContent(content);
      }
      // if (outputRules) {
      //   for (let outRule of outputRules) {
      //     editor.addOutputRule(outRule);
      //   }
      // }
    });
  };

  return (
    <>
      <div ref={hotul} className={styles['editor-box']}></div>
      {/* <script ref={hotul} id="editor" type="test/plain"></script> */}
    </>
  );
};

export default forwardRef(Editor);
