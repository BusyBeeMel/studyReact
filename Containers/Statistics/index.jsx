import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import CategoryTabs from '../../Components/Statistics/CategoryTabs';
import SearchBar from '../../Components/Statistics/SearchBar';
import CardView from '../../Components/Statistics/CardView';
import TableComponent from '../../Common/Table'

// Actions

// Styles
import stylesStat from '../../Styles/Containers/Statistics.css';
import styles from '../../Styles/App.css';
import stylesHeader from '../../Styles/Components/Home.css';
import stylesTable from '../../Styles/Common/Table.css'

// Utils
import moment from "moment/moment";
import * as ActionStat from "../../Data/Statistics/actions";
import Config from "../../Lib/Api/config";
import * as convert from "../../Lib/Utils/converter";

class StatisticsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            keyword: '',
            dateFrom: moment().add(-6, 'days'),
            dateTo: moment(),
            contentsDateFrom: moment().add(-6, 'days'),
            contentsDateTo: moment(),
            payOptionSelect: 'card', // 결제방식 select
            payStateSelect: -1,   // 결제상태
            totalSales: 0,           // 총 결제금액
            totalOrder: 0,           // 총 주문
            sales: [],               // chart
            likes: []                // chart
        }

        this.onTabChange = this.onTabChange.bind(this);
        this.keywordChange = this.keywordChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.searchDateChange = this.searchDateChange.bind(this);
        this.payOptionSelectChange = this.payOptionSelectChange.bind(this);
        this.payStateSelectChange = this.payStateSelectChange.bind(this);
        this.goGoogle = this.goGoogle.bind(this);
    }

    componentDidMount(){
        this.getSales();
    }

    onTabChange(i){
        if(i === 0) {
            this.getSales();
        }else{
            this.getProducts();
        }
        this.setState({
            selectedIndex: i,
        });
    }

    keywordChange(keyword){
        this.setState({keyword: keyword})
    }

    onSearch(){
        console.log(this.state.payOptionSelect)
        console.log(this.state.payStateSelect)
        console.log(this.state.dateFrom)
        console.log(this.state.dateTo)
        console.log(this.state.keyword)

        if(this.state.selectedIndex === 0) {
            this.getSales();
        }else {
            this.getProducts();
        }
    }

    searchDateChange(type, date){
        if(this.state.selectedIndex === 0){
            if(type === 'start'){
                this.setState({
                    dateFrom: moment(date)
                });
            }else{
                this.setState({
                    dateTo: moment(date)
                });
            }
        }else{
            if(type === 'start'){
                this.setState({
                    contentsDateFrom: moment(date)
                });
            }else{
                this.setState({
                    contentsDateTo: moment(date)
                });
            }
        }
    }

    payOptionSelectChange(val){
        this.setState({
            payOptionSelect: val
        })
    }

    payStateSelectChange(val){
        this.setState({
            payStateSelect: val
        })
    }

    getSales() {
        let param = {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            paidBy: this.state.payOptionSelect,
            status: this.state.payStateSelect,
            productId: this.state.keyword
        };

        console.log(param)

        ActionStat.getStatisticsSalse(param)
            .then((response)=>{
                console.log(response)
                if(response.code === 200){
                    this.setState({
                        totalSales: response.data.totalSales,
                        totalOrder: response.data.totalOrder,
                        sales: response.data.sales
                    })
                }else{
                    // alert('정보를 불러오지 못했습니다.');
                }

            })
            .catch((err)=>{
                alert('정보를 불러오지 못했습니다.');
            })
    }

    getProducts() {
        let param = {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            productId: this.state.keyword
        };

        ActionStat.getStatisticsProducts(param)
            .then((response)=>{
                console.log(response)
                if(response.code === 200){
                    this.setState({
                        totalLikes: response.data.totalLikes,
                        totalComments: response.data.totalComments,
                        totalProducts: response.data.totalProducts,
                        totalHits: response.data.totalHits,
                        likes: response.data.likes
                    })
                }else{
                    // alert('정보를 불러오지 못했습니다.');
                }

            })
            .catch((err)=>{
                alert('정보를 불러오지 못했습니다.');
            })
    }

    goGoogle(){
        window.open('https://analytics.google.com/analytics/web/provision/?authuser=0#provision/SignUp/');
    }

    render() {

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
            return (
                <div key={index} style={{backgroundColor:'#fff', borderBottom:'1px solid #ccc'}}>
                    <div key={index} className={stylesTable.tableContentItem} style={{height:35, paddingTop:5}}>
                        <div
                            style={{height:30, lineHeight:2, width: Config.POPUP_ORDER.COLUMN_SIZE[0], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[0], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[0], color: Config.POPUP_ORDER.COLUMN_COLOR[0] }}
                        >
                            111
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[1], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[1], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[1], color: Config.POPUP_ORDER.COLUMN_COLOR[1] }}
                        >
                          1
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[2], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[2], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[2], color: Config.POPUP_ORDER.COLUMN_COLOR[2] }}
                        >
                          1
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[3], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[3], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[3], color: Config.POPUP_ORDER.COLUMN_COLOR[3] }}
                        >
                          1
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[4], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[4], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[4], color: Config.POPUP_ORDER.COLUMN_COLOR[4] }}
                        >
                          1
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[5], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[5], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[5], color: Config.POPUP_ORDER.COLUMN_COLOR[5] }}
                        >
                            1
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[6], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[6], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[6], color: Config.POPUP_ORDER.COLUMN_COLOR[6] }}
                        >
                            2222
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_ORDER.COLUMN_SIZE[7], fontSize: Config.POPUP_ORDER.COLUMN_FONT_SIZE[7], fontWeight: Config.POPUP_ORDER.COLUMN_FONT_WEIGHT[7], color: Config.POPUP_ORDER.COLUMN_COLOR[7] }}
                        >
                            3333
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className={stylesStat.statContainer}>

                <div style={{display:'inline-block', position:'relative', top:0, left:0, width:941}}>

                    <li style={{display:'inline'}}>
                        <div style={{float:'left'}} className={stylesStat.bannerTitle}>통계</div>
                        <div style={{float:'left', borderRadius:10, backgroundColor:'#d8d8d8', marginTop:15, marginLeft:10, width:7, height:7, marginRight:10}}></div>
                    </li>

                    {/*<div className={stylesStat.bgImage}></div>*/}

                    <SearchBar
                        keyword={this.state.keyword}
                        keywordChange={this.keywordChange}
                        onSearch={this.onSearch}
                        payOptionSelect={this.state.payOptionSelect}
                        payStateSelect={this.state.payStateSelect}
                        payOptionSelectChange={this.payOptionSelectChange}
                        payStateSelectChange={this.payStateSelectChange}
                        startDate={this.state.selectedIndex === 0 ? this.state.dateFrom : this.state.contentsDateFrom}
                        endDate={this.state.selectedIndex === 0 ? this.state.dateTo : this.state.contentsDateTo}
                        searchDateChange={this.searchDateChange}
                        type={this.state.selectedIndex}
                    />

                    <CategoryTabs
                        tabs={['매출통계', '콘텐츠']}
                        selectedTab={this.state.selectedIndex}
                        onTabChange={this.onTabChange}
                    />

                    <div className={styles.space20}></div>

                    <div style={{fontSize:14, fontWeight:'bold'}}>
                        {this.state.dateFrom.format('YYYY.MM.DD')} ~ {this.state.dateTo.format('YYYY.MM.DD')} 통계
                    </div>

                    <div className={styles.underLine}></div>

                    {
                        this.state.selectedIndex === 0 ?
                            <div className={stylesHeader.countCardBox}>
                                <ul style={{width:960, backgroundColor:'rgba(244, 244, 244, 0.28)', height:150, borderRadius:20, margin:0, padding:0}}>
                                    <li style={{marginTop:30, marginLeft:10, display:'inline-block'}}>
                                        <div style={{position:'absolute', left:-5, top:172, width:100, height:85, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '10px 1px', backgroundSize:600}}></div>
                                        <CardView
                                            title={'총 결제금액'}
                                            subText={this.state.totalSales}
                                            type={'1'}
                                        />
                                    </li>

                                    <li style={{display:'inline-block', marginLeft:10}}>
                                        <div style={{position:'absolute', left:310, top:167, width:100, height:90, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-108px 1px', backgroundSize:600}}></div>
                                        <CardView
                                            title={'총 주문'}
                                            subText={this.state.totalOrder}
                                            type={'1'}
                                        />
                                    </li>

                                    <li style={{display:'inline-block', marginLeft:10}}>
                                        <div style={{position:'absolute', left:629, top:163, width:85, height:95, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-192px 0px', backgroundSize:500}}></div>
                                        <CardView
                                            title={'Google Analytics'}
                                            subText={'확인하기'}
                                            type={'google'}
                                            goGoogle={this.goGoogle}
                                        />
                                    </li>
                                </ul>
                            </div>
                            :

                            <div className={stylesHeader.countCardBox}>
                                <ul style={{width:960, backgroundColor:'rgba(244, 244, 244, 0.28)', height:150, borderRadius:20, margin:0, padding:0}}>
                                    <li style={{marginTop:30, marginLeft:10, display:'inline-block'}}>
                                        <div style={{position:'absolute', left:10, top:165, width:80, height:85, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-29px -124px', backgroundSize:580}}></div>
                                        <CardView
                                            title={'좋아요'}
                                            subText={this.state.totalLikes}
                                            type={'2'}
                                        />
                                    </li>

                                    <li style={{display:'inline-block', marginLeft:10}}>
                                        <div style={{position:'absolute', left:240, top:166, width:105, height:95, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-118px -100px', backgroundSize:460}}></div>
                                        <CardView
                                            title={'댓글'}
                                            subText={this.state.totalComments}
                                            type={'2'}
                                        />
                                    </li>

                                    <li style={{display:'inline-block', marginLeft:10}}>
                                        <div style={{position:'absolute', left:453, top:158, width:105, height:95, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-249px -100px', backgroundSize:480}}></div>
                                        <CardView
                                            title={'신규상품'}
                                            subText={this.state.totalProducts}
                                            type={'2'}
                                        />
                                    </li>

                                    <li style={{display:'inline-block', marginLeft:10}}>
                                        <div style={{position:'absolute', left:709, top:163, width:85, height:95, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-417px -100px', backgroundSize:500}}></div>
                                        <CardView
                                            title={'조회수'}
                                            subText={this.state.totalHits}
                                            type={'2'}
                                        />
                                    </li>
                                </ul>
                            </div>
                    }

                    <div style={{paddingTop:15, paddingBottom:5, paddingLeft:10, fontSize:14, fontWeight:'bold'}}>
                        기간 내 판매 매출액 그래프
                    </div>

                    {
                        this.state.selectedIndex === 0 ?
                            <div className={stylesHeader.countCardBox} style={{zIndex:99999999}}>
                                <ul style={{width:960, backgroundColor:'rgba(244, 244, 244, 0.28)', height:240, borderRadius:20, margin:0, padding:0}}>
                                    <li style={{marginTop:30, marginLeft:10, display:'inline-block'}}>
                                        <div style={{position:'absolute', left:5, top:493, width:100, height:85, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-334px -19px', backgroundSize:600}}></div>
                                        <CardView
                                            title={'일 평균 매출액'}
                                            subText={this.state.totalSales / this.state.sales.length}
                                            type={'3'}
                                        />
                                    </li>

                                    <li style={{display:'inline-block', marginLeft:10}}>
                                        <CardView
                                            title={''}
                                            subText={this.state.sales}
                                            type={'4'}
                                        />
                                    </li>
                                </ul>
                            </div>
                            :
                            <div className={stylesHeader.countCardBox}>
                                <ul style={{width:960, backgroundColor:'rgba(244, 244, 244, 0.28)', height:240, borderRadius:20, margin:0, padding:0}}>
                                    <li style={{marginTop:30, marginLeft:10, display:'inline-block'}}>
                                        <div style={{position:'absolute', left:12, top:363, width:140, height:150, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-42px -269px', backgroundSize:600}}></div>
                                        <CardView
                                            title={'좋아요'}
                                            subText={'weekly'}
                                            type={'weekly'}
                                        />
                                    </li>

                                    <li style={{display:'inline-block', marginLeft:10}}>
                                        <CardView
                                            title={''}
                                            subText={this.state.likes}
                                            type={'5'}
                                        />
                                    </li>
                                </ul>
                            </div>

                    }

                </div>

                <div className={stylesTable.tableHeaderBox}>
                    {/*<TableComponent*/}
                        {/*onRef={(ref) => { this.tableComponent = ref; }}*/}
                        {/*Get={ActionStat.getProductOrderList}*/}
                        {/*GetCount={ActionStat.getProductOrderCount}*/}
                        {/*isTabComponent={true}*/}
                        {/*HeaderComponent={renderTableHeader()}*/}
                        {/*ListComponent={renderTableContent}*/}
                        {/*listString={"orders"}*/}
                        {/*totalCount={this.getTotalCount}*/}
                        {/*Params={{*/}
                            {/*dateFrom: this.state.dateFrom,*/}
                            {/*dateTo: this.state.dateTo,*/}
                            {/*paidBy: this.state.payOptionSelect,*/}
                            {/*status: this.state.payStateSelect,*/}
                            {/*productId: 6*/}
                        {/*}}*/}
                    {/*/>*/}
                </div>

                <div className={stylesStat.bgImage}>
                </div>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(StatisticsContainer));