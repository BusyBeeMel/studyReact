import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import stylesAccount from '../../Styles/Components/Account.css';
import styles from '../../Styles/App.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.onKeyDown =  this.onKeyDown.bind(this);
    }

    onKeywordChange(text){
        this.props.keywordChange(text);
    }

    onKeyDown(e){
        if(e.key === 'Enter'){
            this.props.onSearch();
        }
    }
    
    render() {

        return (
            <div className={stylesAccount.searchContainer}>

                <div className={stylesAccount.searchBar}>
                    <ul>
                        <li className={stylesAccount.searchCol} >검색</li>
                        <li className={stylesAccount.searchCol2}>
                            <input value={this.props.keyword}
                                   type="text"
                                   placeholder="검색어를 입력하세요"
                                   onChange={(e)=>this.onKeywordChange(e.target.value)}
                                   onKeyDown={this.onKeyDown}
                            />
                        </li>
                        <li className={styles.inlineBlock} >
                            <div className={stylesAccount.searchImgBox} onClick={this.props.onSearch}>
                                <div className={stylesAccount.searchImg}></div>
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