import React from 'react';
import styles from './EditQuestionItem.css';
import ChooseQuestion from './ChooseQuestion.js';
import { Switch,Rate, Icon, Radio, Form, Input, Slider, Button, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 6,
    
  },
  wrapperCol: {
    span: 14,
   
  },
};
const formAddItemLayout = {
  labelCol: {
    span: 6,
    offset: 7
  },
  wrapperCol: {
    span: 14,
    offset: 7
  },
};
const typeArr = ['单选', '多选', '填空', '评分', '文本'];
const fillType = ['text', 'number', 'email'];

function EditQuestionItem({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  type = '单选',
  title = '',
  isReuired = false,
  options = [],
  defaultValue = [],
  index,
 }) {
   // 发送改变
  const changQuestion = (e) => {
    console.log(e.target);
    validateFields((errors) => {
      console.log(errors);
       if (errors) {
        return;
      }
       const data = {
        ...getFieldsValue(),
      };
      console.log(getFieldsValue());
      setTimeout(()=>{
        console.log(getFieldsValue());
      },0)
     });
  };
//  增加一个选项
 const add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  const optionsLabel = (index) => {
    switch (type) {
      case '单选':
      case '多选':
        return `选项${index+1}`;
      case '评分':
        return `评分内容${index}`;
      case '填空':
        return `填入要求${index}`;
      case '文本':
        return '字数限制';
    }
  };
  const optionsEle = (index) => {
    switch (type) {
      case '单选':
      case '多选':
        return <p><Input style={{width:'80%',marginRight:'20px'}} /><Icon
            className={styles.delBtn}
            type="minus-circle-o"
            onClick={() => remove(k)}
            style={{fontSize:'20px'}}
          /></p>
      case '评分':
        return <p><Input style={{width:'30%',marginRight:'20px'}} /><Rate character={<Icon type="heart" />} allowHalf />
                  <Icon
                      className={styles.delBtn}
                      type="minus-circle-o"
                      onClick={() => remove(k)}
                      style={{fontSize:'20px'}}
                    />
                </p>;
      case '填空':
        return (<RadioGroup size="large" key={`填空${index}`}>
                          {(() => {
                                  return fillType.map((item) => {
                                        return <RadioButton value={item} key={item + index}>{item}</RadioButton>;
                                      });
                                })()}
                        </RadioGroup>);
      case '文本':
        return <Slider range />;
    }
  };
  const addItemEle = (index) => {
    switch (type) {
      case '单选':
      case '多选':
      case '评分':
        return <FormItem {...formAddItemLayout}>
                  <Button type="dashed" onClick={add} style={{ width: '60%' }}>
                    <Icon type="plus" /> 增加选项
                  </Button>
                </FormItem>
      case '填空':
      case '文本':
        return '';
    }
  };
  return (
    <div >

      <Form layout="horizontal" className={styles.normal}>
        <div>
          <FormItem
            label="必填" {...formItemLayout}
          >
            {getFieldDecorator('isReuired', {
              initialValue: isReuired,
            })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={isReuired} onChange={changQuestion} />)}
          </FormItem>
          <div className={styles.del}>
            <Button style={{ padding: 5 }}>
              <Icon type="delete" />
            </Button>
          </div>
        </div>
        <FormItem
          label="题型" {...formItemLayout}
        >
          {getFieldDecorator('type', {
            initialValue: type,
          })(<RadioGroup size="large" onChange={changQuestion}>
            {(() => {
                return typeArr.map((item) => {
                      return <RadioButton value={item} key={item}>{item}</RadioButton>;
                    });
            })()}
          </RadioGroup>)}
        </FormItem>
        <FormItem
          label="题目" {...formItemLayout}
        >
          {getFieldDecorator('title', {
            initialValue: title,
          })(<Input />)}
        </FormItem>

        <div>选项内容</div>

        {(() => {
          return options.map((item, index) => {
            return (
              <FormItem
                label={optionsLabel(index)} {...formItemLayout}
                key={index}
              >
                {getFieldDecorator(`option${index}`, {
                  initialValue: item,
                })(optionsEle(index))}
              </FormItem>
            );
          });
        })()}
        {addItemEle(index)}
        <Button className={styles.icon}><Icon type="plus" style={{ transform: 'translate(0px,-4px)',fontSize:'30px' }} /></Button>
      </Form>
          <ChooseQuestion></ChooseQuestion>
    </div>
  );
}

export default Form.create()(EditQuestionItem);
