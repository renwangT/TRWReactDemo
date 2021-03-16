# umi project

## Getting Started

Install dependencies,

```bash
$ yarn install
```

Start the dev server,

```bash
$ yarn start
```

## 如何创建一个页面
1. 在 **src/routes/routesConfig.ts** 里配置相应的路由，保持路由，页面，model名称一致，采用的是umi的[约定式路由](https://umijs.org/zh-CN/docs/convention-routing)。
2. 在 **src/models** 下创建 **model**。
3. 在 **src/pages** 下，在路由对应的文件夹里创建页面

- **注意：** template 是模版，可以复制粘贴，需要修改的 👇
```
/src/models/template.ts
...
...
export const namespace = 'template'; // 这里是需要修改成相对于的页面
const { getList, add, update, remove } = createService(namespace);
...
...
// 这里是需要修改成路由的名称
const template: ModelType = {
  ...
  ...
};
// 这里是需要修改成路由的名称
export default template;

```
```
/src/models/template.ts

import React from 'react';
import { Table, Divider, Space, Button, Modal } from 'antd';
import { SearchOutlined, UndoOutlined, FileAddOutlined } from '@ant-design/icons';
import MixinComponent, { ComponentProps } from '@/components/MixinComponent';
import CustomFilter from '@/components/CustomFilter';
import CustomForm from '@/components/CustomForm';

import { namespace } from '@/models/template';  // 这个地方要修改成model的名称

import { connect } from 'umi';
...
...

```

## 如何使用Mock数据 实现增删改查
```
/mock/api.ts

let mockData = [{
    id: 1,
    userName: '唐仁旺',
    age: 26,
    sex: '男',
    job: 'web开发工程师',
    hobby: '游戏，游泳，兵乓球，羽毛球, 小动物'
}, {
    id: 2,
    userName: '龙傲天',
    age: 10,
    sex: '男',
    job: '学生',
    hobby: '吃鸡，王者'
}, {
    id: 3,
    userName: '徐雪',
    age: 18,
    sex: '女',
    job: '模特',
    hobby: '旅游，逛街，追剧'
}]
export default {
    'GET /api/users': (req: any, res: any) => {
        let { pageIndex, pageSize, ...query } = req.query;
        console.log('query:', query)
        let arr: any[] = [];

        if (Object.keys(query).length === 0) {
            arr = mockData;
        }
        for (let k in query) {
            mockData.forEach((item: any) => {
                if (item[k] == query[k]) {
                    let id = item.id;
                    if (!arr.some((val: any) => id === val.id)) {
                        arr.push(item)
                    }
                }
            })
        }
        res.send({
            data: arr,
            totalCount: 1,
            pageIndex: 1,
            pageSize: 10,
            success: true,
            errMessage: null
        })
    },
    'POST /api/users': (req: any, res: any) => {
        console.log('req:', req.body)
        let id = Math.random().toString(36).substr(2)
        mockData.push({ ...req.body, id })
        res.send(
            {
                data: null,
                success: true,
                errMessage: null
            }
        );
    },
    'PUT /api/users/:id': (req: any, res: any) => {
        console.log('req:', req.body)
        let { id } = req.params
        let index = mockData.findIndex((item: any) => item.id === id);
        mockData.splice(index, 1, req.body)
        res.send(
            {
                data: null,
                success: true,
                errMessage: null
            }
        );
    },
    'DELETE /api/users/:id': (req: any, res: any) => {
        let { id } = req.params
        let index = mockData.findIndex((item: any) => item.id === id);
        mockData.splice(index, 1)
        res.send(
            {
                data: null,
                success: true,
                errMessage: null
            }
        );
    }
}

```
