import React from 'react';
import styles from './FillShowCom.css';

import { Input, Form } from 'antd';

const FormItem = Form.Item;
function FillShowCom({
  ti,
}) {
  return (
    <FormItem className={styles.normal}>
      <div>{(() => {
         let i = 0;        
       return ti.title.split(/(\_{3,})/g).map((item) => {
          if(/^\_{3,}$/.test(item)){
            return <Input type={ti.options[i++]} key={i} style={{width:item.length*30,border:'none',borderBottom:'2px solid #000',borderRadius:'0'}}/>
          }else {
            return <span key={item}>{item}</span>
          }
        })
      })()}

    </div>
    </FormItem>
  );
}

export default FillShowCom;
