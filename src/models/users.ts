import commonModel, {
  CommonModelState,
  CommonModelEffects,
  CommonModeReducer,
  ObjectType,
} from '@/tools/commonModel';
import { Effect, Subscription } from 'umi';

export const namespace = 'users';

export interface State extends CommonModelState {}
export interface Effects extends CommonModelEffects {}
export interface Reducers extends CommonModeReducer {}
export interface ModelType {
  namespace: string;
  state: State;
  effects: Effects;
  reducers: Reducers;
  subscriptions: { setup: Subscription };
}

const generateModule = commonModel({ namespace });

const users: ModelType = {
  namespace,
  state: {
    ...generateModule.state,
  },
  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    ...generateModule.effects,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        // console.log('%clocation', 'background: green', location);
        if (location.pathname === '/basicData/users') {
          dispatch({
            type: 'setState',
            payload: {
              searchData: {},
              pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
              },
            },
          });
          dispatch({
            type: 'getList',
          });
        }
      });
    },
  },
};

export default users;
