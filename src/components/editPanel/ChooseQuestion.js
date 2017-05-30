import React from 'react';
import styles from './ChooseQuestion.css';
import { Button, Radio } from 'antd';
import { connect } from 'dva';


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function ChooseQuestion({ dispatch ,qId}) {
  const addQuestion = (qId,type) => {
      const options = (() => {
        switch (type) {
          case '单选':
            return ['选项内容1', '选项内容2'];
          case '多选':
            return ['选项内容1', '选项内容2'];
          case '评分':
            return ['评分内容1', '评分内容2'];
          case '文本':
            return [[10,100]];
          case '填空':
            return [];
          default:

            break;
        }
      })();
      const data = {
        thisqId: qId,
        type,
        title: '请输入问题',
        isReuired: false,
        options,
        defaultValue : []
      };
      dispatch({
        type: 'formModel/addQuestion',
        payload: data,
      });
  };
  const question = ['单选', '多选', '填空', '文本', '评分'];
  const add = (e) => {
    addQuestion(qId,e.target.value)
  };
  const questionEle = question.map((item,index) => {
    return (
      <RadioButton key={index} value={item}>{item}</RadioButton>
    );
  });
  return (
    <div className={styles.normal}>
      <RadioGroup size="large" onChange={add}>
        {questionEle}

      </RadioGroup>
    </div>
  );
}

export default connect()(ChooseQuestion);
