/*
 * @Description: 公告
 * @Author: 尚夏
 * @Date: 2021-07-28 16:51:21
 * @LastEditTime: 2021-08-12 17:05:49
 * @FilePath: /mining-admin-desktop/src/models/notice.ts
 */

import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface IndexModelState {
  // activeNotice: Record<string, unknown>;
  activeNotice: any;
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
    activeNotice: {},
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
