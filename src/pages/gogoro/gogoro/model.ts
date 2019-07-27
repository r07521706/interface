import { AnyAction , Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface StateType {
  [
    {key: string,
    workId: string,
    name: string,
    department: string,
    editable?: boolean,
    isNew?: boolean,}
  ]
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitAdvancedForm: Effect;
  };
  reducers: {
    addName: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formAdvancedForm',

  state: {},

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      // console.log(payload);
      // console.log('addName');
      console.log('here');
      yield call(fakeSubmitForm, payload);
      yield put({
        type:'addName',
        payload:payload
      })
      message.success('提交成功');
    },
  },

  reducers:{
      addName(state,{payload}) {
        // console.log('reducer');
        console.log('asd',payload);
        return {
          ...state,
          ...payload
        };
      },
  },

};

export default Model;
