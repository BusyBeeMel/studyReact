import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom';

import { withRouter } from 'react-router';
import InfiniteScroller from 'react-infinite-scroller';
import ReactPaginate from 'react-paginate';

// Styles
import stylesTable from '../../Styles/Common/Table.css'

// Utils
import * as DateUtil from '../../Lib/Utils/date';

// Config
import Config from '../../Lib/Api/config';

/*
* this.props.Get
* this.props.GetCount
* this.props.HeaderComponent
* this.props.ListComponent
* this.props.Params
* this.props.listString
*/
class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            count: 20,
            total: 0,
            isResetCount: true,
            forcePage: 0
        };
    }
    componentWillMount() {
        this.loadCount();
        this.loadList(0);
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    getForcePage(){ // 현재 페이지
        return this.state.forcePage
    }
    reset() {
        this.setState({
            list: [],
            total: 0,
        }, () => {
            this.loadCount();
            this.loadList(0);
        });
    }
    loadList(page) {
        if(this.props.type === 'popup'){ // 팝업 주문목록일 경우
            if(this.props.Get.orderFundings){
                console.log(this.props.Get.orderFundings)
                this.setState({
                    list: this.props.Get.orderFundings
                })
            }else if(this.props.Get.orderProducts){
                console.log(this.props.Get.orderProducts)
                this.setState({
                    list: this.props.Get.orderProducts
                })
            }else if(this.props.Get.optionInfo){
                this.setState({
                    list: this.props.Get.optionInfo
                })
            }else{
                this.setState({
                    list: []
                })
            }
        }else{
            this.props.Get(Object.assign({
                from: page * this.state.count,
                count: this.state.count,
            }, this.props.Params)).then((data) => {
                console.log('@@@@@@@@@@@@')
                console.log(data);
                console.log('@@@@@@@@@@@@')
                if(data.code === 200){
                    this.setState({
                        list: data.data[this.props.listString] === null ? [] : data.data[this.props.listString],
                    });
                    this.props.list(data.data[this.props.listString]);
                }else{
                    alert('error')
                }

            }).catch((err) => { });
        }

        this.setState({
            forcePage: page
        })
    }
    loadCount() {
        this.setState({ isResetCount: true });
        this.props.GetCount(Object.assign({
            searchQuery: this.state.searchQuery,
        }, this.props.Params)).then((total) => {
            console.log("??????????????????????")
            console.log(total)
            this.setState({
                total: total,
                isResetCount: false,
            });
            this.props.totalCount(total);
        }).catch((err) => { });
    }
    changeSearchQuery(e) {
        this.setState({ searchQuery: e.target.value });
    }
    searchKeyPress(e) {
        if (e.key == 'Enter') {
            this.loadCount();
            this.loadList(0);
        }
    }
    render() {
        console.log(this.state.list);
        console.log('console.log(this.state.list);');
        let renderLoadingBox = (
            <div className={stylesTable.tableLoadingBox}>
                <img
                    src={'/admin/assets/img/loading.gif'}
                    className={stylesTable.tableLoadingIcon}
                    alt={'loading'}
                />
            </div>
        );
        let renderList = this.state.list.map(this.props.ListComponent);
        return (
            <div>
                {
                    this.props.type === 'popup' ?
                        <div style={{border:'1px solid #bdbdbd', overflow: 'auto', marginBottom:20}}>
                            <div className={stylesTable.tableContentBox} style={{borderRadius:0, width:this.props.headerWidth}}>
                                <li className={stylesTable.tableContentHeader} style={{borderRadius:0, backgroundColor:'#f5f5f5'}}>
                                    { this.props.HeaderComponent }
                                </li>
                                { renderList }
                            </div>
                        </div>
                        :
                        <div style={{backgroundColor:'rgba(244, 244, 244, 0.28)', padding:20, borderRadius:20, marginLeft:-15}}>
                            <div className={stylesTable.tableContentBox + ' ' + stylesTable.backgroundBox}>
                                <li className={stylesTable.tableContentHeader}>
                                    { this.props.HeaderComponent }
                                </li>
                                { renderList }
                            </div>
                        </div>
                }

                { this.state.isResetCount ? null :
                    this.props.pageView !== 'hide' &&
                    (
                    <ReactPaginate
                        previousLabel={'이전'}
                        nextLabel={'다음'}
                        pageCount={this.state.total / this.state.count}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(data) => { this.loadList(data.selected); }}
                        containerClassName={stylesTable.pagination}
                        pageClassName={stylesTable.pageNav}
                        breakClassName={stylesTable.pageNav}
                        previousClassName={stylesTable.pageNav}
                        nextClassName={stylesTable.pageNav}
                        activeClassName={stylesTable.active}
                        forcePage={this.state.forcePage}
                        initialPage={this.props.initialPage}
                    />
                )}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(TableComponent));
