import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DateCustomInput from '../../Common/Date/DateCustomInput';

// Styles
import styleMarket from '../../Styles/Components/Market.css';
import styles from '../../Styles/App.css';

// Utils
import DatePicker from 'react-datepicker';

class OptionBox extends React.Component {
    constructor(props) {
        super(props);

        this.titleChange = this.titleChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.deliveryPriceChange = this.deliveryPriceChange.bind(this);
        this.inventoryQuantityChange = this.inventoryQuantityChange.bind(this);
    }

    titleChange(text){
        this.props.titleChange(this.props.index, text);
    }
    priceChange(text){
        this.props.priceChange(this.props.index, text);
    }
    deliveryPriceChange(text){
        this.props.deliveryPriceChange(this.props.index, text);
    }
    inventoryQuantityChange(text){
        this.props.inventoryQuantityChange(this.props.index, text);
    }

    render() {
        return (
            <div style={{float:'left', paddingLeft:10}}>
                {
                    this.props.index === 0 ?
                        <div className={styleMarket.top}>
                            <label className={styleMarket.optionTitle}>마켓상품 옵션</label>
                            <label onClick={()=>this.props.optionAdd()} className={styleMarket.optionAdd}> + 옵션추가하기</label>
                        </div>
                        :
                        this.props.index === 1 &&
                        <div className={styleMarket.top}>
                            <label className={styleMarket.optionTitle} >&nbsp;</label>
                        </div>
                }


                <div className={styleMarket.formOptionBox} >
                    <label onClick={()=>this.props.optionDelete(this.props.index)} className={styleMarket.optionDelete}>삭제하기</label>

                    <div className={styleMarket.optionBoxFirstRow}>
                        <div className={styleMarket.optionRowTitle}>옵션명</div>
                        <input value={this.props.title}
                               className={styleMarket.optionRowInput}
                               placeholder={'옵션명을 입력해주세요'}
                               onChange={(e) => this.titleChange(e.target.value)}>
                        </input>
                    </div>

                    <div className={styleMarket.optionBoxRow}>
                        <div className={styleMarket.optionRowTitle}>가격</div>
                        <input value={this.props.price}
                               className={styleMarket.optionRowInput}
                               placeholder={'가격을 적어주세요'}
                               onChange={(e) => this.priceChange(e.target.value)}>
                        </input>
                        <div className={styleMarket.optionRowRight}>
                            <label className={styleMarket.optionRightText}>원</label>
                        </div>
                    </div>

                    <div className={styleMarket.optionBoxRow}>
                        <div className={styleMarket.optionRowTitle}>배송비</div>
                        <input value={this.props.deliveryPrice}
                               className={styleMarket.optionRowInput}
                               placeholder={'가격을 적어주세요'}
                               onChange={(e) => this.deliveryPriceChange(e.target.value)}>
                        </input>
                        <div className={styleMarket.optionRowRight}>
                            <label className={styleMarket.optionRightText}>원</label>
                        </div>
                    </div>

                    <div className={styleMarket.optionBoxRow}>
                        <div className={styleMarket.optionRowTitle}>제한수량</div>
                        <input value={this.props.inventoryQuantity}
                               className={styleMarket.optionRowInput}
                               placeholder={'제한수량을 적어주세요'}
                               onChange={(e) => this.inventoryQuantityChange(e.target.value)}>
                        </input>
                        <div className={styleMarket.optionRowRight}>
                            <label className={styleMarket.optionRightText}>개</label>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(OptionBox));