import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import CardView from '../Forms/CardView'

// Actions

// Styles
import styles from '../../Styles/App.css';
import stylesHeader from '../../Styles/Components/Home.css';

// Utils



class HomeComponent extends React.Component {
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
})(withRouter(HomeComponent));