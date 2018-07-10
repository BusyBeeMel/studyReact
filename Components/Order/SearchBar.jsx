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
import stylesOrder from '../../Styles/Components/Order.css';
import styles from '../../Styles/App.css';

// Utils
import DatePicker from 'react-datepicker';
import { format as DateFormat, getCurrentTimeStamp } from '../../Lib/Utils/date';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange        = this.handleChange.bind(this);
        this.onKeywordChange     = this.onKeywordChange.bind(this);
        this.onKeywordPress      = this.onKeywordPress.bind(this);
        this.goSearch            = this.goSearch.bind(this);
    }

    handleChange(type, date){
        this.props.searchDateChange(type, date);
    }

    onKeywordChange(text){
        this.props.searchKeywordChange(text);
    }

    onKeywordPress(e){
        this.props.searchKeyPress(e.key);
    }

    goSearch(){
        this.props.goSearch();
    }


    render() {

        return (
                <div className={stylesOrder.searchContainer}>

                    <div className={stylesOrder.searchBar}>
                        <ul>
                            <li className={stylesOrder.searchCol}>기간조회</li>
                            <li className={stylesOrder.searchCol2}>
                                <DatePicker
                                    ref={(c) => this._calendar = c}
                                    customInput={<DateCustomInput dateText={this.props.startDate} />}
                                    onChange={this.handleChange.bind(this, 'start')} />
                            </li>
                            <li className={stylesOrder.searchCol3}>
                                ~
                            </li>
                            <li className={stylesOrder.searchCol4}>
                                <DatePicker
                                    customInput={<DateCustomInput dateText={this.props.endDate} />}
                                    onChange={this.handleChange.bind(this, 'end')} />
                            </li>
                            <li className={stylesOrder.searchCol5}>
                                <div className={stylesOrder.dateImage} onClick={()=> this._calendar.setOpen(true)}>
                                </div>
                            </li>
                            <li className={stylesOrder.searchCol6}>
                                <div className={stylesOrder.pipe}></div>
                            </li>
                            <li className={stylesOrder.searchCol7} >검색</li>
                            <li className={stylesOrder.searchCol8}>
                                <input type="text"
                                       placeholder="검색어를 입력하세요"
                                       className={stylesOrder.searchInput}
                                       onChange={(e) => this.onKeywordChange(e.target.value)}
                                       onKeyPress={(e) => this.onKeywordPress(e)}
                                />
                            </li>
                            <li className={styles.inlineBlock}>
                                <div className={stylesOrder.searchImgBox}
                                     onClick={this.goSearch}>
                                    <div className={stylesOrder.searchImg} ></div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SearchBar));