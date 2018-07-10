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

class OptionDigitalBox extends React.Component {
    constructor(props) {
        super(props);

        this.titleChange = this.titleChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.imageUrlChange = this.imageUrlChange.bind(this);
    }

    titleChange(text){
        this.props.titleChange(this.props.index, text);
    }
    priceChange(text){
        this.props.priceChange(this.props.index, text);
    }
    imageUrlChange(e){
        this.props.imageUrlChange(this.props.index, e.target.files[0]);
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


                <div className={styleMarket.formOptionDigitalBox} >
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
                        <div className={styleMarket.optionRowTitle}>파일 업로드</div>
                        <div className={styleMarket.op_imgAddBtn}>
                            <label className={styleMarket.inputLabel} htmlFor={'op_uploadImage'+this.props.index}>썸네일 등록</label>
                            <input onChange={(e) => this.imageUrlChange(e)} id={'op_uploadImage'+this.props.index} className={styleMarket.inputFile}  type={'file'} accept={'image/*'} />
                        </div>
                        <div className={styleMarket.optionRowRight} style={{position:'relative', top:-40}}>
                            <div style={{width:40, height:40, borderRadius:20, backgroundImage:'url('+this.props.imageUrl+')', backgroundSize:'cover'}}>
                            </div>
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
})(withRouter(OptionDigitalBox));