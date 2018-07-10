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
import styleFunding from '../../Styles/Components/Funding.css';
import styles from '../../Styles/App.css';

// Utils
import DatePicker from 'react-datepicker';

class OptionBox extends React.Component {
    constructor(props) {
        super(props);

        this.titleChange = this.titleChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.deliverAtChange = this.deliverAtChange.bind(this);
        this.deliveryPriceChange = this.deliveryPriceChange.bind(this);
        this.inventoryQuantityChange = this.inventoryQuantityChange.bind(this);

        this._calendar = [];
    }

    titleChange(text){
        this.props.titleChange(this.props.index, text);
    }
    priceChange(text){
        this.props.priceChange(this.props.index, text);
    }
    deliverAtChange(date){
        this.props.deliverAtChange(this.props.index, date);
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
                        <div className={styleFunding.top}>
                            <label className={styleFunding.optionTitle}>펀딩상품 옵션</label>
                            <label onClick={()=>this.props.optionAdd()} className={styleFunding.optionAdd}> + 옵션추가하기</label>
                        </div>
                        :
                        this.props.index === 1 &&
                        <div className={styleFunding.top}>
                            <label className={styleFunding.optionTitle} >&nbsp;</label>
                        </div>
                }

                <div className={styleFunding.formOptionBox} >

                    <label onClick={()=>this.props.optionDelete(this.props.index)} className={styleFunding.optionDelete}>삭제하기</label>

                    <div className={styleFunding.optionBoxFirstRow}>
                        <div className={styleFunding.optionRowTitle}>옵션설명</div>
                        <textarea value={this.props.title}
                                  className={styleFunding.optionRowTextarea}
                                  placeholder={'옵션명을 적어주세요'}
                                  onChange={(e) => this.titleChange(e.target.value)}>
                        </textarea>
                    </div>

                    <div className={styleFunding.optionBoxRow}>
                        <div className={styleFunding.optionRowTitle}>가격</div>
                        <input value={this.props.price}
                               className={styleFunding.optionRowInput}
                               placeholder={'가격을 적어주세요'}
                               onChange={(e) => this.priceChange(e.target.value)}>
                        </input>
                        <div className={styleFunding.optionRowRight}>
                            <label className={styleFunding.optionRightText}>원</label>
                        </div>
                    </div>

                    <div className={styleFunding.optionBoxRow}>
                        <div className={styleFunding.optionRowTitle}>발송 예정일</div>
                        <div className={styleFunding.optionRowDate}>
                            <DatePicker
                                ref={(c) => this._calendar[this.props.index] = c}
                                customInput={<DateCustomInput dateText={this.props.deliverAt} placeholderText={'날짜를 입력해주세요'} />}
                                onChange={this.deliverAtChange.bind(this)}
                            />
                        </div>

                        <div className={styleFunding.optionRowRight}>
                            <div className={styleFunding.dateImage} onClick={()=> this._calendar[this.props.index].setOpen(true)}>
                            </div>
                        </div>
                    </div>

                    <div className={styleFunding.optionBoxRow}>
                        <div className={styleFunding.optionRowTitle}>배송비</div>
                        <input value={this.props.deliveryPrice}
                               className={styleFunding.optionRowInput}
                               placeholder={'가격을 적어주세요'}
                               onChange={(e) => this.deliveryPriceChange(e.target.value)}>
                        </input>
                        <div className={styleFunding.optionRowRight}>
                            <label className={styleFunding.optionRightText}>원</label>
                        </div>
                    </div>

                    <div className={styleFunding.optionBoxRow}>
                        <div className={styleFunding.optionRowTitle}>제한수량</div>
                        <input value={this.props.inventoryQuantity}
                               className={styleFunding.optionRowInput}
                               placeholder={'제한수량을 적어주세요'}
                               onChange={(e) => this.inventoryQuantityChange(e.target.value)}>
                        </input>
                        <div className={styleFunding.optionRowRight}>
                            <label className={styleFunding.optionRightText}>개</label>
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