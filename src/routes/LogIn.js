import React from 'react';
import { connect } from 'dva';
import styles from './LogIn.css';
import { Link } from 'dva/router';
import Header from '../components/Header';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class LogIn extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({ type: 'login/login', payload: values })
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    
    const formItemLayout = {
      labelCol: {
        sm: { span: 4,offset: 9},
      },
      wrapperCol: {
        sm: { span: 4,offset: 9 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 4,
          offset: 9,
        },
        sm: {
          span: 4,
          offset: 9,
        },
      },
    };
    return (
      <div>
        <Header></Header>
        <div className={styles.container}> 
        <Form onSubmit={this.handleSubmit} className={styles.SigninForm}>
          <FormItem  {...formItemLayout}>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入您的用户名或邮箱地址!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem  {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            <a className={styles.login_form_forgot} href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className={styles.login_form_button} >
              登录
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/SignIn">马上注册</Link>
          </FormItem>
        </Form>
        </div>
     </div>
    );
  }
}

function mapStateToProps({login}) {
  return ({login});
}

export default connect(mapStateToProps)(Form.create()(LogIn));
