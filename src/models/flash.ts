/*
 * @Description: 快讯
 * @Author: 尚夏
 * @Date: 2021-11-22 15:39:13
 * @LastEditTime: 2021-11-22 15:39:13
 * @FilePath: /mining-admin-desktop/src/models/flash.ts
 */
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface IndexModelState {
  activeFlash: any;
}

export interface IndexModelType {
  namespace?: boolean;
  state: IndexModelState;
  effects: {
    // query: Effect;
  };
  reducers: {
    updateState: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  state: {
    activeFlash: {},
  },
  effects: {
    // *query({ payload }, { call, put }) {},
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default IndexModel;
