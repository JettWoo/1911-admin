import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import api from '../../api/api'
import Style from './login.module.less'
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  login = () => {
    console.log('登录')
    let { getFieldsValue, validateFields } = this.props.form

    // 获取输入的值，不管是否满足条件
    // let result = getFieldsValue()
    // console.log('result:', result)
    validateFields((err, data) => {
      // console.log('err:', err, 'data:', data)
      if (err) {
        // 输入错误
        message.error('输入有误，请重试')
      } else {
        message.success('登录成功，3s后跳转首页', 3, () => {
          this.props.history.replace('/admin')
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={Style['login-box']}>
        <div className={Style['login-form']}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            {/* 用户名 */}
            <Form.Item>
              {/* getFieldDecorator返回一个高阶组件，用于和表单进行双向数据绑定 */}
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' },
                        { min: 3, message: '用户名最小长度3位'},
                        { max: 9, message: '用户名最长9位'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            {/* 密码 */}
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>

            {/* 是否记住及登录 */}
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.login}>
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

// 通过Form下的create的方法将组件进行处理，会将antd里的方法注册到当前组件内
export default Form.create({ name: 'normal_login' })(Login);