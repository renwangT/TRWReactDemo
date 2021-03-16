import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface AppModelState {
}

export interface AppModelType {
  namespace: 'app';
  state: AppModelState;
  effects: {
    getUserInfo: Effect
  };
  reducers: {
    setState: Reducer<AppModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}
const AppModel: AppModelType = {
  namespace: 'app',
  state: {

  },
  effects: {
    // 获取用户详情
    *getUserInfo({ payload }, { call, put }) {
      try {
          // let res = yield call(getUserDetails);
          let res = {
            success: true,
            data: {
              userName: '唐仁旺'
            }
          }
          if (res.success) {
            yield put({
              type: 'setState',
              payload: {
                userAgentInfo: {
                  
                },
              },
            });
          }
      } catch (e) { console.error(e) }
    }
    
  },
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'getUserInfo',
          });
        }
      });
    },
  },
};

export default AppModel;
