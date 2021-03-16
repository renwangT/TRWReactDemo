import { message } from 'antd';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
export interface ObjectType {
  [key: string]: any;
}
export interface ModalConfigType {
  confirmLoading: boolean;
  title: string;
  width: number | string;
  visible: boolean;
  maskClosable: boolean;
}
export interface CommonModelState {
  namespace: string;
  dataList: any[];
  searchData: ObjectType;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  loading: boolean;
  modalConfig: ModalConfigType;
  selectRow: any;
  modalInitialValues: ObjectType;
  isEdit: boolean;
}
export interface CommonModelEffects {
  search: Effect;
  add: Effect;
  remove: Effect;
  update: Effect;
  getList: Effect;
}
export interface CommonModeReducer {
  setState: Reducer<CommonModelState>;
  // 启用 immer 之后
  // setState: ImmerReducer<CommonModelState>;
}
export interface CommonModeSubscriptions {
  setup: Subscription;
}
export interface CommonModelType {
  state: CommonModelState;
  effects: CommonModelEffects;
  reducers: CommonModeReducer;
}
interface CommonModelArgument {
  namespace: string;
  add(params: any): Promise<any>;
  remove(params: any): Promise<any>;
  update(params: any): Promise<any>;
  getList(params: any): Promise<any>;
}
export default ({ namespace, add, remove, update, getList }: CommonModelArgument): CommonModelType => {
  return {
    state: {
      namespace,
      dataList: [],
      searchData: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      loading: true,
      modalConfig: {
        confirmLoading: false,
        title: '新增',
        width: 600,
        visible: false,
        maskClosable: false,
      },
      selectRow: {},
      modalInitialValues: {},
      isEdit: false, // 是否 编辑
    },
    reducers: {
      setState(state, action) {
        return { ...state, ...action.payload };
      },
    },
    effects: {
      *search({ payload }, { put, call, select }) {
        const { searchData, pagination } = payload;
        yield put({
          type: 'setState',
          payload: {
            searchData,
            pagination,
            loading: true,
            // pagination: {
            //   ...select((state: any) => state[namespace].pagination),
            //   current: 1,
            // },
          },
        });
        yield put({
          type: 'getList',
        });
      },
      *add({ payload }, { call, put, select }) {
        let state = yield select((state: ObjectType) => state[namespace]);
        let key = payload.key || 'modalConfig';
        yield put({
          type: 'setState',
          payload: {
            [key]: {
              ...state[key],
              confirmLoading: true,
            },
          },
        });
        try {
          const res: any = yield call(add, payload.params);
          if (res.success) {
            yield put({
              type: 'setState',
              payload: {
                [key]: {
                  ...state[key],
                  visible: false,
                  confirmLoading: false,
                },
              },
            });
            yield put({
              type: 'getList',
            });
          } else {
            yield put({
              type: 'setState',
              payload: {
                [key]: {
                  ...state[key],
                  confirmLoading: false,
                },
              },
            });
            // message.error(res.errMessage);
          }
        } catch (err) {
          yield put({
            type: 'setState',
            payload: {
              [key]: {
                ...state[key],
                confirmLoading: false,
              },
            },
          });
        }
      },

      *remove({ payload }, { call, put }) {
        try {
          const res: any = yield call(remove, payload.params);
          if (res.success) {
            yield put({
              type: 'getList',
            });
          }
        } catch (e) {}
      },

      *update({ payload }, { call, put, select }) {
        let state = yield select((state: ObjectType) => state[namespace]);
        let key = payload.key || 'modalConfig';
        yield put({
          type: 'setState',
          payload: {
            [`${key}`]: {
              ...state[key],
              confirmLoading: true,
            },
          },
        });
        try {
          const res: any = yield call(update, payload.params);

          if (res.success) {
            yield put({
              type: 'setState',
              payload: {
                [`${key}`]: {
                  ...state[key],
                  visible: false,
                  confirmLoading: false,
                },
              },
            });
            yield put({
              type: 'getList',
            });
            return;
          } else {
            yield put({
              type: 'setState',
              payload: {
                [`${key}`]: {
                  ...state[key],
                  confirmLoading: false,
                },
              },
            });
          }
        } catch (err) {
          yield put({
            type: 'setState',
            payload: {
              [`${key}`]: {
                ...state[key],
                confirmLoading: false,
              },
            },
          });
        }
      },

      *getList({ payload }, { call, put, select }) {
        let state = yield select((state: ObjectType) => state[namespace]);
        let { current: pageIndex, pageSize } = state.pagination;
        console.log('%cstate:', 'background: yellow', state);
        const params = {
          pageIndex,
          pageSize,
          ...state.searchData,
          // 排序
          // orderDirection: 'desc',
          // orderBy: 'updateTime',
        };
        try {
          // yield put({
          //   type: 'setState',
          //   payload: {
          //     loading: true,
          //   },
          // });
          const res: any = yield call(getList, params);
          if (res.success) {
            yield put({
              type: 'setState',
              payload: {
                dataList: res.data,
                pagination: {
                  ...state.pagination,
                  total: res?.totalCount,
                  current: res?.pageIndex,
                  pageSize: res?.pageSize,
                },
                loading: false,
                selectRow: state.selectRow.id ? res.data.find((item: any) => item.id === state.selectRow.id) || {} : {},
                modalInitialValues: state.modalInitialValues.id
                  ? res.data.find((item: any) => item.id === state.modalInitialValues.id) || {}
                  : {},
              },
            });
            yield put({
              type: 'getPagination',
            });
          } else {
            // yield put({
            //   type: 'setState',
            //   payload: {
            //     loading: false,
            //   },
            // });
          }
        } catch (err) {
          console.error(err);
          // yield put({
          //   type: 'setState',
          //   payload: {
          //     loading: false,
          //   },
          // });
        }
      },
    },
  };
};
