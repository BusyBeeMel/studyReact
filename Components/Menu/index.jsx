import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Actions

// Styles
import styles from '../../Styles/App.css';
import stylesMenu from '../../Styles/Components/Menu.css';

// Utils

// 컴포넌트는 필요하시면 마음대로 분리하셔도 상관 없습니다!

const mql = window.matchMedia('(max-width: 1172px)');

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.closeSidebar = this.closeSidebar.bind(this);
    }
    componentWillMount() {
        // if (this.props.location.pathname !== '/admin/funding/form' || this.props.location.pathname !== '/admin/market/form') {
            this.setState({
                active: this.props.location.pathname,
            });
        // }
        mql.addListener(this.mediaQueryChanged);
        this.setState({ mql: mql, sidebarDocked: mql.matches });
    }
    componentDidMount() {
        this.props.onRef(this);
        /*
                window.addEventListener('resize', ::this.handleResize);
        */
    }
    mediaQueryChanged() {
        this.setState({sidebarDocked: this.state.mql.matches});
    }
    closeSidebar() {
        this.setState({
            sidebarWidth: '0',
        });
    }

    render() {
        return (
            <div className={stylesMenu.menuContainer} style={{ width: this.state.sidebarDocked ? this.state.sidebarWidth : '166px' }}>
                { this.state.sidebarDocked ? <div className={stylesMenu.closeBtn} onClick={this.closeSidebar}><i className={'icon icon-ic_close'}></i></div> : null }
                <div className={stylesMenu.menuHeader}>
                        <div style={{margin:'auto', width:74, height:21, backgroundImage:'url("/assets/img/logo_sellev_white.png") '}}>

                        </div>
                </div>
                <div className={stylesMenu.menuBox}>
                    <ul className={stylesMenu.menuBoxUl}>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin'}
                            >
                                <div className={this.state.active === '/admin' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuHomeImg}>
                                    </div>
                                    HOME
                                </div>
                            </Link>
                        </li>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin/order'}
                            >
                                <div className={this.state.active === '/admin/order' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuOrderImg}>
                                    </div>
                                    주문 목록
                                </div>
                            </Link>
                        </li>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin/funding/list'}
                            >
                                <div className={this.state.active === '/admin/funding/list' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuFundImg}>
                                    </div>
                                    펀딩 관리
                                </div>
                            </Link>
                        </li>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin/market/list'}
                            >
                                <div className={this.state.active === '/admin/market/list' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuMarketImg}>
                                    </div>
                                    마켓 관리
                                </div>
                            </Link>
                        </li>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin/hashtag/list'}
                            >
                                <div className={this.state.active === '/admin/hashtag/list' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuHashtagImg}>
                                    </div>
                                    해시태그 관리
                                </div>
                            </Link>
                        </li>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin/video/list'}
                            >
                                <div className={this.state.active === '/admin/video/list' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuVideoImg}>
                                    </div>
                                    동영상 관리
                                </div>
                            </Link>
                        </li>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin/banner'}
                            >
                                <div className={this.state.active === '/admin/banner' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuBannerImg}>
                                    </div>
                                    배너 관리
                                </div>
                            </Link>
                        </li>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin/account/list'}
                            >
                                <div className={this.state.active === '/admin/account/list' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuAccountImg}>
                                    </div>
                                    계정 관리
                                </div>
                            </Link>
                        </li>
                        <li className={stylesMenu.menuBoxLl}>
                            <Link
                                className={stylesMenu.menuBoxLink}
                                to={'/admin/statistics'}
                            >
                                <div className={this.state.active === '/admin/statistics' ? stylesMenu.menuActiveText : stylesMenu.menuText}>
                                    <div className={stylesMenu.menuStatImg}>
                                    </div>
                                    통계
                                </div>
                            </Link>
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
})(withRouter(MenuComponent));