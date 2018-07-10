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
import stylesStat from '../../Styles/Components/Statistics.css';
import styles from '../../Styles/App.css';

// Utils
import DatePicker from 'react-datepicker';
import { format as DateFormat, getCurrentTimeStamp } from '../../Lib/Utils/date';
import {categoryId2Name} from "../../Data/Product/category";


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectBox: 0,
            selectBox2: 0,
        }

        this.handleChange        = this.handleChange.bind(this);
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.onKeyDown =  this.onKeyDown.bind(this);

        this.payOptionSelectChange = this.payOptionSelectChange.bind(this);
        this.payStateSelectChange = this.payStateSelectChange.bind(this);

        this.goSearch = this.goSearch.bind(this);
    }

    payOptionSelectChange(val){
        this.props.payOptionSelectChange(val);
    }

    payStateSelectChange(val){
        this.props.payStateSelectChange(val);
    }

    handleChange(type, date){
        this.props.searchDateChange(type, date);
    }

    onKeywordChange(text){
        this.props.keywordChange(text);
    }

    onKeyDown(e){
        if(e.key === 'Enter'){
            this.props.onSearch();
        }
    }

    goSearch(){
        this.props.onSearch();
    }


    render() {
        if(this.props.type === 0){
            return (
                <div className={stylesStat.searchContainer}>

                    <div className={stylesStat.searchBar}>
                        <ul>
                            <li className={stylesStat.searchDropdownCol}>
                            <span>
                                <select className={stylesStat.selectCustomer} value={this.props.payOptionSelect} onChange={(e) => this.payOptionSelectChange(e.target.value)} style={{border:0, backgroundColor:'#fff'}}>
                                        <option value={0}>결제방식</option>
                                        <option value={1}>전체</option>
                                        <option value={'card'}>카드</option>
                                        <option value={'phone'}>휴대폰</option>
                                </select>
                            </span>
                            </li>
                            <li className={stylesStat.searchCol6}>
                                <div className={stylesStat.pipe}></div>
                            </li>
                            <li className={stylesStat.searchDropdownCol}>
                                <select className={stylesStat.selectCustomer} value={this.props.payStateSelect} onChange={(e) => this.payStateSelectChange(e.target.value)} style={{border:0, backgroundColor:'#fff'}}>
                                    <option value={-1}>결제상태</option>
                                    <option value={-1}>전체</option>
                                    <option value={2}>결제성공</option>
                                    <option value={3}>결제실패</option>
                                    <option value={4}>결제취소</option>
                                    <option value={5}>결제대기</option>
                                    <option value={6}>펀딩대기</option>
                                </select>
                            </li>
                            <li className={stylesStat.searchCol6}>
                                <div className={stylesStat.pipe}></div>
                            </li>

                            <li className={stylesStat.searchCol}>기간조회</li>
                            <li className={stylesStat.searchCol2}>
                                <DatePicker
                                    ref={(c) => this._calendar = c}
                                    customInput={<DateCustomInput dateText={this.props.startDate} />}
                                    onChange={this.handleChange.bind(this, 'start')} />
                            </li>
                            <li className={stylesStat.searchCol3}>
                                ~
                            </li>
                            <li className={stylesStat.searchCol4}>
                                <DatePicker
                                    customInput={<DateCustomInput dateText={this.props.endDate} />}
                                    onChange={this.handleChange.bind(this, 'end')} />
                            </li>
                            <li className={stylesStat.searchCol5}>
                                <div className={stylesStat.dateImage} onClick={()=> this._calendar.setOpen(true)}>
                                </div>
                            </li>
                            <li className={stylesStat.searchCol6}>
                                <div className={stylesStat.pipe}></div>
                            </li>
                            <li className={stylesStat.searchCol7} >검색</li>
                            <li className={stylesStat.searchCol8}>
                                <input type="text"
                                       placeholder="productId를 입력해주세요"
                                       className={stylesStat.searchInput}
                                       onChange={(e)=>this.onKeywordChange(e.target.value)}
                                       onKeyDown={this.onKeyDown}
                                />
                            </li>
                            <li className={styles.inlineBlock}>
                                <div className={stylesStat.searchImgBox}
                                     onClick={this.goSearch}>
                                    <div className={stylesStat.searchImg} ></div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            );
        }else{
            return(
                <div className={stylesStat.searchContainer}>

                    <div className={stylesStat.searchSelectBar}>
                        <ul style={{paddingLeft:15}}>
                            <li className={stylesStat.searchCol} >기간조회</li>
                            <li className={stylesStat.searchCol2}>
                                <DatePicker
                                    ref={(c) => this._calendar = c}
                                    customInput={<DateCustomInput dateText={this.props.startDate} />}
                                    onChange={this.handleChange.bind(this, 'start')} />
                            </li>
                            <li className={stylesStat.searchCol3}>
                                ~
                            </li>
                            <li className={stylesStat.searchCol4}>
                                <DatePicker
                                    customInput={<DateCustomInput dateText={this.props.endDate} />}
                                    onChange={this.handleChange.bind(this, 'end')} />
                            </li>
                            <li className={stylesStat.searchCol5}>
                                <div className={stylesStat.dateImage} onClick={()=> this._calendar.setOpen(true)}>
                                </div>
                            </li>
                            <li className={stylesStat.searchCol6}>
                                <div className={stylesStat.pipe}></div>
                            </li>
                            <li className={stylesStat.searchCol7} >검색</li>
                            <li className={stylesStat.searchCol8}>
                                <input type="text"
                                       placeholder="productId를 입력해주세요"
                                       className={stylesStat.searchInput}
                                       onChange={(e)=>this.onKeywordChange(e.target.value)}
                                       onKeyDown={this.onKeyDown}
                                />
                            </li>
                            <li className={styles.inlineBlock}>
                                <div className={stylesStat.searchImgBox}
                                     onClick={this.goSearch}>
                                    <div className={stylesStat.searchImg} ></div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            )
        }
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SearchBar));