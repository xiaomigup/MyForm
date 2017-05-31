import React from 'react';
import { connect } from 'dva';
import styles from './EditTopicItem.css';
import ChooseQuestion from './ChooseQuestion.js';
import { Form, Input, InputNumber, Modal, Button,Icon } from 'antd';

class EditTopicItem extends React.Component {
   constructor(){
    super();
    this.state = {
      isChooseBoxShow : false,
    };
  }
  changeState = () => {
    this.setState({
      isChooseBoxShow : !this.state.isChooseBoxShow
    });
  }
  changeBoxshow = () => {
    let data = -1
    if(this.props.formModel.chooseBoxShow === -1){
      data = -2
    }
    console.log(data);
    this.props.dispatch({
          type: 'formModel/changeBoxshow',
          payload: data,
        });
  }
  render(){
  return (
    <div>
      <div className={styles.normal}>
          <div key="demo1">
          <div>请编辑问卷标题</div>
          <Input placeholder="请编辑问卷标题" className={styles.onforce} onBlur={this.props.changeTopic} defaultValue={this.props.defaultTopic} />
        </div>
        <div key="demo2">
          <div>请编辑问卷描述</div>
          <Input type="textarea" placeholder="请编辑问卷描述" className={styles.onforce} onBlur={this.props.changeIllustrate} defaultValue={this.props.defaultIll} />
        </div>
        <Button className={styles.icon}><Icon type="plus" style={{transform: 'translate(0px,-3px)',fontSize:'30px'}} onClick={this.changeBoxshow}/></Button>
      </div>
         {this.props.formModel.chooseBoxShow === -1 ? <ChooseQuestion  qId={-1} /> : ''} 
    </div>
   );
  }
}

export default connect(({ formModel }) => ({ formModel }))(EditTopicItem);
