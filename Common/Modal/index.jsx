import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import ReactModal from 'react-modal';

// Styles
import stylesModal from '../../Styles/Common/Modal.css';

/*
* this.props.modalHeader
* this.props.modalBody
* this.props.modalFooter
*/
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        };
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    open() {
        this.setState({ isOpened: true });
    }
    close() {
        this.setState({ isOpened: false });
    }
    render() {
        let className = stylesModal.modalContainer;
        switch (this.props.type){
            case 'invoice': className = stylesModal.modalContainerInvoice; break;
            case 'product': className = stylesModal.modalContainerFunding; break;
            case 'account_normal': className = stylesModal.modalContainerAccountNormal; break;
            case 'account_sellever': className = stylesModal.modalContainerAccountSellever; break;
            case 'video': className = stylesModal.modalContainerVideo; break;
        }
        return (
            <ReactModal
                className={className}
                overlayClassName={stylesModal.modalOverlay}
                isOpen={this.state.isOpened}
                onRequestClose={this.close.bind(this)}
                contentLabel="Modal"
                shouldCloseOnOverlayClick={true}>
                {
                    this.props.type === 'account_normal' || this.props.type === 'account_sellever' ?
                        <div>
                            <div className={stylesModal.modalHeader}>
                                <div className={stylesModal.closeIconWhite}>
                                    <i style={{color:'#888'}} className={'icon icon-ic_delete'} onClick={this.close.bind(this)}></i>
                                </div>
                            </div>
                        </div>

                        :

                        <div>
                            <div className={stylesModal.modalHeader}>
                                <div className={stylesModal.closeIcon}>
                                    <i className={'icon icon-ic_delete'} onClick={this.close.bind(this)}></i>
                                </div>
                            </div>
                        </div>
                }
                <div className={stylesModal.modalBody}>
                    {this.props.modalBody}
                </div>

                { this.props.modalFooter ? (
                    <div className={stylesModal.modalFooter}>
                        {this.props.modalFooter}
                    </div>
                ) : null}
            </ReactModal>
        );
    }
}
export default connect((state) => {
    return {
    };
})(withRouter(Modal));
