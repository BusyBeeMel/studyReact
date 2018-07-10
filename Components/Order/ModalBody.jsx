import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import TableComponent from '../../Common/Table'

// Styles
import stylesOrder from '../../Styles/Components/Order.css';
import stylesTable from '../../Styles/Common/Table.css'
import styles from '../../Styles/App.css';

// Utils
import * as convert from "../../Lib/Utils/converter";
import * as ActionOrder from "../../Data/Order/actions";
import Config from "../../Lib/Api/config";
import moment from "moment/moment";

class ModalBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateFrom: moment().add(-1, 'month').add(1, 'days'),
            dateTo: moment(),

        }
    }

    render() {
        let {item} = this.props;

        let renderTableHeader = () => {
            let tableFields = Config.POPUP_ORDER.COLUMN_SIZE.map((size, index) => {
                if (index === 11111 ) {
                    return (
                        <div>
                        </div>
                    );
                } else {
                    return (
                        <div
                            className={stylesTable.column + ' ' + stylesTable.tableFieldName}
                            style={{ width: Config.POPUP_ORDER.COLUMN_SIZE[index], borderLeft:index !==0 ? '1px solid #ccc' : '', borderBottom:'1px solid #bdbdbd', color:'#555', fontSize:13, height:30, lineHeight:2}}
                            key={index}
                        >
                            {Config.POPUP_ORDER.COLUMN_NAME[index]}
                        </div>
                    );
                }
            });
            return (
                <div>
                    <div>{tableFields}</div>
                </div>
            );
        }
        let renderTableContent = (invoice, index) => {
            console.log('smw')
            console.log(invoice)
            return (
                <div key={index} style={{backgroundColor:'#fff', borderBottom:'1px solid #ccc'}}>
                    <div key={index} className={stylesTable.tableContentItem} style={{height:35, paddingTop:5}}>
                        <div
                            style={{height:30, lineHeight:2, width: Config.POPUP_ORDER.COLUMN_SIZE[0], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[0], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[0], color: Config.POPUP_ORDER.COLUMN_COLOR[0] }}
                        >
                            {item.orderProducts ? '' : '펀딩예약중'}
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[1], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[1], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[1], color: Config.POPUP_ORDER.COLUMN_COLOR[1] }}
                        >
                            {invoice[Config.POPUP_ORDER.COLUMN_FIELD[1]]}
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[2], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[2], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[2], color: Config.POPUP_ORDER.COLUMN_COLOR[2] }}
                        >
                            {convert.converNumberComma(invoice[Config.POPUP_ORDER.COLUMN_FIELD[2]])}원
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[3], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[3], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[3], color: Config.POPUP_ORDER.COLUMN_COLOR[3] }}
                        >
                            {invoice[Config.POPUP_ORDER.COLUMN_FIELD[3]]}
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[4], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[4], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[4], color: Config.POPUP_ORDER.COLUMN_COLOR[4] }}
                        >
                            {invoice[Config.POPUP_ORDER.COLUMN_FIELD[4]].title}
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[5], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[5], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[5], color: Config.POPUP_ORDER.COLUMN_COLOR[5] }}
                        >
                            {invoice[Config.POPUP_ORDER.COLUMN_FIELD[5]].title}
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[6], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[6], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[6], color: Config.POPUP_ORDER.COLUMN_COLOR[6] }}
                        >
                            {item.orderDelivery.deliveryName}
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[7], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[7], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[7], color: Config.POPUP_ORDER.COLUMN_COLOR[7] }}
                        >
                            {item.orderDelivery.userId}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div style={{width:696}}>
                <div className={styles.popupTitle}>주문자 정보</div>
                <div className={stylesOrder.popupTopContainer}>
                    <div className={styles.popupTopText}>
                        주문자명 <span className={styles.popupTopSubText}>{item.orderDelivery.deliveryName}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        주문자전화번호 <span className={styles.popupTopSubText}>{item.orderDelivery.deliveryPhoneNumber}</span>
                    </div>
                    { item.orderDelivery.length !== 0 &&
                        <div>
                            <div className={styles.popupTopText}>
                                배송지 <span className={styles.popupTopSubText}>{item.orderDelivery.deliveryAddress}</span>
                            </div>
                            <div className={styles.popupTopText}>
                                배송비 <span className={styles.popupTopSubText}>{convert.converNumberComma(item.orderDelivery.price)}원</span>
                            </div>
                        </div>
                    }
                    <div className={styles.popupTopText}>
                        총결제금액 <span className={styles.popupTopSubText}>{convert.converNumberComma(item.price)}원</span>
                    </div>
                </div>
                <div className={styles.space12}></div>
                <div className={styles.popupTitle}>주문목록</div>

                <div className={stylesTable.tableHeaderBox} style={{marginLeft:5, minWidth:696}}>
                    <TableComponent
                        onRef={(ref) => { this.tableComponent = ref; }}
                        Get={this.props.item}
                        GetCount={ActionOrder.getInvoiceCount}
                        isTabComponent={true}
                        HeaderComponent={renderTableHeader()}
                        ListComponent={renderTableContent}
                        listString={'invoices'}
                        type={'popup'}
                        headerWidth={870}
                        pageView={'hide'}
                        Params={{
                            dateFrom: this.state.dateFrom,
                            dateTo: this.state.dateTo,
                            invoiceId: item.invoiceId,
                        }}
                    />
                </div>

            </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(ModalBody));
