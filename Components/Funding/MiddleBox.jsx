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
import styleFunding from '../../Styles/Components/Funding.css';
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
            <div className={styleFunding.formMiddleBox}>
                <div className={styleFunding.innerContainer}>
                    <div className={styleFunding.top}>
                        <label className={styleFunding.topTitle}>간단설명</label>
                        <label className={styleFunding.subText}>*펀딩탭 최상위 화면에서 보이는 글입니다. </label>
                    </div>
                    <div className={styleFunding.cardContainer}>
                        <div className={styleFunding.card}>
                            <textarea value={this.props.descriptionShort}
                                      onChange={(e) => this.descriptionShotChange(e.target.value)}
                                      placeholder={'펀딩의 간단한 설명 200자 이내로 입력해주세요.'}></textarea>
                        </div>
                    </div>
                </div>

                <div className={styleFunding.innerContainer}>
                    <div className={styleFunding.top}>
                        <label className={styleFunding.topTitle}>해시태그 추가</label>
                    </div>
                    <div className={styleFunding.card} style={{overflow:'auto'}}>
                        {/*<textarea value={this.props.hashtags}*/}
                            {/*onChange={(e) => this.hashtagsChange(e.target.value)}*/}
                            {/*placeholder={'해시태그를 입력해주세요.'}>*/}
                        {/*</textarea>*/}

                        <Autocomplete
                            tags={this.props.hashtags}
                            onChange={this.handleChange}
                            className={styleFunding.hashtagInput}
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