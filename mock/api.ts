let mockData = [
  {
    id: 1,
    userName: '唐仁旺',
    age: 26,
    sex: '男',
    job: 'web开发工程师',
    hobby: '游戏，游泳，兵乓球，羽毛球, 小动物',
  },
  {
    id: 2,
    userName: '龙傲天',
    age: 10,
    sex: '男',
    job: '学生',
    hobby: '吃鸡，王者',
  },
  {
    id: 3,
    userName: '徐雪',
    age: 18,
    sex: '女',
    job: '模特',
    hobby: '旅游，逛街，追剧',
  },
];
export default {
  'GET /api/users': (req: any, res: any) => {
    let { pageIndex, pageSize, ...query } = req.query;
    console.log('query:', query);
    let arr: any[] = [];

    if (Object.keys(query).length === 0) {
      arr = mockData;
    }
    for (let k in query) {
      mockData.forEach((item: any) => {
        if (item[k] == query[k]) {
          let id = item.id;
          if (!arr.some((val: any) => id === val.id)) {
            arr.push(item);
          }
        }
      });
    }
    res.send({
      data: arr,
      totalCount: 1,
      pageIndex: 1,
      pageSize: 10,
      success: true,
      errMessage: null,
    });
  },
  'POST /api/users': (req: any, res: any) => {
    console.log('req:', req.body);
    let id = Math.random().toString(36).substr(2);
    mockData.push({ ...req.body, id });
    res.send({
      data: null,
      success: true,
      errMessage: null,
    });
  },
  'PUT /api/users/:id': (req: any, res: any) => {
    console.log('req:', req.body);
    let { id } = req.params;
    let index = mockData.findIndex((item: any) => item.id === id);
    mockData.splice(index, 1, req.body);
    res.send({
      data: null,
      success: true,
      errMessage: null,
    });
  },
  'DELETE /api/users/:id': (req: any, res: any) => {
    let { id } = req.params;
    let index = mockData.findIndex((item: any) => item.id === id);
    mockData.splice(index, 1);
    res.send({
      data: null,
      success: true,
      errMessage: null,
    });
  },
};
