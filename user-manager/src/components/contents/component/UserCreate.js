import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../userManager.css';
import 'whatwg-fetch';
//添加用户
class StaffFooter extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            phone: '',
            honor: '',
            role: '',
            descrip: ''
        }
    }
    handleInputChange(field, value, type) {
        // if (type === 'number') {
        //   value = +value;
        // }
        this.setState({
          [field]: value
        });
    }
    handleAddClick(e) {
        e.preventDefault();

        let item = {};
        let addForm = ReactDOM.findDOMNode(this.refs.addForm);
        item.email = addForm.querySelector('#staffAddEmail').value.trim();
        item.phone = addForm.querySelector('#staffAddPhone').value.trim();
        console.log('dd', item)
       
        // alert(JSON.stringify(this.state));   
        const { name, password, email, phone, honor, role, descrip } = this.state;
        // alert(JSON.stringify(this.state))
        fetch('http://127.0.0.1:8001/user', {
            method: 'post',
            body: JSON.stringify({
                name,
                password,
                email,
                phone,
                honor,
                role,
                descrip
            }),
            headers: {"Content-Type": "application/json:charset=utf-8"}
        })
        .then( (res) => {
            return res.json()
        })
        .then( (user) => {
            console.log(user)
            if(item.email === '' && item.phone === '' ) {
                let tips = ReactDOM.findDOMNode(this.refs.tipsSelect);
                tips.style.display = 'block';
                setTimeout(function() {
                    tips.style.display = 'none';
                }, 1000);
            }else {
                if(user.info[1].key) {
                    window.alert('添加用户成功');
                    this.setState({
                        name: '',
                        password: '',
                        email: '',
                        phone: '',
                        honor: '',
                        role: '',
                        descrip: ''
                    });
                    this.props.history.push('/user');
                }else {
                    alert('添加失败');
                }
            }  
        }).catch((err) => {
            console.error(err)
        }) 


    }

    // handleAddClick(e){
    //     e.preventDefault();
    //     let item = {};
    //     let addForm = ReactDOM.findDOMNode(this.refs.addForm);
    //     let honor = addForm.querySelector('#staffAddSex');
    //     let role = addForm.querySelector('#staffAddId');
    //     item.name = addForm.querySelector('#staffAddName').value.trim();
    //     item.password = addForm.querySelector('#staffAddAge').value.trim();
    //     item.email = addForm.querySelector("#staffAddEmail").value.trim();
    //     item.phone = addForm.querySelector("#staffAddPhone").value.trim();
    //     item.descrip = addForm.querySelector('#staffAddDescrip').value.trim();
    //     item.honor = honor.options[honor.selectedIndex].value;
    //     item.role = role.options[role.selectedIndex].value;

    //     //表单校验
    //     if(item.name === '' || item.password === '' || item.descrip === '' || item.email === '' || item.phone === ''){
    //         let tips = ReactDOM.findDOMNode(this.refs.tipsUnDone);
    //         tips.style.display = 'block';
    //         setTimeout(function(){
    //             tips.style.display = 'none';
    //         }, 1000);
    //         return;
    //     }

    //     let numreg = /^\d+$/;
    //     if(!numreg.test(item.password)){
    //         let tips = ReactDOM.findDOMNode(this.refs.tipsUnAge);
    //         tips.style.display = 'block';
    //         setTimeout(function(){
    //             tips.style.display = 'none';
    //         }, 1000);
    //         return;
    //     }
    //     addForm.reset();

    //     //创建成功提示
    //     let tips = ReactDOM.findDOMNode(this.refs.tips);
    //     tips.style.display = 'block';
    //     setTimeout( () => {
    //         tips.style.display = 'none';
    //         // this.props.history.push('/user')
    //     }, 1000);
    // }

  
    render() {
        const { name, password, email, phone, honor, role, descrip } = this.state;
        return (
            <div>
                <h4 style={{'textAlign':'center'}}>新增用户</h4>
                <hr/>
                <form ref='addForm' className="addForm" onSubmit={(e) => this.handleAddClick(e)}>
                    <div className = "newTable">
                        <label htmlFor='staffAddName' className = "newLable" style={{'display': 'inline-block', marginRight:'10px'}}>用户名</label>
                        <input 
                            ref='addName' 
                            id='staffAddName' 
                            type='text' 
                            placeholder='Your Name' 
                            value={name}
                            onChange={(e) => {return this.handleInputChange('name', e.target.value)}}
                        />
                    </div>
                    <div className = "newTable">
                        <label htmlFor='staffAddAge' className = "newLable" style={{'display': 'inline-block', marginRight:'10px'}}>密码</label>
                        <input 
                            ref='addAge' 
                            id='staffAddAge' 
                            type='password' 
                            placeholder='Your Password' 
                            value={password}
                            onChange={(e) => this.handleInputChange('password', e.target.value)}
                        />
                    </div>
                    <div className = "newTable">
                        <label htmlFor='staffAddEmail' className = "newLable" style={{'display': 'inline-block', marginRight:'10px'}}>邮箱</label>
                        <input 
                            ref='addEmail' 
                            id='staffAddEmail' 
                            type='email' 
                            placeholder='Your Email' 
                            value={email}
                            onChange={(e) => this.handleInputChange('email', e.target.value)}
                        />
                    </div>
                    <div className = "newTable">
                        <label htmlFor='staffPhone' className = "newLable" style={{'display': 'inline-block', marginRight:'10px'}}>手机号</label>
                        <input 
                            ref='addPhone' 
                            id='staffAddPhone' 
                            type='text' 
                            placeholder='Your Phone' 
                            value={phone}
                            onChange={(e) => this.handleInputChange('phone', e.target.value)}
                        />
                    </div>
                    <div className = "newTable">
                        <label htmlFor='staffAddSex' className = "newLable" style={{'display': 'inline-block', marginRight:'10px'}}>头衔</label>
                        <select ref='addSex' id='staffAddHonor' value={honor} onChange={(e) => this.handleInputChange('honor', e.target.value)}>
                            <option value="">请选择</option>
                            <option value='manager'>manager</option>
                            <option value='employee'>employee</option>
                        </select>
                    </div>
                    <div className = "newTable">
                        <label htmlFor='staffAddId' className = "newLable" style={{'display': 'line-block', marginRight:'10px'}}>角色</label>
                        <select ref='addId' id='staffAddRole' value={role} onChange={(e) => this.handleInputChange('role', e.target.value)}>
                            <option value="">请选择</option>
                            <option value='admin'>admin</option>
                            <option value='mointor'>monitor</option>
                        </select>
                    </div>
                    <div className = "newTable">
                        <label htmlFor='staffAddDescrip' className = "newLable" style={{'display': 'inline-block', marginRight:'10px', verticalAlign:'14px'}}>用户描述</label>
                        <textarea 
                            ref='addDescrip' 
                            id='staffAddDescrip' 
                            type='text' 
                            value={descrip}
                            onChange={(e) => this.handleInputChange('descrip', e.target.value)}
                        >
                        </textarea>
                    </div>
                    <p ref='tipsSelect' className='tips-mes'>邮箱、手机号必序填一项</p>
                    <div className = "newTable">
                        <button type="submit">提交</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default StaffFooter;
