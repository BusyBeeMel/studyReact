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
import styleVideo from '../../Styles/Components/Video.css';
import styles from '../../Styles/App.css';

// Utils

class MiddleBox extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addHashTags = this.addHashTags.bind(this);
        this.delHashTags = this.delHashTags.bind(this);
    }

    handleChange(value){
        // console.log(this.refs.test._onClickDelete())
        console.log('Value received from onChange: ' + value)
    }

    addHashTags(tag){
        this.props.addHashTag(tag);
    }

    delHashTags(tags){
        this.props.delHashTag(tags);
    }

    render() {
        return (
            <div className={styleVideo.formMiddleBox}>
                <div className={styleVideo.innerContainer}>
                    <div className={styleVideo.top}>
                        <label className={styleVideo.topTitle}>해시태그 추가</label>
                    </div>
                    <div className={styleVideo.cardContainer}>
                        <div className={styleVideo.card} style={{overflow:'auto'}}>
                            <Autocomplete
                                tags={this.props.hashtags}
                                onChange={this.handleChange}
                                className={styleVideo.hashtagInput}
                                saveOnBlur={true}
                                onDelete={(deleteTag, tags)=> this.delHashTags(tags)}
                                onAdd={(item)=> this.addHashTags(item)}
                            />
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
})(withRouter(MiddleBox));