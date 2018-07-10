import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Config from '../../Lib/Api/config';

// Components
import TableComponent from '../../Common/Table'
import Modal from '../../Common/Modal';
import ModalBody from '../../Components/Market/ModalBody';

// Actions
import * as ActionProduct from "../../Data/Product/action";
import {categoryId2Name} from "../../Data/Product/category";

// Styles
import stylesMarket from '../../Styles/Containers/Market.css';
import stylesTable from '../../Styles/Common/Table.css'
import styles from '../../Styles/App.css';

// Utils
import * as DateUtil from "../../../Admin/Lib/Utils/date";
import * as convert from "../../../Admin/Lib/Utils/converter";


class MarketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            sort: 'desc',
            sortMethod: 'date',
            totalCount: 0,
            category: 0,
            modalBody: '',
            initialPage: 0,
            isChecked: false
        }

        this.handleChangeChk = this.handleChangeChk.bind(this);
        this.getTotalCount = this.getTotalCount.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.itemDelete = this.itemDelete.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem('marketPage')){
            this.setState({
                initialPage: Number(localStorage.getItem('marketPage'))
            })
            // this.tableComponent.loadList(Number(localStorage.getItem('fundingPage')));
            localStorage.clear();
        }
    }

    getTotalCount(total){
        this.setState({totalCount: total})
    }

    itemClick(item, index){
        let param = {
            productId: item.productId
        }

        ActionProduct.getOneProduct(param)
            .then((response)=>{
                console.log(response)
                if(response.code === 200){
                    this.setState({
                        modalBody: this.getView(response.data.product, index)
                    })
                    this.modal.open();
                }else{
                    alert('정보를 불러오지 못했습니다.');
                }

            })
            .catch((err)=>{
                alert('정보를 불러오지 못했습니다.');
            })
    }

    getView(item, index){
        return(
            <ModalBody item={item} />
        )
    }

    itemDelete(event, product, index){
        event.stopPropagation();
        if (window.confirm('삭제하시겠습니까?')){
            let param = {
                productId: product.productId,
                isDeleted: true,
            }

            console.log(param)

            ActionProduct.updateProduct(param)
                .then((response) => {
                    console.log(response)
                    this.reset();
            });
        }
    }


    categoryChange(val){
        this.setState({category: val});
        this.reset();
    }

    sortTable(index){

        if (index == 5) {
            this.setState({
                sort: this.state.sort === 'desc' ? 'asc' : 'desc',
                sortMethod: 'hit'
            });
        } else if (index == 6) {
            this.setState({
                sort: this.state.sort === 'desc' ? 'asc' : 'desc',
                sortMethod: 'like'
            });
        }
        this.reset();
    }

    reset(){
        setTimeout(() => {
            this.tableComponent.reset();
        })
    }

    handleChangeChk(){
        this.setState({
            isChecked: !this.state.isChecked,
        });

        this.reset();
    }

    render() {

        let renderTableHeader = () => {
            let tableFields = Config.PAGE_MARKET.COLUMN_SIZE.map((size, index) => {
                if (index === 5 || index === 6) {
                    return (
                        <div
                            className={stylesTable.column + ' ' + stylesTable.withCursor + ' ' + stylesTable.tableFieldName}
                            style={{ width: Config.PAGE_MARKET.COLUMN_SIZE[index] }}
                            key={index}
                            onClick={this.sortTable.bind(this, index)}
                        >
                            {Config.PAGE_MARKET.COLUMN_NAME[index]}
                            { index == 5 && this.state.sort == 'desc' ? <span className={styles.downArrow} ></span> : null}
                            { index == 5 && this.state.sort == 'asc' ? <span className={styles.upArrow} ></span> : null}
                            { index == 6 && this.state.sort == 'desc' ? <span className={styles.downArrow} ></span> : null}
                            { index == 6 && this.state.sort == 'asc' ? <span className={styles.upArrow} ></span> : null}
                        </div>
                    );
                } else {
                    return (
                        <div
                            className={stylesTable.column + ' ' + stylesTable.tableFieldName}
                            style={{ width: Config.PAGE_MARKET.COLUMN_SIZE[index] }}
                            key={index}
                        >
                            {Config.PAGE_MARKET.COLUMN_NAME[index]}
                        </div>
                    );
                }
            });
            return (
                <div>
                    <div className={stylesTable.tableOption}>
                        <select className={stylesTable.categorySelect} value={this.state.category} onChange={(e) => this.categoryChange(e.target.value)}>
                            <option value={0} selected={true}>카테고리 선택</option>
                            <option value={1}>{categoryId2Name[1]}</option>
                            <option value={2}>{categoryId2Name[2]}</option>
                            <option value={3}>{categoryId2Name[3]}</option>
                            <option value={4}>{categoryId2Name[4]}</option>
                            <option value={5}>{categoryId2Name[5]}</option>
                            <option value={6}>{categoryId2Name[6]}</option>
                            <option value={7}>{categoryId2Name[7]}</option>
                            <option value={8}>{categoryId2Name[8]}</option>
                            <option value={9}>{categoryId2Name[9]}</option>
                            <option value={10}>{categoryId2Name[10]}</option>
                            <option value={11}>{categoryId2Name[11]}</option>
                            <option value={12}>{categoryId2Name[12]}</option>
                            <option value={13}>{categoryId2Name[13]}</option>
                            {/*{this.optionList()}*/}
                        </select>

                        <div style={{float:'left', color:'#000', marginRight:8}}>
                            <input type="checkbox" checked={this.state.isChecked} onChange={this.handleChangeChk} /> 삭제내역 포함
                        </div>

                    </div>
                    <div>{tableFields}</div>
                </div>
            );
        }

        let renderTableContent = (product, index) => {
            return (
                <div key={index} style={{backgroundColor:'#ffffff'}}
                     onClick={()=>this.itemClick(product, index)}>

                    <div className={stylesTable.tableContentItem}>
                        <div
                            className={stylesTable.column + ' ' + stylesTable.barcode}
                            style={{ width: Config.PAGE_MARKET.COLUMN_SIZE[0], fontSize: Config.PAGE_MARKET.COLUMN_FONT_SIZE[0], fontWeight: Config.PAGE_MARKET.COLUMN_FONT_WEIGHT[0], color: Config.PAGE_MARKET.COLUMN_COLOR[0] }}
                        >
                          <div style={{fontSize:11, fontWeight:'bold'}}>
                            {product[Config.PAGE_MARKET.COLUMN_FIELD[0]]}
                          </div>
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_MARKET.COLUMN_SIZE[1], fontSize: Config.PAGE_MARKET.COLUMN_FONT_SIZE[1], fontWeight: Config.PAGE_MARKET.COLUMN_FONT_WEIGHT[1], color: Config.PAGE_MARKET.COLUMN_COLOR[1] }}
                        >
                          <div style={{fontSize:11, fontWeight:'bold', color:'#606060'}}>
                              {product[Config.PAGE_MARKET.COLUMN_FIELD[1]] === 0 ? '전체' : categoryId2Name[product[Config.PAGE_MARKET.COLUMN_FIELD[1]]]}
                          </div>
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{  width: Config.PAGE_MARKET.COLUMN_SIZE[2], fontSize: Config.PAGE_MARKET.COLUMN_FONT_SIZE[2],
                                fontWeight: Config.PAGE_MARKET.COLUMN_FONT_WEIGHT[2], color:  product[Config.PAGE_MARKET.COLUMN_FIELD[2]] === 0 ? '#fa2828' : '#000' }}
                        >
                            {product[Config.PAGE_MARKET.COLUMN_FIELD[2]]}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{width: Config.PAGE_MARKET.COLUMN_SIZE[3], fontSize: Config.PAGE_MARKET.COLUMN_FONT_SIZE[3], fontWeight: Config.PAGE_MARKET.COLUMN_FONT_WEIGHT[3], color: Config.PAGE_MARKET.COLUMN_COLOR[3] }}
                        >
                            {product[Config.PAGE_MARKET.COLUMN_FIELD[3]] !== null ? convert.converNumberComma(product[Config.PAGE_MARKET.COLUMN_FIELD[3]])+'원' : ''}
                        </div>
                        <div
                            className={stylesTable.column + ' ' + stylesTable.leftColumn}
                            style={{ width: Config.PAGE_MARKET.COLUMN_SIZE[4], fontSize: Config.PAGE_MARKET.COLUMN_FONT_SIZE[4], fontWeight: Config.PAGE_MARKET.COLUMN_FONT_WEIGHT[4], color: Config.PAGE_MARKET.COLUMN_COLOR[4] }}
                        >
                            <div className={stylesTable.tableImage} style={{ backgroundImage: product[Config.PAGE_MARKET.COLUMN_FIELD[4]].profileUrl ? 'url("' + product[Config.PAGE_MARKET.COLUMN_FIELD[4]].profileUrl + '")' : 'url("/admin/assets/img/common/img_ready_big.png")' }}></div>
                            <div className={stylesTable.tableImageContent}>{product[Config.PAGE_MARKET.COLUMN_FIELD[4]].name}</div>
                        </div>

                        <div
                            className={stylesTable.column}
                            style={{width: Config.PAGE_MARKET.COLUMN_SIZE[5], fontSize: Config.PAGE_MARKET.COLUMN_FONT_SIZE[5], fontWeight: Config.PAGE_MARKET.COLUMN_FONT_WEIGHT[5], color: Config.PAGE_MARKET.COLUMN_COLOR[5] }}
                        >
                            {product[Config.PAGE_MARKET.COLUMN_FIELD[5]]}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_MARKET.COLUMN_SIZE[6], fontSize: Config.PAGE_MARKET.COLUMN_FONT_SIZE[6], fontWeight: Config.PAGE_MARKET.COLUMN_FONT_WEIGHT[6], color: Config.PAGE_MARKET.COLUMN_COLOR[6] }}
                        >
                            {product[Config.PAGE_MARKET.COLUMN_FIELD[6]]}
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
                                    pathname: '/admin/market/form',
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

                    <div className={stylesMarket.tableItemUnerline}></div>

                </div>
            )
        }
        return (
            <div className={stylesMarket.marketContainer}>

              <div className={stylesMarket.listTopBox}>
                <div className={stylesMarket.listTopBoxLeft}>
                        <div className={stylesMarket.marketTitle}>마켓관리
                            <span className={stylesMarket.redText}>{this.state.totalCount}</span>
                        </div>
                    </div>

                    <Link
                        to={{
                            pathname: '/admin/market/form',
                            state: {
                                page: 0
                            }
                        }}
                    >
                      <div className={stylesMarket.uploadContainer}>
                        <div className={stylesMarket.uploadImgWrap}>
                          <div className={stylesMarket.uploadImage}></div>
                        </div>

                        <div className={stylesMarket.uploadText}>
                          마켓 업로드
                        </div>
                      </div>
                    </Link>
                </div>
                <div className={stylesMarket.bgImage}>
                </div>

                <div className={styles.space20}></div>

                <div className={stylesTable.tableHeaderBox}>
                    <TableComponent
                        onRef={(ref) => { this.tableComponent = ref; }}
                        Get={ActionProduct.getProductList}
                        GetCount={ActionProduct.getProductListCount}
                        listString={"products"}
                        isTabComponent={true}
                        HeaderComponent={renderTableHeader()}
                        ListComponent={renderTableContent}
                        totalCount={this.getTotalCount}
                        initialPage={this.state.initialPage}
                        Params={{
                            sort: this.state.sort,
                            isFunding: false,
                            isNormal: true,
                            isVideo: false,
                            count: 20,
                            category: this.state.category,
                            includeDeleted: this.state.isChecked
                        }}
                    />
                </div>

                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    bigContainer={false}
                    type={'product'}
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
})(withRouter(MarketList));