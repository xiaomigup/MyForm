import React from 'react';
import styles from './EditTopicItem.css';
import ChooseQuestion from './ChooseQuestion.js';
import { Form, Input, InputNumber, Modal, Button,Icon } from 'antd';
function EditTopicItem({ changeTopic, defaultTopic, changeIllustrate, defaultIll }) {
  return (
    <div>
      <div className={styles.normal}>
          <div key="demo1">
          <div>请编辑问卷标题</div>
          <Input placeholder="请编辑问卷标题" className={styles.onforce} onBlur={changeTopic} defaultValue={defaultTopic} />
        </div>
        <div key="demo2">
          <div>请编辑问卷描述</div>
          <Input type="textarea" placeholder="请编辑问卷描述" className={styles.onforce} onBlur={changeIllustrate} defaultValue={defaultIll} />
        </div>
        <Button className={styles.icon}><Icon type="plus" style={{transform: 'translate(0px,-4px)',fontSize:'30px'}}/></Button>
      </div>
       <ChooseQuestion></ChooseQuestion>
    </div>
  );
}

export default EditTopicItem;
