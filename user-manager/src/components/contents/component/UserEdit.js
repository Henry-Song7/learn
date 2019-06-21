import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../userManager.css'
class StaffEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info: []
        };
        this.allData = []
    }
    handleEdit(){
        let item = {};
        let editTabel = ReactDOM.findDOMNode(this.refs.editTabel);
        let honor = editTabel.querySelector('#staffEditHonor');
        let role = editTabel.querySelector('#staffEditRole');

        item.name = editTabel.querySelector('#staffEditName').value.trim();
        item.password = editTabel.querySelector('#staffEditAge').value.trim();
        item.email = editTabel.querySelector('#staffEditEmail').value.trim();
        item.phone = editTabel.querySelector('#staffEditPhone').value.trim();

        item.descrip = editTabel.querySelector('#staffEditDescrip').value.trim();
        item.honor = honor.options[honor.selectedIndex].value;
        item.role = role.options[role.selectedIndex].value;
        // item.key = this.props.staffDetail.key;

        /*
         *表单验证
         */
        if(item.name === '' || item.password === '' || item.descrip === '' || item.email === '' || item.phone === '') {
            let tips = ReactDOM.findDOMNode(this.refs.DtipsUnDone);
            tips.style.display = 'block';
            setTimeout(function(){
                tips.style.display = 'none';
            }, 1000);
            return;
        }
        //非负整数
        let numReg = /^\d{3,8}$/;
        if(!numReg.test(item.password)) {
            let tips = ReactDOM.findDOMNode(this.refs.DtipsUnAge);
            tips.style.display = 'block';
            setTimeout(function(){
                tips.style.display = 'none';
            }, 1000);
            return;
        }

        // this.props.editDetail(item);

        //此处应在返回修改成功信息后确认
        let tips = ReactDOM.findDOMNode(this.refs.Dtips);
        tips.style.display = 'block';
        setTimeout( () => {
            tips.style.display = 'none';
        }, 1000);
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8001/data', {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(res => res.json()).then( data => {
            console.log(data) 
            this.allData = data.info;
            this.setState({         
                info: this.allData.filter( (num) => {
                    return num.key == this.props.match.params.key
                })  
            })
        })                     
    } 
   
    render(){
        // let { staffDetail } = this.props;
        // if(!staffDetail) {
        //     return null;
        // }
        return (
            <div className = "overLay">
                <div className = "content">
                    <h4 style={{'textAlign':'center'}}>用户编辑页</h4>
                    <hr/>
                    {
                        this.state.info.map( item => {
                            return (
                                <form ref="editTabel" className="addForm" key={item.key}>
                                    <div className = "newTable">
                                        <label className = "newLable">用户名</label>
                                        <input ref='addName' id='staffEditName' type='text' defaultValue={item.name}/>
                                    </div>
                                    <div className = "newTable">
                                        <label  className = "newLable">密码</label>
                                        <input ref='addAge' id='staffEditAge' type='text' defaultValue={item.password}/>
                                    </div>
                                    {/* tianjia */}
                                    <div className = "newTable">
                                        <label className = "newLable">邮箱</label>
                                        <input ref='addEmail' id='staffEditEmail' type='text' defaultValue={item.email}/>
                                    </div>
                                    <div className = "newTable">
                                        <label  className = "newLable">手机号</label>
                                        <input ref='addPhone' id='staffEditPhone' type='text'  defaultValue={item.phone}/>
                                    </div>
                                    <div className = "newTable">
                                        <label  className = "newLable">头衔</label>
                                        <select ref='selSex' id='staffEditHonor'>
                                            <option value='manager'>{item.honor}</option>
                                            <option value='employee'>{item.honor}</option>
                                        </select>
                                    </div>
                                    <div className = "newTable">
                                        <label  className = "newLable">角色</label>
                                        <select ref="selId" id='staffEditRole'>
                                            <option value='admin'>{item.role}</option>
                                            <option value='monitor'>{item.role}</option>
                                        </select>
                                    </div>
                                    <div className = "newTable">
                                        <label className = "newLable">公司</label>
                                        <select ref='addCompany' id='staffEditCompany'>
                                            <option value='admin'>{item.companyName}</option>
                                            <option value='monitor'>{item.companyName}</option>
                                        </select>
                                    </div>
                                    <div className = "newTable">
                                        <label  className = "newLable">部门</label>
                                        <select ref='addDepart' id='staffEditDepart'>
                                            <option value='admin'>{item.departName}</option>
                                            <option value='monitor'>{item.departName}</option>
                                        </select>
                                    </div>
                                    <div className = "newTable">
                                        <label  className = "newLable" style={{verticalAlign:'14px'}}>用户描述</label>
                                        <textarea id='staffEditDescrip' type='text' defaultValue={item.descrip}></textarea>
                                    </div>
                                </form>         
                            )
                        })
                    }       
                    <p ref='Dtips' className='tips-success'>修改成功</p>
                    <p ref='DtipsUnDone' className='tips-mes'>请录入完整的人员信息</p>
                    <p ref='DtipsUnAge' className='tips-age'>请录入正确的密码</p>
                    <button onClick={this.handleEdit.bind(this)}>完成</button>
                    <Link to="/user"><button>关闭</button></Link>    
                </div>
            </div>
        );
    }
}

export default StaffEdit;