import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import TableComponent from '../../Common/Table'

// Styles
import stylesFunding from '../../Styles/Components/Funding.css';
import stylesTable from '../../Styles/Common/Table.css'
import styles from '../../Styles/App.css';

// Utils
import * as convert from "../../Lib/Utils/converter";
import * as ActionProduct from "../../Data/Product/action";
import Config from "../../Lib/Api/config";
import * as DateUtil from "../../Lib/Utils/date";
import {categoryId2Name} from "../../Data/Product/category";

class ModalBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    getHashTag(tags){
        if(tags){
            return(
                tags.map((key, i)=>{
                    let tag = '#'+key.hashtag;
                    if(tags.length !== (i+1)){
                        tag += ',';
                    }
                    return tag;
                })
            )
        }
    }

    render() {
        let {item} = this.props;

        let renderTableHeader = () => {
            let tableFields = Config.POPUP_FUNDING_OPTION.COLUMN_SIZE.map((size, index) => {
                if (index === 11111 ) {
                    return (
                        <div>
                        </div>
                    );
                } else {
                    return (
                        <div
                            className={stylesTable.column + ' ' + stylesTable.tableFieldName}
                            style={{ width: Config.POPUP_FUNDING_OPTION.COLUMN_SIZE[index], borderLeft:index !==0 ? '1px solid #ccc' : '', borderBottom:'1px solid #bdbdbd', color:'#555', fontSize:13, height:30, lineHeight:2}}
                            key={index}
                        >
                            {Config.POPUP_FUNDING_OPTION.COLUMN_NAME[index]}
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
        let renderTableContent = (product, index) => {
            console.log('smw')
            console.log(product)
            return (
                <div key={index} style={{backgroundColor:'#fff'}}>
                    <div key={index} className={stylesTable.tableContentItem} style={{height:35, paddingTop:5}}>
                        <div
                            style={{height:30, lineHeight:2, width: Config.POPUP_FUNDING_OPTION.COLUMN_SIZE[0], fontSize: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_SIZE[0], fontWeight: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_WEIGHT[0], color: Config.POPUP_FUNDING_OPTION.COLUMN_COLOR[0] }}
                        >
                            {product[Config.POPUP_FUNDING_OPTION.COLUMN_FIELD[0]]}
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_FUNDING_OPTION.COLUMN_SIZE[1], fontSize: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_SIZE[1], fontWeight: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_WEIGHT[1], color: Config.POPUP_FUNDING_OPTION.COLUMN_COLOR[1] }}
                        >
                            {convert.converNumberComma(product[Config.POPUP_FUNDING_OPTION.COLUMN_FIELD[1]])}원
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_FUNDING_OPTION.COLUMN_SIZE[2], fontSize: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_SIZE[2], fontWeight: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_WEIGHT[2], color: Config.POPUP_FUNDING_OPTION.COLUMN_COLOR[2] }}
                        >
                            {DateUtil.format('defalut', product[Config.POPUP_FUNDING_OPTION.COLUMN_FIELD[2]])}
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_FUNDING_OPTION.COLUMN_SIZE[3], fontSize: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_SIZE[3], fontWeight: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_WEIGHT[3], color: Config.POPUP_FUNDING_OPTION.COLUMN_COLOR[3] }}
                        >
                            {convert.converNumberComma(product[Config.POPUP_FUNDING_OPTION.COLUMN_FIELD[3]])}원
                        </div>
                        <div
                            style={{height:30, lineHeight:2,  width: Config.POPUP_FUNDING_OPTION.COLUMN_SIZE[4], fontSize: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_SIZE[4], fontWeight: Config.POPUP_FUNDING_OPTION.COLUMN_FONT_WEIGHT[4], color: Config.POPUP_FUNDING_OPTION.COLUMN_COLOR[4] }}
                        >
                            {product[Config.POPUP_FUNDING_OPTION.COLUMN_FIELD[4]]}
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <div className={styles.popupTitle}>상품 정보</div>
                <div className={stylesFunding.popupTopContainer}>

                    <div className={styles.popupTopText}>
                        상품ID <span className={styles.popupTopSubText}>{item.productId}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        상품명 <span className={styles.popupTopSubText}>{item.title}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        셀레버 <span className={styles.popupTopSubText}>{item.store.name}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        셀레버ID <span className={styles.popupTopSubText}>{item.store.userId}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        간단설명 <span className={styles.popupTopSubText}>{item.descriptionShort}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        카테고리명 <span className={styles.popupTopSubText}>{categoryId2Name[item.category]}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        해시태그 <span className={styles.popupTopSubText}>{this.getHashTag(item.hashtags)}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        펀딩마감일 <span className={styles.popupTopSubText}>{DateUtil.format('defalut', item.typeInfo.endAt)}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        펀딩시작일 <span className={styles.popupTopSubText}>{DateUtil.format('defalut', item.typeInfo.startAt)}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        모금목표액 <span className={styles.popupTopSubText}>{convert.converNumberComma(item.typeInfo.goalToRaise)}원</span>
                    </div>
                    <div className={styles.popupTopText}>
                        모금도달액 <span className={styles.popupTopSubText}>{convert.converNumberComma(item.typeInfo.currentRaise)}원</span>
                    </div>
                    <div className={styles.popupTopText}>
                        조회수 <span className={styles.popupTopSubText}>{item.hitAmount}</span>
                    </div>
                    <div className={styles.popupTopText}>
                        좋아요수 <span className={styles.popupTopSubText}>{item.likeAmount}</span>
                    </div>
                </div>

                <div className={styles.popupTitle} style={{marginTop:20}}>옵션 목록</div>
                <div className={stylesTable.tableHeaderBox}>
                    <TableComponent
                        onRef={(ref) => { this.tableComponent = ref; }}
                        Get={this.props.item}
                        GetCount={ActionProduct.getProductListCount}
                        isTabComponent={true}
                        HeaderComponent={renderTableHeader()}
                        ListComponent={renderTableContent}
                        listString={'products'}
                        type={'popup'}
                        pageView={'hide'}
                        Params={{}}
                    />
                </div>

            </div>
        )
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(ModalBody));
