import React from 'react';
import styles from './TxtareaShowCom.css';

import { Input, Form, Icon  , Button } from 'antd';


const FormItem = Form.Item;
function TxtareaShowCom({
  ti,index
}) { 
  return (
    <FormItem className={styles.normal}>
            <div className={ti.isReuired ? styles.requireStar : ""}>{index} . {ti.title}</div>
            <Input type="textarea" rows={4} style={{width:500}}/>     
    </FormItem>
  );
}
export default TxtareaShowCom;
