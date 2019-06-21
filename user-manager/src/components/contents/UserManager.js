import React, { Component } from 'react';
import StaffItemPanel from './component/UserItemPanel';

import LocaleProvider from './LocaleProvider';
import { addLocaleData, IntlProvider } from 'react-intl';

import './userManager.css';
import 'whatwg-fetch';

function getLocale(lang) {
    /* eslint-disable global-require */
    let result = {};
    switch (lang) {
      case 'zh-CN':
        result = require('../../locales/zh-Hans');
        break;
      case 'en-US':
        result = require('../../locales/en-US');
        break;
      default:
        result = require('../../locales/zh-Hans');
    }
  
    return result.default || result;
    /* eslint-enable global-require */
}

class UserManager extends Component {

    constructor(props){
        super(props);
        this.state = {
            staffDetail : null, 
            lang: 'en-US'       
        }
    }

    //语言切换
    onChange = (index) => {
        alert(index)
        const lang = index === 0 ? 'zh-CN' : 'en-US';
        this.setState({
            lang,
        });
    }

    render() {
        const { lang } = this.state;
        const appLocale = getLocale(lang);
        addLocaleData(...appLocale.data);
        return (
            <LocaleProvider locale={appLocale}>
                <IntlProvider
                    locale={appLocale.locale}
                    messages={appLocale.messages}
                    formats={appLocale.formats}
                >
                    <StaffItemPanel  onChange={(index) => {this.onChange(index)}}/>
                </IntlProvider>
            </LocaleProvider>
      );
    }
}

export default UserManager;
