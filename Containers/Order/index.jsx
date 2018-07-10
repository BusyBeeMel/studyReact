import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Config from '../../Lib/Api/config';

// Components
import TableComponent from '../../Common/Table'
import SearchBar from '../../Components/Order/SearchBar';
import Modal from '../../Common/Modal';
import ModalBody from '../../Components/Order/ModalBody';

// Actions
import * as ActionOrder from '../../Data/Order/actions'

// Styles
import stylesOrder from '../../Styles/Containers/Order.css';
import stylesTable from '../../Styles/Common/Table.css'
import styles from '../../Styles/App.css';

// Utils
import * as NumberUtil from '../../Lib/Utils/parseNumber';
import * as DateUtil from '../../Lib/Utils/date';
import moment from "moment/moment";
import * as convert from "../../../Admin/Lib/Utils/converter";


class OrderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCount: 0,
            searchKeyword: '',
            dateFrom: moment().add(-1, 'month').add(1, 'days'),
            dateTo: moment(),
            invoiceId: '',
            userId:'',
            state:'',
            sort: 'desc',
            sortMethod: 'date',
            currency: -1,
            status: -1,
            modalBody: ''
        }

        this.itemClick = this.itemClick.bind(this);
        this.getTotalCount = this.getTotalCount.bind(this);
        this.goSearch = this.goSearch.bind(this);
        this.searchKeyPress = this.searchKeyPress.bind(this);
        this.searchKeywordChange = this.searchKeywordChange.bind(this);
        this.searchDateChange = this.searchDateChange.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.currencyChange = this.currencyChange.bind(this);
        this.statusChange = this.statusChange.bind(this);
    }

    itemClick(item, index){
        let param = {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            invoiceId: item.invoiceId,
        }

        ActionOrder.getInvoiceList(param)
            .then((response)=>{
                console.log(response)
                if(response.code === 200){
                    if(response.data.invoices[0].orderProducts || response.data.invoices[0].orderFundings){
                        this.setState({
                            modalBody: this.getView(response.data.invoices[0], index)
                        })
                        this.modal.open();
                    }else{
                        alert('데이터가 존재하지 않습니다.')
                    }
                }else{
                    alert('주문정보를 불러오지 못했습니다.');
                }

            })
            .catch((err)=>{
                alert('주문정보를 불러오지 못했습니다.');
            })
    }

    getView(item, index){
        return(
            <ModalBody item={item} />
        )
    }

    getTotalCount(total){
        this.setState({totalCount: total})
    }

    goSearch() {
        this.tableComponent.setState({ searchQuery: this.state.searchKeyword });
        this.reset();
    }

    reset(){
        setTimeout(() => {
            this.tableComponent.reset();
        });
    }

    searchKeyPress(key) {
        if (key == 'Enter') {
            this.goSearch();
        }
    }

    searchKeywordChange(keyword){
        this.setState({
            searchKeyword: keyword
        })
    }

    searchDateChange(type, date){
        if(type === 'start'){
            this.setState({
                dateFrom: moment(date)
            });
        }else{
            this.setState({
                dateTo: moment(date)
            });
        }
    }

    sortTable(index){

        if (index == 6) {
            this.setState({
                sort: this.state.sort === 'desc' ? 'asc' : 'desc',
                sortMethod: 'createdAt'
            });
        }else if (index == 7) {
            this.setState({
                sort: this.state.sort === 'desc' ? 'asc' : 'desc',
                sortMethod: 'paidAt'
            });
        }

        this.reset();
    }

    currencyChange(val){
        this.setState({
            currency: val
        })
        // if(val !== '-1'){
            this.reset();
        // }
    }

    statusChange(val){
        this.setState({
            status: val
        })
        // if(val !== '-1'){
            this.reset();
        // }
    }

    render() {

        let renderTableHeader = () => {
            let tableFields = Config.PAGE_ORDER.COLUMN_SIZE.map((size, index) => {
                if (index === 6 || index === 7) {
                    return (
                        <div
                            className={stylesTable.column + ' ' + stylesTable.withCursor + ' ' + stylesTable.tableFieldName}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[index] }}
                            key={index}
                            onClick={this.sortTable.bind(this, index)}
                        >
                            {Config.PAGE_ORDER.COLUMN_NAME[index]}
                            { index == 3 && this.state.sort == 'desc' ? <span className={styles.downArrow} ></span> : null}
                            { index == 3 && this.state.sort == 'asc' ? <span className={styles.upArrow} ></span> : null}
                            { index == 6 && this.state.sort == 'desc' ? <span className={styles.downArrow} ></span> : null}
                            { index == 6 && this.state.sort == 'asc' ? <span className={styles.upArrow} ></span> : null}
                            { index == 7 && this.state.sort == 'desc' ? <span className={styles.downArrow} ></span> : null}
                            { index == 7 && this.state.sort == 'asc' ? <span className={styles.upArrow} ></span> : null}
                        </div>
                    );
                } else {
                    return (
                        <div
                            className={stylesTable.column + ' ' + stylesTable.tableFieldName}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[index] }}
                            key={index}
                        >
                            {Config.PAGE_ORDER.COLUMN_NAME[index]}
                        </div>
                    );
                }
            });
            return (
                <div>
                    <div className={stylesTable.tableOption}>
                        {/*(개발예정) 주문현황 SelectBox / 상품Id*/ }
                        <select className={stylesTable.categorySelect} value={this.state.status} onChange={(e) => this.statusChange(e.target.value)}>
                            <option value={-1} selected={true}>주문현황 선택</option>
                            <option value={0}>결제 대기</option>
                            <option value={8}>펀딩 대기</option>
                            <option value={10}>결제 완료</option>
                            <option value={15}>배송 완료</option>
                            <option value={20}>결제 실패</option>
                            <option value={21}>결제 취소</option>
                            <option value={25}>펀딩 실패</option>
                        </select>

                        <select className={stylesTable.categorySelect} value={this.state.currency} onChange={(e) => this.currencyChange(e.target.value)} style={{marginLeft:10}}>
                            <option value={-1} selected={true}>통화 선택</option>
                            <option value={0}>krw</option>
                            <option value={1}>coin</option>
                            <option value={2}>mile</option>
                        </select>
                    </div>
                    <div>{tableFields}</div>
                </div>
            );
        }
        let renderTableContent = (invoice, index) => {
            return (
                <div key={index} style={{backgroundColor:'#fff'}}
                     onClick={()=>this.itemClick(invoice, index)}
                >
                    <div key={index} className={stylesTable.tableContentItem}>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[0], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[0], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[0], color: Config.PAGE_ORDER.COLUMN_COLOR[0] }}
                        >
                            {invoice[Config.PAGE_ORDER.COLUMN_FIELD[0]]}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[1], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[1], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[1], color: Config.PAGE_ORDER.COLUMN_COLOR[1] }}
                        >
                            {invoice['userInfo'] !== null ? invoice['userInfo']['name'] : ''}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[2], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[2], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[2], color: Config.PAGE_ORDER.COLUMN_COLOR[2] }}
                        >
                            <div className={stylesOrder['statusText' + invoice[Config.PAGE_ORDER.COLUMN_FIELD[2]]]}>
                                {ActionOrder.INVOICE_STATUS[invoice[Config.PAGE_ORDER.COLUMN_FIELD[2]]]}
                            </div>
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[3], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[3], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[3], color: Config.PAGE_ORDER.COLUMN_COLOR[3] }}
                        >
                            {ActionOrder.INVOICE_TYPE(invoice)}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{width: Config.PAGE_ORDER.COLUMN_SIZE[4], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[4], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[4], color: Config.PAGE_ORDER.COLUMN_COLOR[4] }}
                        >
                            {invoice[Config.PAGE_ORDER.COLUMN_FIELD[4]].toUpperCase()}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[5], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[5], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[5], color: Config.PAGE_ORDER.COLUMN_COLOR[5] }}
                        >
                            {NumberUtil.numberWithCommas(invoice[Config.PAGE_ORDER.COLUMN_FIELD[5]])}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[6], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[6], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[6], color: Config.PAGE_ORDER.COLUMN_COLOR[6] }}
                        >
                            {DateUtil.format('point', invoice[Config.PAGE_ORDER.COLUMN_FIELD[6]])}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[7], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[7], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[7], color: Config.PAGE_ORDER.COLUMN_COLOR[7] }}
                        >
                            {invoice[Config.PAGE_ORDER.COLUMN_FIELD[7]]? DateUtil.format('point', invoice[Config.PAGE_ORDER.COLUMN_FIELD[7]]) : '-'}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_ORDER.COLUMN_SIZE[8], fontSize: Config.PAGE_ORDER.COLUMN_FONT_SIZE[8], fontWeight: Config.PAGE_ORDER.COLUMN_FONT_WEIGHT[8], color: Config.PAGE_ORDER.COLUMN_COLOR[8] }}
                        >
                            {invoice[Config.PAGE_ORDER.COLUMN_FIELD[8]]}
                        </div>
                        <div className={stylesTable.btnBox}>
                            <div className={stylesTable.delete}>
                                결제취소
                            </div>
                        </div>
                    </div>
                    <div className={stylesOrder.tableItemUnerline}></div>
                </div>
            )
        }

        return (
            <div className={stylesOrder.orderContainer}>

                <div className={stylesOrder.orderTitle}>주문목록
                    <span className={stylesOrder.redText}>{this.state.totalCount}</span>
                </div>

                <div className={stylesOrder.bgImage}>
                </div>

                <SearchBar
                    searchKeywordChange={this.searchKeywordChange}
                    searchKeyPress={this.searchKeyPress}
                    goSearch={this.goSearch}
                    startDate={this.state.dateFrom}
                    endDate={this.state.dateTo}
                    searchDateChange={this.searchDateChange}
                />

                <div className={styles.space25}></div>

                <div className={stylesTable.tableHeaderBox} >
                    <TableComponent
                        onRef={(ref) => { this.tableComponent = ref; }}
                        Get={ActionOrder.getInvoiceList}
                        GetCount={ActionOrder.getInvoiceCount}
                        isTabComponent={true}
                        HeaderComponent={renderTableHeader()}
                        ListComponent={renderTableContent}
                        listString={'invoices'}
                        totalCount={this.getTotalCount}
                        Params={{
                            dateFrom: this.state.dateFrom,
                            dateTo: this.state.dateTo,
                            invoiceId: '',
                            userId:'',
                            status: this.state.status,
                            searchQuery: this.state.searchKeyword,
                            sort: this.state.sort,
                            sortMethod: this.state.sortMethod,
                            currency: ActionOrder.INVOICE_CURRENCY_TYPE[this.state.currency]
                        }}
                    />
                </div>
                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    type={'invoice'}
                    modalBody={
                        this.state.modalBody
                    }
                />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(OrderContainer));