import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import stylesAccount from '../../Styles/Components/Account.css';
import styles from '../../Styles/App.css';

//Actions
import * as ActionAccount from "../../Data/Account/actions";

// Utils
import * as convert from "../../Lib/Utils/converter";
import * as DateUtil from "../../Lib/Utils/date";

class ModalBodySellever extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            memo: this.props.item.memo
        }

        this.memoChange = this.memoChange.bind(this);
        this.updateMemo = this.updateMemo.bind(this);
    }

    memoChange(text) {
        this.setState({
            memo: text
        })
    }

    updateMemo() {
        let {item} = this.props;

        let param = {
            userId: item.userId,
            memo: this.state.memo,
            name: item.name,
            descriptionShort: item.descriptionShort,
            description: item.description,
            coverUrl: item.coverUrl,
            profileUrl: item.profileUrl
        }

        ActionAccount.updateAccount(param)
            .then((response)=>{
                console.log(response)
                if (response.code == 200) {
                    alert('수정에 성공하였습니다')
                    location.reload();
                }else{
                    alert('수정에 실패하였습니다')
                }
            })
            .catch((err)=>{
                alert('수정에 실패하였습니다')
            })
    }

    render() {
        let {item} = this.props;
        return(
            <div className={stylesAccount.popupBody}>
                <div className={stylesAccount.popupCoverImg} style={{backgroundImage:'url('+item.coverUrl+')'}}>

                </div>
                <div className={stylesAccount.popupProfileImg} style={{backgroundImage:'url('+item.profileUrl+')'}}>

                </div>

                <div className={styles.space50}></div>

                <div className={stylesAccount.popupContentBody}>
                    <div className={stylesAccount.popupTitle}>이름 <span className={stylesAccount.popupText}>{item.name}</span></div>
                    <div className={stylesAccount.popupTitle}>전화번호<span className={stylesAccount.popupText}>{item.phoneNumber}</span></div>
                    <div className={stylesAccount.popupTitle}>계정생성일<span className={stylesAccount.popupText}>{DateUtil.format('defalut', item.createdAt)}</span></div>
                    <div className={stylesAccount.popupTitle}>해시태그
                        <span className={stylesAccount.popupText} style={{wordBreak:'break-all', paddingRight:10}}>
                            <div style={{maxHeight:60, overflow:'auto'}}>
                                {
                                    item.hashtags ?
                                        item.hashtags.map((key, i)=>{
                                            if(item.hashtags.length === (i+1)){
                                                return '#'+key.hashtag;
                                            }
                                            return '#'+key.hashtag+',';
                                        })
                                        :
                                        <div>&nbsp;</div>
                                }
                            </div>
                        </span>
                    </div>
                    <div className={stylesAccount.popupMemo}>
                        <div className={stylesAccount.popupMemoHeader}>
                            메모
                        </div>
                        <textarea value={this.state.memo}
                                  className={stylesAccount.popupTextarea}
                                  placeholder={'메모를 적어주세요'}
                                  onChange={(e) => this.memoChange(e.target.value)} />
                    </div>
                    <div className={stylesAccount.popupUpdateBtn} onClick={this.updateMemo}>
                        수정
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
})(withRouter(ModalBodySellever));
