import React from 'react';
import styles from './QuestionPanel.css';
import { connect } from 'dva';
import CheckboxShowCom from './CheckboxShowCom.js';
import RadioShowCom from './RadioShowCom.js';
import RateShowCom from './RateShowCom.js';
import FillShowCom from './FillShowCom.js';
import TxtareaShowCom from './TxtareaShowCom.js';

import { Radio, Checkbox, Form, Icon, Input, Button } from 'antd';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;


function QuestionPanel({ formModel }) {
  const handleSubmit = () => {
    console.log(this);
  };
  // 返回单选题
   return (
    <div style={{ overflow: 'auto', width: '100%', height: '100%' ,padding:100,background:'#f7f7f7'}}>

        <div style={{fontSize:30,textAlign:'center'}}>{formModel.topic}</div>
        <p className={styles.illustrate}>{formModel.illustrate}</p>
      <Form onSubmit={handleSubmit} className="login-form">
        {(() => {
          return formModel.question.map((item) => {
            switch (item.type) {
              case '单选':
                return <RadioShowCom ti={item} key={item.qId} />;
                break;
              case '多选':
                return <CheckboxShowCom ti={item} key={item.qId} />;
                break;
              case '评分':
                return <RateShowCom ti={item} key={item.qId} />;
                break;
              case '填空':
                return <FillShowCom ti={item} key={item.qId} />;
                break;
              case '文本':
                return <TxtareaShowCom ti={item} key={item.qId} />;
                break;
              default:
                break;
            }
          })
        })()}
      </Form>
    </div>
  );
}

export default connect(({ formModel }) => ({ formModel }))(QuestionPanel);
