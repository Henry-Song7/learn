import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Select, Button  } from 'antd';
import '../userManager.css';

const Option = Select.Option;
const ButtonGroup = Button.Group;

class StaffHeader extends Component{
    static propTypes = {
        langSelectedIndex: PropTypes.number,
        onChange: PropTypes.func,
    }
    
    constructor(props) {
        super(props);
        const langSelectedIndex = props.langSelectedIndex;
        this.state = {
            langSelectedIndex,
            business: [],
            section: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    //用户名搜索
    handleSearch(e) {
        this.props.onInputChange(e.target.value);
    }

    //二级筛选
    handleCompanyChange(val) {
        this.props.onCompanyChange(val)
        const { list } = this.props;
        this.setState({
            business: list[val],
            section: list[val][0]
        });
    }
    
    handleDepartChange(val) {
        this.props.onDepartChange(val);
        this.setState({
            section: val
        });
    }

    //语言切换
    onChange(index) {
        if (this.state.langSelectedIndex === index) {
          return;
        }
    
        if (this.props.onChange) {
          this.props.onChange(index);
        }
    
        this.setState({
          langSelectedIndex: index,
        });
    }
    render(){
        const { business, section } = this.state;
        const { company } = this.props;
        return(
            <div className = "StaffHeader">
                <h2 style={{'textAlign':'center'}}>用户管理系统</h2>
                <hr/>
                <table className="optHeader">
                    <tbody>  
                        <tr>
                            <td className="headerTd">
                                <input 
                                    style={{outline:'none',border: '1px solid #ccc',lineHeight:'25px',paddingLeft:"12px"}} 
                                    type="text"
                                    placeholder="搜索"  
                                    value={this.props.filterText}
                                    onChange={this.handleSearch}
                                />
                            </td>
                            <td className="headerTd">
                                <label htmlFor="idSelect">&nbsp;公司:&nbsp;</label>
                                <Select
                                    style={{ width: 120 }} 
                                    defaultValue={company[0]}
                                    onChange={this.handleCompanyChange.bind(this)}
                                >
                                    {
                                        company.map( company => {
                                            return(
                                                <Option 
                                                    key={company} 
                                                    value={company}
                                                >
                                                {company}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <label htmlFor="idSelect">&nbsp;部门:&nbsp;</label>
                                <Select
                                    style={{ width: 120 }}
                                    defaultValue={section}
                                    onChange={this.handleDepartChange.bind(this)}
                                >
                                    {
                                        business.map( depart => { 
                                            return(
                                                <Option key={depart} value={depart}>{depart}</Option>
                                            )
                                        })
                                    }
                                </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="primary" onClick={this.props.handleBtnClick.bind(this)}>过滤</Button>
                            </td>
                            <td>
                            <ButtonGroup>
                                <Button 
                                    type="primary" 
                                    onClick={() => {this.onChange(0)}}
                                >
                                    中文
                                </Button>
                                <Button 
                                    type="primary"
                                    onClick={() => {this.onChange(1)}}
                                >
                                    English
                                </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>      
        )
    }
}
export default StaffHeader;
