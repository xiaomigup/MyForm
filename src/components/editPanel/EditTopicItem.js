import React from 'react';
import { connect } from 'dva';
import styles from './EditTopicItem.css';
import ChooseQuestion from './ChooseQuestion.js';
import { Form, Input, InputNumber, Modal, Button,Icon } from 'antd';

class EditTopicItem extends React.Component {
   constructor({ changeTopic, defaultTopic, changeIllustrate, defaultIll }){
    super();
  }
  state = {
    isChooseBoxShow : false,
  };
  changeState = () => {
    this.setState({
      isChooseBoxShow : !isChooseBoxShow,
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
        <Button className={styles.icon}><Icon type="plus" style={{transform: 'translate(0px,-3px)',fontSize:'30px'}} onClick={this.changeState}/></Button>
      </div>
      <div className={ this.state.isChooseBoxShow ? styles.chooseBoxShow : "" } >
          <ChooseQuestion  qId={-1} />
      </div>
    </div>
   );
  }
}

export default connect()(EditTopicItem);
