import React,{ Component } from 'react';
import { Form, Input,Select, Checkbox, Button } from 'antd';

import '../header.css';

const { Option } = Select;
  
class Register extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('dd: ' ,err)
            if (!err) {
                console.log('Received values of form: ', values);
                window.alert('注册成功')
                this.props.history.push('/login')
            }
        });
    }
    
    //用户名
    handleName = (rule, value, callback) => {
        const reg = /^[\w]{3,8}$/;
        if(!reg.test(value) && value !== '' && value !== undefined ) {
            callback('用户名填写有误')
        }
        callback()
    }

    //密码
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value }); //!!转换成bool
    }
    //校验密码
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
    }
    //填写密码
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    
    //邮箱
    handleEmail = (rule, value, callback) => {
        const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if(!reg.test(value) && value !== undefined && value !== '') {
            callback('邮箱填写有误')
        }
        callback() 
    }
    //手机号
    handlePhone = (rule, value, callback) => {
        const reg = /^1\d{10}$/
        if(!reg.test(value) && value !== undefined && value !== '') {
            callback('手机号填写有误')
        }
        callback()
    }
    //select
    handleSelectHonor = (value) => {
        console.log(value);
        // this.props.form.setFieldsValue({
        //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        // });
    }
      
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 8,
                    offset: 0,
                },
                sm: {
                    span: 8,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', { initialValue: '86',
        })(
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
        );

        return (
            <Form onSubmit={this.handleSubmit} style={{marginTop: '50px'}}>
                <Form.Item
                    {...formItemLayout}
                    label='Name'
                >
                    { getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入1-6位的英文、数字、下划线.', whitespace: true },
                            { validator: this.handleName } 
                        ],
                    })(
                        <Input type="text" />
                    )}
                </Form.Item>
    
                <Form.Item
                    {...formItemLayout}
                    label="Password"
                >
                    { getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    { getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [
                            // {type: 'email', message: 'The input is not valid E-mail!',}, 
                            {required: true, message: 'Please input your E-mail!'},
                            { validator: this.handleEmail }
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: true, message: 'Please input your phone number!' },
                            { validator: this.handlePhone } 
                        ],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                
                <Form.Item
                    {...formItemLayout}
                    label="Honor"
                >
                    { getFieldDecorator('honor', {
                        rules: [{ required: false, message: 'Please select your honor!' }],
                    })(
                        <Select
                            placeholder="Select a option"
                            onChange={this.handleSelectHonor}
                        >
                            <Option value="mamager">mamager</Option>
                            <Option value="employee">employee</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Role"
                >
                    { getFieldDecorator('role', {
                        rules: [{ required: false, message: 'Please select your role!' }],
                    })(
                        <Select
                            placeholder="Select a option"
                            onChange={this.handleSelectRole}
                        >
                            <Option value="admin">admin</Option>
                            <Option value="monitor">monitor</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">注册</Button>
                </Form.Item>
            </Form>
        );
    }
}


export default Form.create()(Register);