import React,{Component} from 'react';
import {Card,Button} from 'antd';
import {connect} from 'dva' ;
import {Dispatch} from 'redux';

const namespace = 'puzzlecards';
const mapStateToProps = (state)=>{
  const cardList = state[namespace].data;
  return {
    cardList,
  };
};
//返回一個有使用到dispatch的方法
const mapDispatchToProps = (dispatch)=>{
  return {dispatch:dispatch,
          onClickAdd:(newCard)=>{
            const action = {
              type : `${namespace}/addNewCard`,
              payload : newCard,
            };
            dispatch(action);
          },
          onDidMount:()=>{
            dispatch({
              type:`${namespace}/queryInitCards`
            });
          },
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class PuzzleCardPage extends Component{
  componentDidMount(){
    this.props.onDidMount();
  }

  render(){

    return(
      <div>
        <Button onClick = {()=>this.props.dispatch(
          {type:'puzzlecards/a'}
          )}>
          get
        </Button>
        {
          this.props.cardList.map(card => {
            return (
              <Card key={card.id}>
                <div>Q: {card.setup}</div>
                <div>
                  <strong>A: {card.punchline}</strong>
                </div>
              </Card>
            );
          })
        }
        <div>
          <Button onClick = {()=>this.props.onClickAdd({
            setup:'add la model la',
            punchline: 'kao yao o this is model',
          })}> 添加卡片
          </Button>
        </div>
      </div>
    );
  }
}
