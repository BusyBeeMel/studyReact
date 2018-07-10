import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import Autocomplete from '@celebryts/react-autocomplete-tags'

// Styles
import styleMarket from '../../Styles/Components/Market.css';
import styles from '../../Styles/App.css';

// Utils

class MiddleBox extends React.Component {
    constructor(props) {
        super(props);

        this.descriptionShotChange = this.descriptionShotChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addHashTags = this.addHashTags.bind(this);
        this.delHashTags = this.delHashTags.bind(this);
    }

    handleChange(value){
        // console.log(this.refs.test._onClickDelete())
        console.log('Value received from onChange: ' + value)
    }

    descriptionShotChange(text){
        this.props.descriptionShotChange(text);
    }

    addHashTags(tag){
        this.props.addHashTag(tag);
    }

    delHashTags(tags){
        this.props.delHashTag(tags);
    }

    render() {
        return (
            <div className={styleMarket.formMiddleBox}>
                <div className={styleMarket.innerContainer}>
                    <div className={styleMarket.top}>
                        <label className={styleMarket.topTitle}>간단설명</label>
                        <label className={styleMarket.subText}>*상품화면 최상단에서 보이는 글입니다. </label>
                    </div>
                    <div className={styleMarket.cardContainer}>
                        <div className={styleMarket.card}>
                            <textarea value={this.props.descriptionShort}
                                      onChange={(e) => this.descriptionShotChange(e.target.value)}
                                      placeholder={'상품의 간단한 설명 200자 이내로 입력해주세요.'}></textarea>
                        </div>
                    </div>
                </div>

                <div className={styleMarket.innerContainer}>
                    <div className={styleMarket.top}>
                        <label className={styleMarket.topTitle}>해시태그 추가</label>
                    </div>
                    <div className={styleMarket.card} style={{overflow:'auto'}}>
                        <Autocomplete
                            tags={this.props.hashtags}
                            onChange={this.handleChange}
                            className={styleMarket.hashtagInput}
                            saveOnBlur={true}
                            onDelete={(deleteTag, tags)=> this.delHashTags(tags)}
                            onAdd={(item)=> this.addHashTags(item)}
                        />
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
})(withRouter(MiddleBox));