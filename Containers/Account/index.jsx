import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

// Components
import AccountList from './list';
import AccountForm from './form';

class AccountContainer extends React.Component {
    render() {
        return (
            <div style={{width:'100%', height:'100%'}}>
                <Route path={'/admin/account/list'} component={AccountList} />
                <Route path={'/admin/account/form'} component={AccountForm} />
            </div>
        );
    }
}
export default connect()(withRouter(AccountContainer));
