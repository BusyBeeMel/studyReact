import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

// Components
import MarketList from './list';
import MarketForm from './form';

class MarketContainer extends React.Component {
    render() {
        return (
            <div style={{width:'100%', height:'100%'}}>
                <Route path={'/admin/market/list'} component={MarketList} />
                <Route path={'/admin/market/form'} component={MarketForm} />
            </div>
        );
    }
}
export default connect()(withRouter(MarketContainer));
