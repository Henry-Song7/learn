import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class StaffDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info: []
        };
        this.allData = []
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
        console.log(this.props.match.params.key);  
    } 

    showDetail() {
        return(
            this.state.info.map( item => {
                return (
                    <form className="addForm" key={item.key}>
                        <div className = "newTable">
                            <label className = "newLable">用户名:</label>
                            <input  id='staffEditName' type='text' defaultValue={item.name} readOnly/>
                        </div>
                        <div className = "newTable">
                            <label  className = "newLable">密码:</label>
                            <input  id='staffEditAge' type='text' defaultValue={item.password} readOnly/>
                        </div>
                        {/* tianjia */}
                        <div className = "newTable">
                            <label className = "newLable">邮箱:</label>
                            <input id='staffEditEmail' type='text' defaultValue={item.email} readOnly/>
                        </div>
                        <div className = "newTable">
                            <label  className = "newLable">手机号:</label>
                            <input id='staffEditPhone' type='text'  defaultValue={item.phone} readOnly/>
                        </div>
                        <div className = "newTable">
                            <label  className = "newLable" >头衔:</label>
                            <input id='staffEditHonor' type='text' defaultValue={item.honor} readOnly/>
                        </div>
                        <div className = "newTable">
                            <label  className = "newLable">角色:</label>
                            <input id='staffEditRole' type='text' defaultValue={item.role} readOnly/>
                        </div>
                        <div className = "newTable">
                            <label className = "newLable">公司:</label>
                            <input id='staffEditCompany' type='text' defaultValue={item.companyName} readOnly/>
                        </div>
                        <div className = "newTable">
                            <label  className = "newLable">部门:</label>
                            <input id='staffEditDepart' type='text'  defaultValue={item.departName} readOnly/>
                        </div>
                        <div className = "newTable">
                            <label  className = "newLable" style={{verticalAlign:'14px'}}>用户描述:</label>
                            <textarea id='staffEditDescrip' type='text' defaultValue={item.descrip} readOnly/>
                        </div>
                    </form>         
                );
            })
        );
    }
   
    render(){
        // let { staffDetail } = this.props;
        // if(!staffDetail) {
        //     return null;
        // }
        return (
            <div className = "overLay">
                <div className = "content">
                    <h4 style={{'textAlign':'center'}}>用户详情页</h4>
                    <hr/>
                    { this.showDetail()}
                    <Link to="/user"><button>关闭</button></Link>    
                </div>
            </div>
        );
    }
}

export default StaffDetail;