import React from 'react';
import styles from './RateShowCom.css';

import { Rate, Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;
function RateShowCom({
  ti,
}) {
  return (
    <FormItem className={styles.normal}>
      <div className={ti.isReuired ? styles.requireStar : ""}>{ti.qId} . {ti.title}</div>
      {(() => {
              return ti.options.map((item) => {
                if(item && item !== ""){

                    return (<div key={item} >
                      <span style={{paddingRight:10}}>{item}</span>
                      <Rate character={<Icon type="heart"/>} allowHalf />
                    </div>);
                }
              });
            })()}
    </FormItem>
  );
}

export default RateShowCom;
