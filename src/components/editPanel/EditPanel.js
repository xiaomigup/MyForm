import React from 'react';
import styles from './EditPanel.css';
import { Form, Input, InputNumber, Modal, DatePicker } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
const FormItem = Form.Item;
import EditQuestionItem from './EditQuestionItem';
import EditTopicItem from './EditTopicItem';
function EditPanel(props) {
  // 点击确定按钮
  // 传给标题的信息
  const topicProps = {
    changeTopic(e) {
      props.dispatch({
        type: 'formModel/changeTopic',
        payload: e.target.value,
      });
    },
    changeIllustrate(e) {
      props.dispatch({
        type: 'formModel/changeIllustrate',
        payload: e.target.value,
      });
    },
    defaultTopic: props.formModel.topic,
    defaultIll: props.formModel.illustrate,
  };

  const EditQuestionItemArr = props.formModel.question.map((item,index) => {
    return <EditQuestionItem {...item} key={item.qId} index={index} />
  })
  return (
    <div className={styles.normal}>
        <QueueAnim >
          <EditTopicItem {...topicProps} />
        </QueueAnim>
        {EditQuestionItemArr}
      </div>
  );
}


export default connect(({ formModel }) => ({ formModel }))(EditPanel);
