import React from 'react';
import { connect } from 'dva';
import styles from './SignIn.css';
import Header from '../components/Header';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class SignIn extends React.Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
         this.props.dispatch({ type: 'signin/signin', payload: values })
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一样!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  checkNickname = (e) => {
     const value = e.target.value;
     this.props.dispatch({ type: 'signin/checkNickname', payload: {nickname:value} });
  }
  checkEmail = (e) => {
     const value = e.target.value;
     this.props.dispatch({ type: 'signin/checkEmail', payload: {email:value} });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };


    const websiteOptions = autoCompleteResult.map((website) => {
      return <AutoCompleteOption key={website}>{website}</AutoCompleteOption>;
    });

    return (
      <div> 
      <Header></Header>
          <Form onSubmit={this.handleSubmit} className={styles.signinForm}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  昵称&nbsp;
                </span>
              )}
              hasFeedback
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入您的昵称!', whitespace: true }],
              })(
                <Input onBlur={this.checkNickname}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="邮箱"
              hasFeedback
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '请输入正确的邮箱地址!',
                }, {
                  required: true, message: '请输入邮箱地址!',
                }],
              })(
                <Input onBlur={this.checkEmail}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" onBlur={this.checkPasswordStrength}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '请确认您的密码!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" size="large" >注册</Button>
            </FormItem>
          </Form>
      </div>
    );
  }
}

function mapStateToProps({signin}) {
  return ({signin});
}

export default connect(mapStateToProps)(Form.create()(SignIn));
