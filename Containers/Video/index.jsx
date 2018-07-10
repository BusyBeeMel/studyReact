import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

// Components
import VideoList from './list';
import VideoForm from './form';

class VideoContainer extends React.Component {
    render() {
        return (
            <div style={{width:'100%', height:'100%'}}>
                <Route path={'/admin/video/list'} component={VideoList} />
                <Route path={'/admin/video/form'} component={VideoForm} />
            </div>
        );
    }
}
export default connect()(withRouter(VideoContainer));
