import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

// Components
import HashtagList from './list';

class HashtagContainer extends React.Component {
    render() {
        return (
            <div style={{width:'100%', height:'100%'}}>
                <Route path={'/admin/hashtag/list'} component={HashtagList} />
            </div>
        );
    }
}
export default connect()(withRouter(HashtagContainer));
