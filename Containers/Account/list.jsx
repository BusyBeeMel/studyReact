import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import TableComponent from '../../Common/Table'
import CategoryTabs from '../../Components/Banner/CategoryTabs';
import SearchBar from '../../Components/Account/SearchBar';
import Modal from '../../Common/Modal';
import ModalBodyNormal from '../../Components/Account/ModalBodyNormal';
import ModalBodySellever from '../../Components/Account/ModalBodySellever';

// Actions
import * as ActionAccount from "../../Data/Account/actions";

// Styles
import stylesAccount from '../../Styles/Containers/Account.css';
import stylesTable from '../../Styles/Common/Table.css'
import styles from '../../Styles/App.css';

// Utils
import Config from "../../Lib/Api/config";
import * as DateUtil from "../../../Admin/Lib/Utils/date";
import * as ActionProduct from "../../Data/Product/action";
import * as convert from "../../Lib/Utils/converter";
import * as ActionOrder from "../../Data/Order/actions";

class AccountList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',              // 상품제목
            storeId: '',            // 셀레버 userId
            price: '',              // 상품단가
            category: '',           // 카테고리
            descriptionShort: '',   // 간단설명
            hashtags: '',           // 해시태그
            description: '',         // 상품설명
            selectedIndex: 0,
            type: 0,
            keyword: '',
            totalCount: 0,
            modalBody: '',
            initialPage: 0,
        }

        this.getTotalCount = this.getTotalCount.bind(this);
        this.itemDelete = this.itemDelete.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.keywordChange = this.keywordChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.addSellever = this.addSellever.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem('accountPage')){
            this.setState({
                initialPage: Number(localStorage.getItem('accountPage')),
                selectedIndex: 1,
                type: 2
            })
            // this.tableComponent.loadList(Number(localStorage.getItem('fundingPage')));
            localStorage.clear();
        }
    }

    getTotalCount(total){
        this.setState({totalCount: total})
    }

    keywordChange(keyword){
        this.setState({keyword: keyword})
    }

    onSearch(){
        this.reset();
    }

    onTabChange(i){
        let type;
        if(i === 0){
            type = 0;
        }else{
            type = 2;
        }
        this.setState({
            selectedIndex: i,
            type: type
        });
        this.reset();
    }

    addSellever(e){
        if(this.state.selectedIndex === 0){
            e.preventDefault()
        }
    }

    reset(){
        setTimeout(()=>{
            this.tableComponent.reset();
        })
    }

    itemDelete(event, product, index){
        event.stopPropagation();
        if (window.confirm('삭제하시겠습니까?')){
            console.log(product)
            let param = {
                userId: product.userId,
            };

            ActionAccount.deleteUser(param)
                .then((response) => {
                    this.reset();
                })
                .catch((err) => {

                })
        }
    }

    itemClick(item, index){

        let param = {
            userId: item.userId,
        }

        ActionAccount.getAccountList(param)
            .then((response)=>{
                console.log(response)
                if(response.code === 200){
                        this.setState({
                            modalBody: this.getView(response.data.users[0], index)
                        })
                        this.modal.open();
                }else{
                    alert('주문정보를 불러오지 못했습니다.');
                }

            })
            .catch((err)=>{
                alert('주문정보를 불러오지 못했습니다.');
            })
    }

    getView(item, index){
        if(this.state.selectedIndex === 0) {
            return(
                <ModalBodyNormal item={item} />
            )
        }else{
            return(
                <ModalBodySellever item={item} />
            )
        }
    }

    render() {
        let headerContent;
        let renderTableHeader;
        let renderTableContent;

        if(this.state.selectedIndex === 0){
            renderTableHeader = Config.PAGE_ACCOUNT_NORMAL.COLUMN_SIZE.map((size, index) => {
                headerContent = (
                    <div
                        className={stylesTable.column + ' ' + stylesTable.tableFieldName}
                        style={{ width: Config.PAGE_ACCOUNT_NORMAL.COLUMN_SIZE[index] }}
                        key={index}
                    >
                        {Config.PAGE_ACCOUNT_NORMAL.COLUMN_NAME[index]}
                    </div>
                );
                return headerContent;
            });

            renderTableContent = (product, index) => {
                return (
                    <div key={index} style={{backgroundColor:'#fff'}}
                         onClick={()=>this.itemClick(product, index)}
                    >
                        <div className={stylesTable.tableContentItem}>
                            <div
                                className={stylesTable.column + ' ' + stylesTable.barcode}
                                style={{ width: Config.PAGE_ACCOUNT_NORMAL.COLUMN_SIZE[0], fontSize: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_SIZE[0], fontWeight: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_WEIGHT[0], color: Config.PAGE_ACCOUNT_NORMAL.COLUMN_COLOR[0] }}
                            >
                                {product[Config.PAGE_ACCOUNT_NORMAL.COLUMN_FIELD[0]]}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config.PAGE_ACCOUNT_NORMAL.COLUMN_SIZE[1], fontSize: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_SIZE[1], fontWeight: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_WEIGHT[1], color: Config.PAGE_ACCOUNT_NORMAL.COLUMN_COLOR[1] }}
                            >
                                <div style={{fontSize:11, fontWeight:'bold', color:'#606060'}}>
                                    {DateUtil.format('point', product[Config.PAGE_FUNDING.COLUMN_FIELD[1]])}
                                </div>
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config.PAGE_ACCOUNT_NORMAL.COLUMN_SIZE[2], fontSize: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_SIZE[2], fontWeight: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_WEIGHT[2], color: Config.PAGE_ACCOUNT_NORMAL.COLUMN_COLOR[2] }}
                            >
                                {product[Config.PAGE_ACCOUNT_NORMAL.COLUMN_FIELD[2]]}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{width: Config.PAGE_ACCOUNT_NORMAL.COLUMN_SIZE[3], fontSize: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_SIZE[3], fontWeight: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_WEIGHT[3], color: Config.PAGE_ACCOUNT_NORMAL.COLUMN_COLOR[3] }}
                            >
                                {product[Config.PAGE_ACCOUNT_NORMAL.COLUMN_FIELD[3]]}

                            </div>
                            <div
                                className={stylesTable.column}
                                style={{width: Config.PAGE_ACCOUNT_NORMAL.COLUMN_SIZE[4], fontSize: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_SIZE[4], fontWeight: Config.PAGE_ACCOUNT_NORMAL.COLUMN_FONT_WEIGHT[4], color: Config.PAGE_ACCOUNT_NORMAL.COLUMN_COLOR[4] }}
                            >

                                <div style={{width:'98%', height:60, }}>
                                    <div style={{height:20, marginTop:-10}}>
                                        {convert.converNumberComma(product[Config.PAGE_ACCOUNT_NORMAL.COLUMN_FIELD[4]])}
                                    </div>
                                    <div style={{height:20}}>
                                        {convert.converNumberComma(product[Config.PAGE_ACCOUNT_NORMAL.COLUMN_FIELD[5]])}
                                    </div>

                                </div>
                            </div>

                            <div className={stylesTable.btnBox}>
                                <div
                                    onClick={(event)=>this.itemDelete(event, product, index)}
                                    className={stylesTable.delete}
                                >
                                    삭제
                                </div>
                            </div>
                        </div>

                        <div className={stylesAccount.tableItemUnerline}></div>

                    </div>
                )
            }
        }else{
            renderTableHeader = Config.PAGE_ACCOUNT_SELLEVER.COLUMN_SIZE.map((size, index) => {
                headerContent = (
                    <div
                        className={stylesTable.column + ' ' + stylesTable.tableFieldName}
                        style={{ width: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_SIZE[index] }}
                        key={index}
                    >
                        {Config.PAGE_ACCOUNT_SELLEVER.COLUMN_NAME[index]}
                    </div>
                );
                return headerContent;
            });

            renderTableContent = (product, index) => {
                return (
                    <div key={index} style={{backgroundColor:'#fff'}}
                         onClick={()=>this.itemClick(product, index)}
                    >
                        <div className={stylesTable.tableContentItem}>
                            <div
                                className={stylesTable.column + ' ' + stylesTable.barcode}
                                style={{ width: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_SIZE[0], fontSize: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FONT_SIZE[0], fontWeight: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FONT_WEIGHT[0], color: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_COLOR[0] }}
                            >
                                {product[Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FIELD[0]]}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_SIZE[1], fontSize: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FONT_SIZE[1], fontWeight: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FONT_WEIGHT[1], color: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_COLOR[1] }}
                            >
                                <div style={{fontSize:11, fontWeight:'bold', color:'#606060'}}>
                                    {DateUtil.format('point', product[Config.PAGE_FUNDING.COLUMN_FIELD[1]])}
                                </div>
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_SIZE[2], fontSize: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FONT_SIZE[2], fontWeight: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FONT_WEIGHT[2], color: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_COLOR[2] }}
                            >
                                {product[Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FIELD[2]]}
                            </div>

                            <div
                                className={stylesTable.column + ' ' + stylesTable.multiColumn}
                                style={{ paddingLeft:28, paddingRight:10, width: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_SIZE[3], fontSize: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FONT_SIZE[3], fontWeight: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FONT_WEIGHT[3], color: Config.PAGE_ACCOUNT_SELLEVER.COLUMN_COLOR[3] }}
                            >
                                {product[Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FIELD[3]]}
                                <div style={{position:'relative', bottom:46, color:'#707070', fontSize:12}}>{product[Config.PAGE_ACCOUNT_SELLEVER.COLUMN_FIELD[7]]}</div>
                            </div>
                            <div className={stylesTable.btnBox}>
                                <div
                                    onClick={(event)=>this.itemDelete(event, product, index)}
                                    className={stylesTable.delete}
                                >
                                    삭제
                                </div>
                                <Link
                                    to={{
                                        pathname: '/admin/account/form',
                                        state: {
                                            item: product,
                                            page: this.tableComponent.getForcePage()
                                        }
                                    }}
                                    onClick={(event)=>event.stopPropagation()}
                                    className={stylesTable.edit}
                                >
                                    <div>수정</div>
                                </Link>
                            </div>
                        </div>
                        <div className={stylesAccount.tableItemUnerline}></div>
                    </div>
                )
            }
        }

        return (
            <div className={stylesAccount.accountContainer}>

                <div className={stylesAccount.topContainer}>
                    <li className={styles.inline}>
                        <div className={stylesAccount.title}>계정관리</div>
                        <div className={stylesAccount.titleCircle}></div>
                    </li>

                    <SearchBar
                        keyword={this.state.keyword}
                        keywordChange={this.keywordChange}
                        onSearch={this.onSearch}
                    />

                    <CategoryTabs
                        tabs={['일반회원', 'Sellever']}
                        selectedTab={this.state.selectedIndex}
                        onTabChange={this.onTabChange}
                    />

                    <Link
                        to={{
                            pathname: '/admin/account/form',
                            state: {
                                page: 0
                            }
                        }}
                        >
                        <div className={stylesAccount.addBtn}
                             style={{backgroundColor: this.state.selectedIndex === 0 && '#d6d6d6'}}
                             onClick={(e)=>this.addSellever(e)}
                        >
                            셀레버 등록
                        </div>
                    </Link>

                </div>

                {
                    this.state.selectedIndex === 0
                        ?
                        <div className={stylesAccount.bgImage}></div>
                        :
                        <div className={stylesAccount.bgImage2}></div>
                }


                <div className={stylesAccount.subTitleBox}>
                    <li className={stylesAccount.listTitle} style={{display:'inline-block'}}>셀레버</li>
                    <li className={stylesAccount.listCount} style={{display:'inline-block'}}>{this.state.totalCount}</li>
                </div>

                <div className={stylesTable.tableHeaderBox} >
                    <TableComponent
                        onRef={(ref) => { this.tableComponent = ref; }}
                        Get={ActionAccount.getAccountList}
                        GetCount={ActionAccount.getAccountCount}
                        isTabComponent={true}
                        HeaderComponent={renderTableHeader}
                        ListComponent={renderTableContent}
                        listString={"users"}
                        totalCount={this.getTotalCount}
                        initialPage={this.state.initialPage}
                        Params={{
                            type:this.state.type,
                            searchQuery: this.state.keyword
                        }}
                    />
                </div>

                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    bigContainer={false}
                    type={this.state.selectedIndex === 0 ? 'account_normal' : 'account_sellever'}
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
})(withRouter(AccountList));