import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import stylesVideo from '../../Styles/Components/Video.css';
import styles from '../../Styles/App.css';

// Utils
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

        return(
            <div>
                <div className={styles.popupTitle}>동영상 상세</div>
                <div className={stylesVideo.popupContainer}>
                    <div className={stylesVideo.popupText}>
                        동영상명 <span className={stylesVideo.popupSubText}>{item.title}</span>
                    </div>
                    <div className={stylesVideo.popupText}>
                        카테고리명 <span className={stylesVideo.popupSubText}>{categoryId2Name[item.category]}</span>
                    </div>
                    <div className={stylesVideo.popupText}>
                        해시태그 <span className={stylesVideo.popupSubText}>{this.getHashTag(item.hashtags)}</span>
                    </div>
                    <div className={stylesVideo.popupText}>
                        조회수 <span className={stylesVideo.popupSubText}>{item.hitAmount}</span>
                    </div>
                    <div className={stylesVideo.popupText}>
                        좋아요수 <span className={stylesVideo.popupSubText}>{item.likeAmount}</span>
                    </div>
                    <div className={stylesVideo.popupText}>
                        Youtube URL <span className={stylesVideo.popupSubText}>{item.typeInfo.youtubeUrl}</span>
                    </div>
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
