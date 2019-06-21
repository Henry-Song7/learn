import React, {Component, Fragment} from 'react';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import StaffItem from './UserItem';
import StaffHeader from './UserSelect';
import PageUi from './page/PageUi';

import { formatMessage } from '../../../locale/util';
import { injectIntl, FormattedMessage } from 'react-intl';

class StaffItemPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [], 
            dataList: [], 
            newDataList: [], //过滤后数据   
            pageSize: 5, //每页显示条数
            currentPage: 1, //当前页码
            pageConfig: {
                totalPage: '', //总页码
            },
            flag: {
                name: true,
                password: true,
                email: true,
                phone: true,
                honor: true,
                role: true,
                descrip: true,
                companyName: true,
                departName: true
            },
            filterCompany: '',
            filterDepart: '',
            company:[],
            arrayCompany: [],
            business: [],
            section: '',
            list: {}
        } 
        this.handleSort = this.handleSort.bind(this)
    }

    componentDidMount() {
		fetch("http://127.0.0.1:8001/data", {
			method: "GET",
			headers: {"Content-Type": "application/json;charset=utf-8"}
		})
		.then((res) => res.json())
		.then((data) => {
			this.setState(() => ({
                info: data.info,
                dataList: data.info,
                // totalPage: Object.assign({}, preState.pageConfig, { totalPage: data.total, pageSize: 5 }),
                pageConfig: {
                    totalPage: Math.ceil(data.info.length/this.state.pageSize) //总页码
                },
                newDataList: data.info.slice(0, 5)
            }));  

            //select多级数据
            const allCompany = data.company;
            const list = {};
            var company = [];
            for(let i=0; i<allCompany.length; i++) {
                company.push(allCompany[i].companyName);
                const arr = [];
                const departs = allCompany[i].departs;
                for(let j=0; j<departs.length; j++){
                    arr.push(departs[j].departName)
                }
                list[allCompany[i].companyName] = arr;
            } 
            console.log(allCompany);         
            console.log(list);
            this.setState(() => ({
                allCompany: allCompany,
                list: list,
                business: list[allCompany[0].companyName],
                section: list[allCompany[0].companyName][0],
                company: company
            }));
        })
        .catch((err) => alert(err));      
    }

    //分页
    getCurrentPage(currentPage) {
        const { pageSize } = this.state;

        this.setState((preState) => ({
            newDataList: preState.dataList.slice((currentPage - 1) * pageSize, currentPage * pageSize),
            currentPage: currentPage
        }));
    }

    //排序 //升序
    upSort(propertyName) {
        const dataList = this.state.dataList;
        if ((typeof dataList[0][propertyName]) !== "number") {
            return (object1, object2) => {
                const value1 = object1[propertyName];
                const value2 = object2[propertyName];
                return value1.localeCompare(value2);
            }
        }else {
            return (object1, object2) => {
                const value1 = object1[propertyName];
                const value2 = object2[propertyName];
                return value1 - value2;
            }
        }
    }; 
    //降序
    downSort(propertyName) {
        const dataList = this.state.dataList;
        if ((typeof dataList[0][propertyName]) !== "number") {
            return (object1, object2) => {
                const value1 = object1[propertyName];
                const value2 = object2[propertyName];
                return value2.localeCompare(value1);
            }
        }else {
            return (object1, object2) => {
                const value1 = object1[propertyName];
                const value2 = object2[propertyName];
                return value2 - value1;
            }
        }
    } 
    //触发排序事件
    handleSort(e) {
        // const prop = e.target.innerHTML;
        if(e.target.nodeName === 'SPAN') {
            return;
        }
        const prop = e.target.id;
        const flag = this.state.flag;
		if (flag[prop] === true) {
			this.state.dataList.sort(this.upSort(prop));
		}else{
            this.state.dataList.sort(this.downSort(prop));
        }
        flag[prop] = !flag[prop];
		this.setState({dataList: this.state.dataList});
    };
    
    //删除list
    handleInputDelete(index) {
        const list = [...this.state.dataList];
        list.splice(index, 1)
        this.setState({
            dataList: list
        })
    }

    //搜索过滤
    filterChange(filterText) {
        // if(item.name.indexOf(this.state.filterText) === -1) {
        //     return false; 
        // }
        const { info, pageSize } = this.state;
        let searchDataList = info.filter(item => {
            return item.name === filterText
        });
        this.setState({
            dataList: searchDataList,
            pageConfig: {
                totalPage: Math.ceil(searchDataList.length / pageSize)
            }
        }, () => {
            this.setState({
                newDataList: this.state.dataList.slice(0, 5)
            })
        })
    }

    //二级过滤
    filterCompanyChange(filterCompany) {
        this.setState(() => ({
            filterCompany: filterCompany
        }));
    }
    fileterDepartChange(filterDepart) {
        this.setState(() => ({
            filterDepart: filterDepart
        }));
    }
    handleBtnFliterClick() {
        const { info, filterCompany, filterDepart, company, pageSize} = this.state;
        let newDataList = info.filter((item) => {
            if(filterCompany === company[0] && filterDepart === company[0]) {   //公司 、 部门 都为 All
                return item
            }else if(filterDepart === company[0]) {                             //部门为 All 时
                return item.companyName === filterCompany
            }else {                                                             //筛选当前选中的公司、与部门
                return item.companyName === filterCompany && item.departName === filterDepart;
            }
        });
        this.setState({
            dataList: newDataList,
            pageConfig: {
                totalPage: Math.ceil(newDataList.length / pageSize)
            }
        }, () => {
            this.setState({
                newDataList: this.state.dataList.slice(0, 5)  
            })
        });
    }
    showFilter() {
        return(
            this.state.newDataList.map( (item, index) => {   
                return(
                    <StaffItem
                        info={item}
                        id={item.key}
                        key={item.key}
                        name={item.name}
                        password={item.password}
                        email={item.email}
                        phone={item.phone}
                        honor={item.honor}
                        role={item.role}
                        companyName={item.companyName}
                        departName={item.departName}
                        descrip={item.descrip}
                        handleDeleteInput={this.handleInputDelete.bind(this, index)}
                    />
                )
            })
        )
    }
    render() {   
        return (
            <Fragment>
                <div style={{position: "absolute", top: "10px", right: "40px"}}><Link to="/login">退出登录</Link></div>
                <StaffHeader 
                    onInputChange={this.filterChange.bind(this)}
                    onCompanyChange={this.filterCompanyChange.bind(this)}
                    onDepartChange={this.fileterDepartChange.bind(this)}
                    handleBtnClick={this.handleBtnFliterClick.bind(this)}
                    onChange={this.props.onChange}
                    company = {this.state.company}
                    business = {this.state.business}
                    section = {this.state.section}
                    allCompany = {this.state.allCompany}
                    list = {this.state.list}
                />  
                
                <table className='itemPanel'>
                    <thead className = "itemHead">
                        <tr> 
                            <th className="itemId"  onClick={this.handleSort} id="name">
                                <FormattedMessage id="user_name" defaultMessage="用户名" />
                            </th>
                        </tr>
                        <tr> 
                            <th className="itemId" onClick={this.handleSort} id="password">
                                <FormattedMessage id="user_password" defaultMessage="密码"/> 
                            </th>
                        </tr>
                        <tr>
                            <th className="itemId" onClick={this.handleSort} id="email">
                                <FormattedMessage id="user_email" defaultMessage="邮箱"/> 
                            </th> 
                        </tr>
                        <tr>
                            <th className="itemId" onClick={this.handleSort} id="phone">
                                <FormattedMessage id="user_phone" defaultMessage="手机号"/> 
                            </th>
                        </tr>
                        <tr>
                            <th className="itemId" onClick={this.handleSort} id="honor">
                                <FormattedMessage id="user_honor" defaultMessage="头衔"/> 
                            </th>
                        </tr>
                        <tr>
                            <th className="itemId" onClick={this.handleSort} id="role">
                                <FormattedMessage id="user_role" defaultMessage="角色"/> 
                            </th>
                        </tr>
                        <tr>
                            <th className="itemId" onClick={this.handleSort} id="companyName">
                                 <FormattedMessage id="user_company" defaultMessage="公司"/>
                            </th>
                        </tr>
                        <tr>
                            <th className="itemId" onClick={this.handleSort} id="departName">
                                 <FormattedMessage id="user_department" defaultMessage="部门"/>
                            </th>
                        </tr>
                        <tr>
                            <th className="itemId">
                                <FormattedMessage id="user_operation" defaultMessage="操作"/> 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showFilter()}
                    </tbody>
                </table>
                <div style={{width: '100%',ovarflow: 'hidden'}}>
                    <Link to="/add" style={{float:'left'}}><button style={{margin: 20}} >创建用户</button></Link>
                    <div style={{float:'right',margin: "20px 10px 0 0"}}>
                        <PageUi 
                            pageConfig={this.state.pageConfig}
                            pageCallbackFn={this.getCurrentPage.bind(this)}  
                        />
                    </div>
                </div>
                <div>
                    { formatMessage('@common.list.type') }
                </div>
            </Fragment>
        )
    }
}

export default StaffItemPanel; 