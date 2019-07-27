import request from '../utils/request';

const delay = (milisecond)=>{
  return new Promise((resolve)=>{
    setTimeout(resolve,milisecond);
  });
};



export default {
  namespace:'puzzlecards',
  state:{
          data:[],
          counter:10
        },
  effects:{
    *queryInitCards(_,sagaEffects){
      const {call,put} = sagaEffects;
      const endPointURI = '/dev/random_joke';
      const puzzle = yield call(request, endPointURI);
      console.log(puzzle);
      yield put({ type: 'addNewCard', payload: puzzle.data[0] });
      yield call(delay,10000);
      yield put({ type: 'addNewCard', payload: puzzle.data[1] });

    }
  },
  reducers:{
    addNewCard(state,{payload:newCard}){
      const nextCounter = state.counter+1;
      const nextCardWithId = {...newCard,id:nextCounter};
      const nextData = state.data.concat(nextCardWithId);

      return{
        data:nextData,
        counter:nextCounter,
      }
    },

    a(state){

          var request = new XMLHttpRequest();
          request.open('GET', `http://localhost:7000/`, true);
          request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
              // Success!
              console.log(request.responseText);
            }
          };
          request.send();
      return state;
    }
  }

};
