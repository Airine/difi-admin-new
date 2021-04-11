import type { Effect, Reducer } from 'umi';

import { fakeSubmitForm } from './service';

export interface StateType {
  current?: string;
  step?: {
    selected: number;
    addr: string;
    bandwidth: number;
    burst: number;
    guaranteed: boolean;
  };
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formAndstepForm',

  state: {
    current: 'info',
    step: {
      selected: 0,
      addr: '0x0671a40872727Ff3c610DD287e88c5b3672A6b30',
      bandwidth: 512,
      burst: 50,
      guaranteed: true
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
  },
};

export default Model;
