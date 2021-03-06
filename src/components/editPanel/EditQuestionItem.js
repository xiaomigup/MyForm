import React from 'react';
import styles from './EditQuestionItem.css';
import ChooseQuestion from './ChooseQuestion.js';
import { Switch, Icon, Radio, Form, Input, Slider, Button, DatePicker, Select ,Rate} from 'antd';
import { connect } from 'dva';
import R from 'ramda'

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
    getFieldValue,
  },
  type = '单选',
  title = '',
  isReuired = false,
  options = [],
  defaultValue = [],
  index,
  qId,
  dispatch,
  formModel,
 }) {
   // 发送改变
  const changQuestion = (e) => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      setTimeout(() => {
        const data = {
          ...getFieldsValue(),
          index,
          qId,
          type,
          defaultValue,
        };
        if (type === '填空') {
          const arr = [];
          let i = 0;
          const str = getFieldValue('title');
          const myRe = /(\_{3,})/g;
          let myArray;
          while (myRe.exec(str) !== null) {
            arr[i] = options[i] || 'text';
            i++;
          }
          data.options = arr;
        }
        dispatch({
          type: 'formModel/changQuestion',
          payload: data,
        });
      }, 0);
    });
  };
  const changeBoxshow = () => {
    let data = qId
    if(formModel.chooseBoxShow === qId){
      data = -2
    }
    dispatch({
          type: 'formModel/changeBoxshow',
          payload: data,
        });
  }
  //  增加一个选项
 const addOptionItem = () => {
   dispatch({
          type: 'formModel/addOptionItem',
          payload: qId,
        });
  }
  const removeOptionItem = (index) =>{
    const data = {
      qId,
      index
    };
      dispatch({
          type: 'formModel/removeOptionItem',
          payload: data
      });
  }
  const delQuestion = () => {
    dispatch({
      type: 'formModel/delQuestion',
      payload: qId,
    });
  };
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
  const optionsEle = (item,index) => {
    switch (type) {
      case '单选':
      case '多选':
          return  <Input style={{width:'80%',marginRight:'20px'}}  onChange={changQuestion}/>
                    
                
      case '评分':
        return <Input style={{width:'30%',marginRight:'20px'}} onChange={changQuestion} />
                
              
      case '填空':
        return (<RadioGroup size="large" key={`填空${index}`} onChange={changQuestion}>
          {(() => {
            return fillType.map((item) => {
              return <RadioButton value={item} key={item + index} >{item}</RadioButton>;
            });
          })()}
        </RadioGroup>);
      case '文本':
        return <Slider range onAfterChange={changQuestion} />;
    }
  };
  const optionsAdd = (item,index) => {
    switch (type) {
      case '单选':
      case '多选':
          return  <Icon
                      className={styles.delBtn}
                      type="minus-circle-o"
                      onClick={removeOptionItem.bind(null,index)}
                      style={{fontSize:'20px'}}
                    />        
      case '评分':
        return   <span>
                    <Rate character={<Icon type="heart" />} allowHalf />
                    <Icon
                        className={styles.delBtn}
                        type="minus-circle-o"
                        onClick={removeOptionItem.bind(null,index)}
                        style={{fontSize:'20px'}}
                      />
                 </span>
      default : 
        return 
    }
  };
  const addItemEle = (index) => {
    switch (type) {
      case '单选':
      case '多选':
      case '评分':
        return (<FormItem {...formAddItemLayout} key={index}>
                  <Button type="dashed" onClick={addOptionItem} style={{ width: '60%' }}>
                    <Icon type="plus" /> 增加选项
                  </Button>
                </FormItem>);
      case '填空':
      case '文本':
        return '';
    }
  };
  return (
    <div style={{marginTop: 20}}>
      <div>第{index+1}题</div>
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
            <Button style={{ padding: 5,marginTop: 5 }}>
              <Icon type="delete" onClick={delQuestion} style={{fontSize:20}}/>
            </Button>
          </div>
        </div>
        <FormItem
          label="题型" {...formItemLayout}
        >
          <RadioGroup size="large">
            <RadioButton value={type}>{type}</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="题目" {...formItemLayout}
        >
          {getFieldDecorator('title', {
            initialValue: title,
          })(<Input onChange={changQuestion} />)}
        </FormItem>

        <div>选项内容</div>

        { options.map((item, index) => {
            return (
              <FormItem
                label={optionsLabel(index)} {...formItemLayout}
                key={index}
              >
                {getFieldDecorator(`options[${index}]`, {
                  initialValue: item,
                })(optionsEle(item,index))}
                {optionsAdd()}
              </FormItem>
            );
          })}
        {addItemEle(index)}
        <Button className={styles.icon}><Icon type="plus" style={{ transform: 'translate(0px,-3px)',fontSize:'30px'}} onClick={changeBoxshow}/></Button>
      </Form>
      {formModel.chooseBoxShow === qId ? <ChooseQuestion  qId={qId} /> : ''} 
    </div>
  );
}

export default connect(({ formModel }) => ({ formModel }))(Form.create()(EditQuestionItem));
