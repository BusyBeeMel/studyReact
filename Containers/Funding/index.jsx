import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

// Components
import FundingList from './list';
import FundingForm from './form';

class FundingContainer extends React.Component {
    render() {
        return (
            <div style={{width:'100%', height:'100%'}}>
                <Route path={'/admin/funding/list'} component={FundingList} />
                <Route path={'/admin/funding/form'} component={FundingForm} />
            </div>
        );
    }
}
export default connect()(withRouter(FundingContainer));
