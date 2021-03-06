import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import { Link, routerRedux } from 'dva/router';
import './Login.less';
import bg from '../../assets/bg.jpg';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    userName: 'guest',
    password: 'guest'
  }
  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(routerRedux.replace('/list'));
        console.log('Received values of form: ', values);
        sessionStorage.setItem('guest', values.userName)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { userName, password } = this.state;
    const sty = {
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      height: '100%',
      width: '100%',
      position: 'relative'
    }
    return (
      <div style={sty}>
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width: 300, padding: '30px 15px 15px', background: 'darkgray', position: 'absolute', left: '50%', top: '50%', transform: 'translateX(-50%) translateY(-50%)', backgruondColor: '#fff'}}>
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue: userName
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue: password
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.handleSubmit} htmlType="submit" className="login-form-button" style={{width:'100%'}}>
             <Link to={{ pathname: '/list'}}>Log in</Link>
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default connect()(Login);
