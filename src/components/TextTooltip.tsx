import React from 'react';
import { Tooltip, message } from 'antd';

const TextTooltip = (props: any) => {
  const { content, copy = false, width = 'auto' } = props;
  const clickCopy = (): void => {
    // if( !c || window.copy ) return
    // console.log(window.copy)
    // if(window.copy) {
    //   window.copy(content)
    // }
    // message.success('复制成功')
  };
  return (
    <Tooltip title={content}>
      <p onClick={clickCopy} className="ellipsis" style={{ margin: 0, width }}>
        {content}
      </p>
    </Tooltip>
  );
};

export default TextTooltip;
