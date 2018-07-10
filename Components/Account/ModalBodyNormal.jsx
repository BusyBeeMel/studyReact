import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import stylesAccount from '../../Styles/Components/Account.css';
import styles from '../../Styles/App.css';

// Utils
import * as convert from "../../Lib/Utils/converter";
import * as DateUtil from "../../Lib/Utils/date";

class ModalBodyNormal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
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
                    <div className={stylesAccount.popupTitle}>마일리지 개수<span className={stylesAccount.popupText}>{item.mileage}</span></div>
                    <div className={stylesAccount.popupTitle}>코인 개수<span className={stylesAccount.popupText}>{item.coin}</span></div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(ModalBodyNormal));
