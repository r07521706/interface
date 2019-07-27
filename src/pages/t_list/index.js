import React from 'react';
import {connect} from 'dva';
import { Table, Modal, Button, Form, Input } from 'antd';
import  SampleChart  from '../../components/SampleChart';
const FormItem = Form.Item;
function mapStateToProps(state) {
  return {
    cardsList: state.cards.cardsList,
    cardsLoading: state.loading.effects['cards/queryList'], //這邊管的事 當用戶觸發 cards/queryList這個事件的時候 立馬綁定dva模型的loading條件
    
  };
}
class List extends React.Component{
  state = {
    visible:false,
    statisticVisible:false,
    id:null,
  };
  
  
  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '链接',
      dataIndex: 'url',
      render: value => <a href={value}>{value}</a>,
    },
    {
      title:'',
      dataIndex:'_',
      render:(_,{id})=>{
        return(<Button onClick={()=>{this.showStatic(id);}}>0.0</Button>);
      }
    },
  ];
 
  componentDidMount() {
    this.props.dispatch({
      type: 'cards/queryList',
    });
  }
  showModal = () => {
    console.log('hi');
    this.setState({ statisticVisible: true });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  handleOk = ()=>{
    const {dispatch,form:{validateFields}} = this.props;
    validateFields((err,values)=>{
      if(!err){
        dispatch({
          type:'cards/addOne',
          payload:values,
        });
        this.setState({visible:false});
      }
    })
  }
  
  showStatistic = (id)=>{
    this.props.dispatch({
      type:'cards/getStatistic',
      payload:id,
    });
    this.setState({ id, statisticVisible:true  });
    
  }

  handleStatisticCancel=()=>{
    this.setState({
      statisticVisible: false,
    });
  }

  render() {
    const {form:{getFieldDecorator}} = this.props;
    const { cardsList, cardsLoading } = this.props;
    const { statisticVisible, id } = this.state;
    const { statistic } = this.props;
    return (
      <div>
        <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
        <Button onClick={this.showModal}>新建</Button>
        <Modal title = '新建紀錄' visible = {this.state.visible} onCancel={this.handleCancel} onOk={this.handleOk} 
        onCancel = {this.handleCancel} >
          <Form>
            <FormItem label='名稱'>
              {getFieldDecorator('name',{rules:[{required:true}],})(
                <Input></Input>
              )}
            </FormItem>
            <FormItem label='描述'>
              {getFieldDecorator('desc')(
                  <Input></Input>
                )
              }
            </FormItem>
            <FormItem label='鏈接'>
              {getFieldDecorator('url',{rules:[{type:'url'}],})(
                  <Input></Input>
                )
              }
            </FormItem>
          </Form>
        </Modal>
        
        <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
          {JSON.stringify(statistic)}
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Form.create()(List));
