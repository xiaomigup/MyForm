import React from 'react';
import styles from './CheckboxShowCom.css';

import { Radio, Checkbox, Form, Icon, Input, Button } from 'antd';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const FormItem = Form.Item;
function CheckboxShowCom({
  ti,
  index
}) { 
  return (
    <FormItem className={styles.normal}>

            <div className={ti.isReuired ? styles.requireStar : ""}>{index} . {ti.title}</div>
            <CheckboxGroup options={ti.options} defaultValue={ti.defaultValue} />     
    </FormItem>
  );
}

export default CheckboxShowCom;
