import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import '../header.css';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPwd: ''
        }
        this.handleChangeLoginName = this.handleChangeLoginName.bind(this);
        this.handleChangeLoginPwd = this.handleChangeLoginPwd.bind(this);
        this.handleClickBtn = this.handleClickBtn.bind(this);
    }

    handleChangeLoginName(e) {
        // console.log(e.target.value);
        this.setState({
            userName: e.target.value
        })
    }

    handleChangeLoginPwd(e) {
        // console.log(e.target.value);
        this.setState({
            userPwd: e.target.value
        })
    }

    handleClickBtn() {
        this.getConnect()
    }

    //api请求函数
    getConnect() {
        //获取数据
        let text = {userName: this.state.userName, userPwd: this.state.userPwd}
        //重要！将对象转换成json字符串
        let send = JSON.stringify(text);
        fetch(`http://127.0.0.1:8001/password`, {
            method: "POST",
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: send
        }).then( res => res.json())
          .then( data => {

                if(data.success) {
                    window.alert('验证成功，欢迎登录')
                    // return <Redirect exact to="/" />  需要写在render中，因为Redirect是一个组件
                    this.props.history.push('/user')
                }else{
                    window.alert('验证失败，用户名或密码错误')
                }

            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <div className="login-form-wrapper">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {
                            getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input 
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                    onChange={this.handleChangeLoginName} 
                                    placeholder="Username" 
                                />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input 
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"  
                                    onChange={this.handleChangeLoginPwd}
                                    placeholder="Password" 
                                />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )
                        }
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="login-form-button"
                            onClick={this.handleClickBtn}
                        >
                            Log in
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </FormItem>
                </Form>
            </div>
        )   
    } 
}
export default Form.create()(Login);