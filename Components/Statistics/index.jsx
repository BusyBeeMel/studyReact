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
import stylesStatistics from '../../Styles/Components/Statistics.css';

// Utils



class StatisticsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(StatisticsComponent));