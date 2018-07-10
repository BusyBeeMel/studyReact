import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import MenuComponent from '../Components/Menu';
import HeaderComponent from '../Components/Header';
import HomeContainer from "./Home";
import OrderContainer from "./Order";
import FundingContainer from "./Funding";
import MarketContainer from "./Market";
import HashtagContainer from "./Hashtag";
import VideoContainer from "./Video";
import BannerContainer from "./Banner";
import AccountContainer from "./Account";
import StatisticsContainer from "./Statistics";

// Styles
import styles from '../Styles/App.css';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';

// Routes
import routes from '../routes'; // Route의 exact, false 속성 값 바꾸고 싶으시면 이 파일로 들어가시면 됩니다.


class RootView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            market: '',
            sidebarWidth: '0px',
        };
    }

    openSidebar() {
        this.menuItem.setState({
            sidebarWidth: '166px',
        });
    }

    componentDidMount() {
        this.props.dispatch(ActionAuth.session());
    }
    render() {
        return (
            <div >
                <MenuComponent onRef={(ref) => { this.menuItem = ref; }} />
                <HeaderComponent openSidebar={this.openSidebar.bind(this)} />
                <div className={styles.bodyWrapper}>
                    <Route path={'/admin'} exact={true} strict={false} component={HomeContainer} />
                    <Route path={'/admin/order'} exact={true} strict={false} component={OrderContainer} />
                    <Route path={'/admin/funding'} exact={false} strict={false} component={FundingContainer} />
                    <Route path={'/admin/market'} exact={false} strict={false} component={MarketContainer} />
                    <Route path={'/admin/hashtag'} exact={false} strict={false} component={HashtagContainer} />
                    <Route path={'/admin/video'} exact={false} strict={false} component={VideoContainer} />
                    <Route path={'/admin/banner'} exact={true} strict={false} component={BannerContainer} />
                    <Route path={'/admin/account'} exact={false} strict={false} component={AccountContainer} />
                    <Route path={'/admin/statistics'} exact={true} strict={false} component={StatisticsContainer} />
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RootView));
