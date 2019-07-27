import { AnyAction , Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface StateType {
  users?:[
    { key: string,
      username: string,
      url: string
    }
  ],
  // [
  //   { key: string,
  //     username: string,
  //     url: string
  //   }
  //
  // ]
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
  namespace: 'ProductList',

  state: {
    users: [],
    product: []
  },

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
      addProduct(state,{payload}) {
        // console.log('reducer');
        console.log('asd',payload);
        console.log('st',state);

        state.users.push(payload);
        console.log('state',state.users);
        return {
          users: state.users
        };
      },
  },

};

export default Model;
