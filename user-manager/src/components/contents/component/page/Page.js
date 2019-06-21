// import React, { Component } from 'react';
// import PageUi from './PageUi';
// import data from './data.json';

// class Page extends Component {
//     constructor() {
//         super()
//         this.state = {
//             dataList: [],
//             pageConfig: {
//                 totalPage: data.length, //总页码
//                 pageSize: 5//每页显示条数
//             }
//         }
//         this.getCurrentPage = this.getCurrentPage.bind(this)
//     }

//     getCurrentPage(currentPage) {
//         this.setState({
//             dataList: data[currentPage-1].name
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <div>
//                     {this.state.dataList}
//                 </div>
//                 <PageUi
//                     pageConfig={this.state.pageConfig}
//                     pageCallbackFn={this.getCurrentPage}
//                 />
//             </div>
//         )
//     }
// }
// export default Page;