import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import 'whatwg-fetch';
import '../userManager.css';


class StaffItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allInfo: []
        }
    }
    
    //点击删除
    handleDelete(){
        this.props.handleDeleteInput(this.props.index);
    }
    
    getItem() { 
        const {name, password, email, phone, honor, role, companyName, departName, id, info} = this.props;
        // if(this.props.info.length === 0){
        //     return <tr className="itemEmpty"><td>暂无用户</td></tr>    
        // }
        return(
            <tr style={{'cursor':'pointer'}} className="tableBar" key={info.key}>
                <td className="itemId">
                    {name}
                </td>
                <td className="itemId">
                    {password}
                </td>
                <td className="itemId">
                    {email}
                </td>
                <td className="itemId">
                    {phone}
                </td>
                <td className="itemId">
                    {honor}
                </td>
                <td className="itemId">
                    {role}
                </td>
                <td className="itemId">
                    {companyName}
                </td> 
                <td className="itemId">
                    {departName}
                </td>
                <td className="itemId">
                    <Button type ='danger' className="itemBtn" onClick={this.handleDelete.bind(this)}>删除</Button>   
                    <Link to={`/edit/${id}`}>
                        <Button type ='danger' className="itemBtn">编辑</Button>
                    </Link>  
                    <Link to={`/detail/${id}`}>
                        <Button type ='dashed' className="itemBtn">详情</Button>
                    </Link> 
                </td>
            </tr>
        )
    }
    render() {
        return (
            <Fragment>
                {this.getItem()}
            </Fragment>    
        )
    }
}

export default StaffItem;