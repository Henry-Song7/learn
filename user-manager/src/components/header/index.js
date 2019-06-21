import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = ()=> {
    return (
        <div>
            <div className="wrapper">
                <ul>
                    <li><Link to={'/register'}>注册</Link></li>
                    <li><Link to={'/login'}>登录</Link></li>
                </ul>
                <div className="user-login">
                    请登录
                </div>
            </div>
        </div>
    )
}
export default Header;
