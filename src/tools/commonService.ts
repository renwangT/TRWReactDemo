import { request } from 'umi';

export default function (apiName: string) {
  const getList = (params: any) => {
    return request(`/api/${apiName}`, {
      method: 'get',
      params,
    });
  };
  const add = (params: any) => {
    return request(`/api/${apiName}`, {
      method: 'post',
      data: params,
    });
  };
  // _deleted
  const remove = (params: any) => {
    return request(`/api/${apiName}/${params.id}`, {
      method: 'delete',
      data: params,
    });
  };
  const update = (params: any) => {
    return request(`/api/${apiName}/${params.id}`, {
      method: 'put',
      data: params,
    });
  };

  return {
    getList,
    add,
    remove,
    update,
  };
}
