import React from 'react';
import styles from './ChooseQuestion.css';
import { Button } from 'antd';
function ChooseQuestion() {
  const question = ['单选', '多选', '填空', '文本', '评分'];
  const questionEle = question.map((item) => {
    return (
      <Button key={item} size="large" style={{ marginRight: 10, borderRadius: '0' }}>{item}</Button>
    );
  });
  return (
    <div className={styles.normal}>
      {questionEle}
    </div>
  );
}

export default ChooseQuestion;
