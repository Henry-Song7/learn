import React,{ Component } from 'react';
import {Route, HashRouter } from 'react-router-dom';

import Header from './components/header/index';
import Login from './components/header/login/Login';
import Register from './components/header/register/Register';
import UserManager from './components/contents/UserManager';
import StaffFooter from './components/contents/component/UserCreate';
import StaffDetail from './components/contents/component/UserDetail';
import StaffEdit from './components/contents/component/UserEdit';

class App extends Component {   
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" exact component={Header}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/user" exact component={UserManager} />   
                    <Route path="/add" exact component={StaffFooter}/>
                    <Route path="/detail/:key" component={StaffDetail}/>
                    <Route path="/edit/:key" component={StaffEdit} />
                </div>
            </HashRouter>
        );
    }
}
export default App;

