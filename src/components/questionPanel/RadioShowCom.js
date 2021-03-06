import React from 'react';
import styles from './RadioShowCom.css';

import { Radio, Form, Icon, Input, Button } from 'antd';
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
function RadioShowCom({
  ti,index
}) { 
  return (
    <FormItem className={styles.normal}>
            <div className={ti.isReuired ? styles.requireStar : ""}>{index} . {ti.title}</div>
            <RadioGroup options={ti.options} defaultValue={ti.defaultValue[0]} />     
    </FormItem>
  );
}

export default RadioShowCom;
