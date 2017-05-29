import React from 'react';
import styles from './RateShowCom.css';

import { Rate, Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;
function RateShowCom({
  ti,
}) {
  return (
    <FormItem className={styles.normal}>
      <div>{ti.title}</div>
      {(() => {
              return ti.options.map((item) => {
                return (<div key={item} >
                  <span>{item}</span>
                  <Rate character={<Icon type="heart" />}  allowHalf />
                </div>);
              });
            })()}
    </FormItem>
  );
}

export default RateShowCom;
