import React from 'react';
import styles from './FillShowCom.css';

import { Input, Form } from 'antd';

const FormItem = Form.Item;
function FillShowCom({
  ti,index
}) {
  return (
    <FormItem className={styles.normal}>
      <div className={ti.isReuired ? styles.requireStar : ""}>{index} . {ti.type}</div>
      <div>{(() => {
         let i = 0;        
       return ti.title.split(/(\_{3,})/g).map((item,index) => {
          if(/^\_{3,}$/.test(item)){
            return <Input type={ti.options[i++]} key={index} style={{width:item.length*30,border:'none',borderBottom:'2px solid #000',borderRadius:'0'}}/>
          }else {
            return <span key={index}>{item}</span>
          }
        })
      })()}

    </div>
    </FormItem>
  );
}

export default FillShowCom;
