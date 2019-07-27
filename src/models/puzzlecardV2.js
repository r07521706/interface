export default {
  namespace:'puzzlecardsV2',
  state:{
          data:[
                  {
                    id:1,
                    setup:'hi hi hi rinsen ',
                    punchline:'it final des yi die'
                  },
                  {
                    id:2,
                    setup:'hi hi hi rinsen ',
                    punchline:'it final des yi die'
                  }
                ],
          counter:100
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
